import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = matchMedia('(pointer: fine)').matches;
const $ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => root.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, root: ParentNode = document) => [
  ...root.querySelectorAll<T>(s),
];

/* ---------- Smooth scroll ---------- */
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ---------- Side menu ---------- */
const menu = $('.menu')!;
const menuBtn = $('[data-menu-toggle]')!;
let menuOpen = false;

const menuTl = gsap
  .timeline({ paused: true })
  .set(menu, { visibility: 'visible' })
  .to('.menu__overlay', { opacity: 1, duration: 0.6, ease: 'power2.out' }, 0)
  .fromTo('.menu__layer', { xPercent: 101 }, { xPercent: 0, duration: 0.9, ease: 'expo.inOut', stagger: 0.09 }, 0)
  .fromTo(
    '.menu__link-inner',
    { yPercent: 130, rotate: 7 },
    { yPercent: 0, rotate: 0, duration: 1, ease: 'expo.out', stagger: 0.055 },
    0.55,
  )
  .fromTo('.menu__fade', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out' }, 0.7);

function openMenu() {
  menuOpen = true;
  document.documentElement.classList.add('menu-open');
  menuBtn.setAttribute('aria-expanded', 'true');
  menu.removeAttribute('inert');
  lenis?.stop();
  menuTl.timeScale(1).play();
}
function closeMenu() {
  if (!menuOpen) return;
  menuOpen = false;
  document.documentElement.classList.remove('menu-open');
  menuBtn.setAttribute('aria-expanded', 'false');
  menu.setAttribute('inert', '');
  lenis?.start();
  menuTl.timeScale(1.7).reverse();
}
menuBtn.addEventListener('click', () => (menuOpen ? closeMenu() : openMenu()));
$$('[data-menu-close]').forEach((el) => el.addEventListener('click', closeMenu));
addEventListener('keydown', (e) => e.key === 'Escape' && closeMenu());

/* ---------- Anchor links ---------- */
$$<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
  a.addEventListener('click', (e) => {
    if (a.classList.contains('skip-link')) return;
    const id = a.getAttribute('href')!;
    const target = id.length > 1 ? $(id) : null;
    if (!target) return;
    e.preventDefault();
    const wasOpen = menuOpen;
    closeMenu();
    const go = () =>
      lenis ? lenis.scrollTo(target, { duration: 1.6 }) : target.scrollIntoView({ behavior: 'smooth' });
    wasOpen ? setTimeout(go, 450) : go();
  }),
);

/* ---------- Header: esconde ao descer, mostra ao subir ---------- */
const header = $('.header')!;
const wa = $('.wa-float')!;
let lastY = 0;
addEventListener(
  'scroll',
  () => {
    const y = scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    header.classList.toggle('is-hidden', y > lastY && y > 300);
    wa.classList.toggle('is-visible', y > innerHeight * 0.6);
    lastY = y;
  },
  { passive: true },
);

/* ---------- Barra de progresso ---------- */
gsap.to('.progress', {
  scaleX: 1,
  ease: 'none',
  scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
});

/* ---------- Botões: ponto de entrada do preenchimento ---------- */
$$('.btn--fill').forEach((b) => {
  const set = (e: MouseEvent) => {
    const r = b.getBoundingClientRect();
    b.style.setProperty('--x', `${e.clientX - r.left}px`);
    b.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  b.addEventListener('mouseenter', set);
  b.addEventListener('mouseleave', set);
});

/* ---------- Efeitos só para mouse ---------- */
if (fine && !reduce) {
  // Magnetic
  $$('[data-magnetic]').forEach((el) => {
    const s = Number(el.dataset.magnetic) || 0.3;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - r.left - r.width / 2) * s);
      yTo((e.clientY - r.top - r.height / 2) * s);
    });
    el.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });

  // Cursor
  const cursor = $('.cursor')!;
  const dot = $('.cursor__dot')!;
  const ring = $('.cursor__ring')!;
  const label = $('.cursor__label')!;
  const dx = gsap.quickTo(dot, 'x', { duration: 0.1 });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.1 });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });
  addEventListener('mousemove', (e) => {
    cursor.classList.add('is-visible');
    dx(e.clientX);
    dy(e.clientY);
    rx(e.clientX);
    ry(e.clientY);
    const t = e.target as HTMLElement;
    const lbl = t.closest<HTMLElement>('[data-cursor]');
    cursor.classList.toggle('is-label', !!lbl);
    if (lbl) label.textContent = lbl.dataset.cursor!;
    cursor.classList.toggle('is-link', !lbl && !!t.closest('a, button'));
    cursor.classList.toggle('is-dark', !!t.closest('.process, .cta, .footer, .menu__panel, .marquee'));
  });
  document.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));

}

/* ---------- Marquee reativo à velocidade do scroll ---------- */
$$('.marquee').forEach((m) => {
  const track = $('.marquee__track', m)!;
  let x = 0;
  let dir = -1;
  const wrap = gsap.utils.wrap(-50, 0);
  gsap.ticker.add((_t, dt) => {
    const v = lenis?.velocity ?? 0;
    if (Math.abs(v) > 0.5) dir = v > 0 ? -1 : 1;
    const speed = reduce ? 0 : 0.012 + Math.min(Math.abs(v) * 0.006, 0.25);
    x = wrap(x + speed * dir * (dt / 16.67));
    gsap.set(track, { xPercent: x });
  });
});

/* ---------- Animações de entrada / scroll ---------- */
function scrollAnimations() {
  if (reduce) {
    return;
  }

  // Títulos: linhas sobem por trás de máscara
  $$('[data-split]').forEach((el) => {
    const split = SplitText.create(el, { type: 'lines,words', mask: 'lines' });
    gsap.from(split.words, {
      yPercent: 115,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.05,
      onComplete: () => split.revert(),
      scrollTrigger: { trigger: el, start: 'top 88%' },
    });
  });

  // Reveal genérico
  $$('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%' },
    });
  });

  // Marquee entra com leve parallax
  gsap.fromTo('.marquee', { xPercent: 4 }, {
    xPercent: -4,
    ease: 'none',
    scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: true },
  });

  // Hero sai com parallax
  gsap.to('.hero__inner', {
    yPercent: -12,
    opacity: 0.25,
    ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
  });

  // A linha acompanha a leitura do processo sem prender o scroll.
  gsap.to('.process__bar span', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: { trigger: '.process', start: 'top 75%', end: 'bottom 40%', scrub: true },
  });
  gsap.from('.step', {
    y: 35,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.12,
    scrollTrigger: { trigger: '.process__track', start: 'top 85%' },
  });

  // Footer: logo gigante sobe por trás da máscara
  gsap.from('.footer__word .logo', {
    yPercent: 100,
    duration: 1.4,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.footer__word', start: 'top 90%' },
  });
}

/* ---------- Preloader + intro do hero ---------- */
function preloader(): Promise<void> {
  const pl = $('.preloader');
  let introSeen = false;
  try { introSeen = sessionStorage.getItem('nexiu-intro-seen') === '1'; } catch { /* storage may be unavailable */ }
  if (!pl || reduce || introSeen) {
    pl?.remove();
    return Promise.resolve();
  }
  lenis?.stop();
  scrollTo(0, 0);
  return new Promise((resolve) => {
    gsap
      .timeline({
        onComplete: () => {
          pl.remove();
          lenis?.start();
          try { sessionStorage.setItem('nexiu-intro-seen', '1'); } catch { /* storage may be unavailable */ }
          resolve();
        },
      })
      .from('.preloader__logo .logo', { yPercent: 110, duration: 0.4, ease: 'expo.out' })
      .to('.preloader__logo .logo', { yPercent: -110, opacity: 0, duration: 0.25, ease: 'power3.in' }, '+=0.12')
      .to('.preloader__layer--dark', { yPercent: -100, duration: 0.62, ease: 'expo.inOut' }, '-=0.08')
      .to('.preloader__layer--red', { yPercent: -100, duration: 0.62, ease: 'expo.inOut' }, '-=0.54');
  });
}

function heroIntro() {
  if (reduce) return;
  const split = SplitText.create('.hero__line', { type: 'chars', mask: 'chars' });
  gsap
    .timeline()
    .from(split.chars, { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: 0.025 })
    .from('.hero [data-fade]', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }, 0.35)
    .from('.header', { yPercent: -100, opacity: 0, duration: 1, ease: 'expo.out', clearProps: 'transform,opacity' }, 0.2);
}

document.fonts.ready.then(async () => {
  await preloader();
  heroIntro();
  scrollAnimations();
  ScrollTrigger.refresh();
});
