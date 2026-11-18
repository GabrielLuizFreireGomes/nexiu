import { Compass, MountainSnow, ShieldCheck } from 'lucide-react'
import { sections } from '../../data/navigation'
import { profile } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionTitle } from '../ui/SectionTitle'
import { Avatar } from './Avatar'
import styles from './About.module.css'

const TITLE_ID = 'sobre-titulo'

const PILLAR_ICONS = {
  missao: Compass,
  visao: MountainSnow,
  valores: ShieldCheck,
}

export function About() {
  return (
    <Section id={sections.about} titleId={TITLE_ID}>
      <div className={styles.layout}>
        {/* O título fica junto do texto para os dois se alinharem ao logo. */}
        <div className={styles.content}>
          <Reveal className={styles.heading}>
            <SectionTitle id={TITLE_ID} title="Quem somos" />
          </Reveal>

          <Reveal delay={0.08} className={styles.text}>
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          {profile.highlights.length > 0 && (
            <Reveal delay={0.16}>
              <dl className={styles.highlights}>
                {profile.highlights.map((highlight) => (
                  <div key={highlight.label} className={styles.highlight}>
                    <dt className={styles.highlightLabel}>{highlight.label}</dt>
                    <dd className={styles.highlightValue}>{highlight.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.08} className={styles.logo}>
          <Avatar />
        </Reveal>
      </div>

      {profile.pillars.length > 0 && (
        <ul className={styles.pillars}>
          {profile.pillars.map((pillar, index) => {
            const Icon = PILLAR_ICONS[pillar.id] ?? Compass

            return (
              <li key={pillar.id}>
                <Reveal delay={0.12 + index * 0.06} className={styles.pillar}>
                  <div className={styles.pillarHeader}>
                    <Icon className={styles.pillarIcon} aria-hidden="true" />
                    <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                    {pillar.subtitle && (
                      <p className={styles.pillarSubtitle}>{pillar.subtitle}</p>
                    )}
                  </div>
                  {pillar.text && <p className={styles.pillarText}>{pillar.text}</p>}
                  {pillar.items && (
                    <dl className={styles.pillarItems}>
                      {pillar.items.map((item) => (
                        <div key={item.name}>
                          <dt>{item.name}</dt>
                          <dd>{item.text}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </Reveal>
              </li>
            )
          })}
        </ul>
      )}
    </Section>
  )
}
