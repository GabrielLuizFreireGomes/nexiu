import { sections } from '../../data/navigation'
import { profile } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionTitle } from '../ui/SectionTitle'
import styles from './Skills.module.css'

const TITLE_ID = 'habilidades-titulo'

export function Skills() {
  return (
    <Section id={sections.skills} titleId={TITLE_ID}>
      <Reveal>
        <SectionTitle
          id={TITLE_ID}
          title="Tecnologias e ferramentas"
          description="O que usamos no dia a dia para tirar ideias do papel."
        />
      </Reveal>

      <div className={styles.columns}>
        {profile.skillGroups
          .filter((group) => group.items.length > 0)
          .map((group, index) => (
          <Reveal key={group.title} delay={index * 0.08} className={styles.column}>
            <h3 className={styles.title}>{group.title}</h3>
            <ul className={styles.items}>
              {group.items.map((item) => (
                <li key={item} className={styles.item}>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
