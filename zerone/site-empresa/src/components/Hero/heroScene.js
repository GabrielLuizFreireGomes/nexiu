// Cena desenhada no <canvas> do topo do site: um buraco negro cercado de
// código. Símbolos de programação e pontos de luz formam um disco inclinado
// em volta do buraco, com trilhas tracejadas marcando as órbitas; um segundo
// anel de símbolos contorna o horizonte de eventos, que é um disco escuro com
// uma borda luminosa. O movimento imita o de um disco de acreção de verdade:
//
// - a matéria orbita o buraco, mais rápido quanto mais perto (a velocidade
//   angular cresce com raio^-1,5);
// - ela cai aos poucos em espiral, encolhe e some ao chegar à parte interna;
// - o lado do disco que gira em direção a quem olha fica mais claro e mais
//   quente, e o outro, mais apagado (efeito Doppler).
//
// Os símbolos também cintilam e, de tempos em tempos, trocam de caractere.
// As cores vêm dos design tokens, lidos por quem chama.

const TAU = Math.PI * 2
// Proporções em relação à largura do canvas.
const HORIZON_RADIUS = 0.1
const DISC_INNER_RADIUS = 0.21
const DISC_OUTER_RADIUS = 0.48
// Fração do raio do disco percorrida na queda, da borda até a parte interna.
const DISC_SPAN = 1 - DISC_INNER_RADIUS / DISC_OUTER_RADIUS
// Achatamento vertical do disco (visto inclinado) e giro do conjunto na tela.
const TILT = 0.42
const ROLL = 0.18
// Segundos para uma partícula da borda do disco completar uma volta.
const OUTER_ORBIT_SECONDS = 110
// Segundos para uma volta no anel que contorna o horizonte.
const HALO_ORBIT_SECONDS = 45
// Velocidade da órbita na borda interna do disco, em fração da velocidade da
// luz. Define a força do efeito Doppler.
const INNER_ORBIT_SPEED = 0.41
const DISC_PARTICLES = 760
const DISC_DUST = 420
const HALO_PARTICLES = 210
// Trilhas tracejadas que marcam as órbitas e dão forma ao disco.
const ORBIT_RINGS = 7
const COLOR_STEPS = 32
const GLYPH_FONT = 'ui-monospace, "SF Mono", "Cascadia Mono", Consolas, monospace'
// As medidas em px abaixo valem para um canvas desta largura e são
// proporcionais nas demais.
const REFERENCE_WIDTH = 1000
const FONT_SIZES = [11, 13, 15, 18]

const SYMBOLS = '{}<>/;=()[]01+*#$&|!:_%'.split('')
const TOKENS = ['</>', '=>', '{}', '()', '[]', '&&', '||', '//', '!=', '==', '++', '/>', '0x']

const OUTER_ANGULAR_SPEED = TAU / OUTER_ORBIT_SECONDS
// Parte da velocidade da órbita que aponta para quem olha, dado o ângulo de
// visão: de frente para o disco seria 0; de perfil, 1.
const LINE_OF_SIGHT = Math.sqrt(1 - TILT * TILT)

// Gerador pseudoaleatório com semente fixa, para a cena ser sempre a mesma.
function createRandom(seed) {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let value = Math.imul(state ^ (state >>> 15), 1 | state)
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

const clamp01 = (value) => Math.min(1, Math.max(0, value))

function smoothstep(start, end, value) {
  const t = clamp01((value - start) / (end - start))
  return t * t * (3 - 2 * t)
}

const rgba = ([r, g, b], alpha) => `rgba(${r}, ${g}, ${b}, ${alpha})`

/**
 * Sorteia as partículas da cena: o disco em volta do buraco negro e o anel
 * junto ao horizonte. O resultado é sempre o mesmo.
 */
export function createParticles() {
  const random = createRandom(20261013)
  const pick = (list) => list[Math.floor(random() * list.length)]

  const createParticle = (glyphChance, useTokens) => {
    const particle = {
      angle: random() * TAU,
      brightness: 0.55 + random() * 0.45,
      tint: (random() - 0.5) * 0.24,
      twinkleSpeed: 0.4 + random() * 1.3,
      twinklePhase: random() * TAU,
      // Preenchidos a cada quadro com a posição e a aparência na tela.
      x: 0,
      y: 0,
      alpha: 0,
      scale: 1,
      colorIndex: 0,
      isInFront: false,
    }

    if (random() < glyphChance) {
      const candidates = useTokens && random() < 0.22 ? TOKENS : SYMBOLS
      particle.glyphs = [pick(candidates), pick(candidates), pick(candidates)]
      particle.swapPeriod = 4 + random() * 7
      particle.swapPhase = random()
      particle.fontIndex = Math.floor(random() * FONT_SIZES.length)
    } else {
      particle.size = 1 + random() * 1.8
    }

    return particle
  }

  const disc = Array.from({ length: DISC_PARTICLES + DISC_DUST }, (_, index) => ({
    ...createParticle(index < DISC_PARTICLES ? 0.58 : 0, true),
    // Em que ponto da queda a partícula começa, e quanto tempo a queda leva.
    phase: random(),
    fallSeconds: 110 + random() * 80,
  }))

  const halo = Array.from({ length: HALO_PARTICLES }, () => ({
    ...createParticle(0.5, false),
    // Distância ao centro, em raios do horizonte; a maioria fica rente a ele.
    distance: 1.2 + 0.9 * random() ** 1.6,
  }))

  // Separa pontos de símbolos e agrupa os símbolos por tamanho de fonte:
  // trocar a fonte do canvas a cada símbolo é caro.
  const split = (list) => ({
    dots: list.filter((particle) => !particle.glyphs),
    glyphs: list
      .filter((particle) => particle.glyphs)
      .sort((a, b) => a.fontIndex - b.fontIndex),
  })

  return { disc: split(disc), halo: split(halo) }
}

/**
 * Gera a escala de cores do disco, da borda interna (quente e clara) até a
 * externa, já como strings CSS. `palette` traz cada cor como [r, g, b].
 */
export function createColorScale(palette) {
  const stops = [
    [0, palette.core],
    [0.14, palette.inner],
    [0.5, palette.middle],
    [1, palette.outer],
  ]

  return Array.from({ length: COLOR_STEPS }, (_, index) => {
    const position = index / (COLOR_STEPS - 1)
    const endIndex = Math.max(
      1,
      stops.findIndex(([stopPosition]) => stopPosition >= position),
    )
    const [startPosition, startColor] = stops[endIndex - 1]
    const [endPosition, endColor] = stops[endIndex]
    const t = (position - startPosition) / (endPosition - startPosition)
    const channels = startColor.map((channel, i) =>
      Math.round(channel + (endColor[i] - channel) * t),
    )
    return `rgb(${channels.join(', ')})`
  })
}

const getTwinkle = (particle, time) =>
  0.74 + 0.26 * Math.sin(time * particle.twinkleSpeed + particle.twinklePhase)

const toColorIndex = (position) => Math.round(clamp01(position) * (COLOR_STEPS - 1))

// Calcula onde uma partícula do disco está na tela neste instante.
function placeDiscParticle(particle, time, motionTime, width) {
  const cycle = particle.phase + motionTime / particle.fallSeconds
  // 0 na borda externa do disco, 1 na interna, onde a partícula some.
  const progress = cycle - Math.floor(cycle)
  const shrink = 1 - DISC_SPAN * progress
  const radius = width * DISC_OUTER_RADIUS * shrink
  // Ângulo já percorrido na queda: integral de uma velocidade angular que
  // cresce com raio^-1,5, como em uma órbita.
  const travelled =
    (OUTER_ANGULAR_SPEED * particle.fallSeconds * 2 * (shrink ** -0.5 - 1)) / DISC_SPAN
  const angle = particle.angle - travelled

  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius
  const flatY = y * TILT
  particle.x = x * Math.cos(ROLL) - flatY * Math.sin(ROLL)
  particle.y = x * Math.sin(ROLL) + flatY * Math.cos(ROLL)
  particle.isInFront = y > 0

  // Velocidade da órbita na direção de quem olha, em fração da velocidade da
  // luz: positiva do lado em que a matéria se aproxima. A órbita é mais
  // rápida perto do buraco, então o efeito é mais forte ali.
  const orbitSpeed = INNER_ORBIT_SPEED * Math.sqrt((1 - DISC_SPAN) / shrink)
  const approach = -Math.cos(angle) * LINE_OF_SIGHT * orbitSpeed
  const doppler = 1 + 1.25 * approach
  const fade = smoothstep(0, 0.1, progress) * (1 - smoothstep(0.88, 1, progress))
  // Mais claro perto do buraco, onde o disco é mais quente.
  const heat = 0.62 + 0.38 * progress

  particle.alpha = particle.brightness * fade * heat * doppler * getTwinkle(particle, time)
  // Encolhe ao se aproximar do buraco; o lado de cá do disco fica um pouco maior.
  particle.scale = (0.55 + 0.45 * shrink) * (1 + 0.16 * Math.sin(angle) * shrink)
  // A matéria que se aproxima parece mais quente; a que se afasta, mais fria.
  particle.colorIndex = toColorIndex(1 - progress + particle.tint - 0.25 * approach)
}

// Calcula onde uma partícula do anel junto ao horizonte está na tela.
function placeHaloParticle(particle, time, motionTime, width) {
  const speed = (TAU / HALO_ORBIT_SECONDS) * (1.3 / particle.distance) ** 1.5
  const angle = particle.angle - motionTime * speed
  const radius = width * HORIZON_RADIUS * particle.distance

  particle.x = Math.cos(angle) * radius
  particle.y = Math.sin(angle) * radius
  particle.alpha =
    particle.brightness *
    (1 - smoothstep(1.45, 2.1, particle.distance)) *
    getTwinkle(particle, time)
  particle.scale = 0.7
  particle.colorIndex = toColorIndex((particle.distance - 1.2) * 0.45 + particle.tint)
}

/**
 * Desenha um quadro da cena, centralizado no canvas. `width` e `height` são
 * as medidas do canvas em pixels CSS e `time` o tempo em segundos. Com `moves`
 * falso nada muda de lugar: os símbolos só cintilam e se alternam.
 */
export function drawScene(
  context,
  { width, height, pixelRatio, time, moves, particles, colors, palette },
) {
  const centerX = (width / 2) * pixelRatio
  const centerY = (height / 2) * pixelRatio
  const unit = width / REFERENCE_WIDTH
  const horizon = width * HORIZON_RADIUS
  const motionTime = moves ? time : 0
  const toScreen = () => context.setTransform(pixelRatio, 0, 0, pixelRatio, centerX, centerY)

  const fillGlow = (radius, innerRadius, stops) => {
    const gradient = context.createRadialGradient(0, 0, innerRadius, 0, 0, radius)
    stops.forEach(([position, color, alpha]) => gradient.addColorStop(position, rgba(color, alpha)))
    context.fillStyle = gradient
    context.globalAlpha = 1
    context.beginPath()
    context.arc(0, 0, radius, 0, TAU)
    context.fill()
  }

  const drawDots = (list, shouldDraw) => {
    toScreen()
    for (const particle of list) {
      if (particle.alpha < 0.02 || !shouldDraw(particle)) continue

      const size = particle.size * unit * particle.scale
      context.globalAlpha = Math.min(1, particle.alpha)
      context.fillStyle = colors[particle.colorIndex]
      context.fillRect(particle.x - size / 2, particle.y - size / 2, size, size)
    }
  }

  const drawGlyphs = (list, shouldDraw) => {
    let currentFont = -1
    for (const particle of list) {
      if (particle.alpha < 0.02 || !shouldDraw(particle)) continue

      // Cada símbolo some por um instante e volta como outro caractere.
      const cycle = time / particle.swapPeriod + particle.swapPhase
      const progress = cycle - Math.floor(cycle)
      const swapFade = smoothstep(0, 0.07, progress) * (1 - smoothstep(0.93, 1, progress))

      if (particle.fontIndex !== currentFont) {
        currentFont = particle.fontIndex
        context.font = `600 ${FONT_SIZES[currentFont] * unit}px ${GLYPH_FONT}`
      }

      const scale = particle.scale * pixelRatio
      context.setTransform(
        scale,
        0,
        0,
        scale,
        centerX + particle.x * pixelRatio,
        centerY + particle.y * pixelRatio,
      )
      context.globalAlpha = Math.min(1, particle.alpha * swapFade)
      context.fillStyle = colors[particle.colorIndex]
      context.fillText(particle.glyphs[Math.floor(cycle) % particle.glyphs.length], 0, 0)
    }
  }

  // Desenha metade de cada trilha de órbita: a de trás (ângulos de PI a TAU)
  // ou a da frente (de 0 a PI). Os traços correm mais rápido perto do buraco.
  const drawOrbitRings = (startAngle) => {
    toScreen()
    context.lineWidth = Math.max(1, unit)
    for (let ring = 0; ring < ORBIT_RINGS; ring += 1) {
      const position = ring / (ORBIT_RINGS - 1)
      const shrink = 1 - DISC_SPAN * (1 - position * 0.94)
      const radius = width * DISC_OUTER_RADIUS * shrink
      const speed = OUTER_ANGULAR_SPEED * shrink ** -1.5

      // Traço e intervalo variam de trilha para trilha, para não ficarem alinhados.
      const dash = radius * (0.16 + 0.05 * (ring % 3))
      const gap = radius * (0.09 + 0.04 * (ring % 2))
      context.setLineDash([dash, gap])
      context.lineDashOffset = motionTime * speed * radius + ring * 37 * unit
      context.globalAlpha = 0.07 + 0.16 * (1 - position) ** 1.4
      context.strokeStyle = colors[toColorIndex(position)]
      context.beginPath()
      context.ellipse(0, 0, radius, radius * TILT, ROLL, startAngle, startAngle + Math.PI)
      context.stroke()
    }
    context.setLineDash([])
  }

  const isBehind = (particle) => !particle.isInFront
  const isInFront = (particle) => particle.isInFront
  const always = () => true

  for (const particle of particles.disc.dots) placeDiscParticle(particle, time, motionTime, width)
  for (const particle of particles.disc.glyphs) placeDiscParticle(particle, time, motionTime, width)
  for (const particle of particles.halo.dots) placeHaloParticle(particle, time, motionTime, width)
  for (const particle of particles.halo.glyphs) placeHaloParticle(particle, time, motionTime, width)

  context.setTransform(1, 0, 0, 1, 0, 0)
  context.clearRect(0, 0, width * pixelRatio, height * pixelRatio)
  context.textAlign = 'center'
  context.textBaseline = 'middle'

  // Brilho difuso do disco, com o mesmo achatamento e giro dele.
  context.setTransform(
    Math.cos(ROLL) * pixelRatio,
    Math.sin(ROLL) * pixelRatio,
    -Math.sin(ROLL) * TILT * pixelRatio,
    Math.cos(ROLL) * TILT * pixelRatio,
    centerX,
    centerY,
  )
  fillGlow(width * DISC_OUTER_RADIUS, 0, [
    [0, palette.middle, 0.2],
    [0.5, palette.outer, 0.07],
    [1, palette.outer, 0],
  ])

  // A metade de trás do disco fica escondida atrás do buraco.
  drawOrbitRings(Math.PI)
  drawDots(particles.disc.dots, isBehind)
  drawGlyphs(particles.disc.glyphs, isBehind)

  // Luz acumulada em volta do horizonte de eventos.
  toScreen()
  const pulse = 1 + 0.04 * Math.sin(time * 0.7)
  fillGlow(horizon * 2.7 * pulse, horizon * 0.9, [
    [0, palette.inner, 0.5],
    [0.14, palette.middle, 0.26],
    [0.5, palette.outer, 0.08],
    [1, palette.outer, 0],
  ])
  drawDots(particles.halo.dots, always)
  drawGlyphs(particles.halo.glyphs, always)

  // O horizonte de eventos: um disco escuro com uma borda fina e luminosa.
  toScreen()
  context.globalAlpha = 1
  context.fillStyle = rgba(palette.void, 1)
  context.beginPath()
  context.arc(0, 0, horizon, 0, TAU)
  context.fill()

  context.beginPath()
  context.arc(0, 0, horizon * 1.03, 0, TAU)
  context.lineWidth = 5 * unit
  context.strokeStyle = rgba(palette.inner, 0.3)
  context.stroke()
  context.lineWidth = Math.max(1, 1.6 * unit)
  context.strokeStyle = rgba(palette.core, 0.9)
  context.stroke()

  // A metade da frente do disco passa por cima do buraco.
  drawOrbitRings(0)
  drawDots(particles.disc.dots, isInFront)
  drawGlyphs(particles.disc.glyphs, isInFront)
}
