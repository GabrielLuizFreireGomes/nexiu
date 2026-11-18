import { ArrowRight } from 'lucide-react'
import { sections } from '../../data/navigation'
import { profile } from '../../data/profile'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SocialLinks } from '../ui/SocialLinks'
import { HeroVisual } from './HeroVisual'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section id={sections.home} aria-labelledby="hero-titulo" className={styles.hero}>
      <HeroVisual />

      <div className={`container ${styles.content}`}>
        <div className={styles.text}>
          {profile.greeting && (
            <Reveal>
              <p className={styles.greeting}>{profile.greeting}</p>
            </Reveal>
          )}
          <Reveal delay={0.06}>
            <h1 id="hero-titulo" className={styles.name}>
              {profile.name}
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className={styles.slogan}>{profile.slogan}</p>
          </Reveal>
          <Reveal delay={0.24} className={styles.actions}>
            <Button href={`#${sections.projects}`}>
              Ver projetos
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button href={`#${sections.contact}`} variant="secondary">
              Entrar em contato
            </Button>
          </Reveal>
          <Reveal delay={0.3}>
            <SocialLinks className={styles.socials} withWhatsApp />
          </Reveal>
        </div>
      </div>
      <a className={styles.scrollCue} href={`#${sections.about}`}>
        <span>Role para explorar</span>
        <span className={styles.scrollCueLine} aria-hidden="true" />
      </a>
    </section>
  )
}
