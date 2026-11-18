import { sections } from '../../data/navigation'
import { profile } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import styles from './Services.module.css'

const TITLE_ID = 'servicos-titulo'

export function Services() {
  if (profile.services.length === 0) return null

  return (
    <Section id={sections.services} titleId={TITLE_ID}>
      <Reveal className={styles.header}>
        <h2 id={TITLE_ID} className={styles.heading}>
          O que a gente cria.
        </h2>
      </Reveal>

      <ol className={styles.list}>
        {profile.services.map((service, index) => (
          <li key={service.title}>
            <Reveal delay={index * 0.06} className={styles.row}>
              <span className={styles.number} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  )
}
