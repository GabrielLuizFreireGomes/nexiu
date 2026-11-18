import { Quote } from 'lucide-react'
import { sections } from '../../data/navigation'
import { profile } from '../../data/profile'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionTitle } from '../ui/SectionTitle'
import styles from './Testimonials.module.css'

const TITLE_ID = 'depoimentos-titulo'

export function Testimonials() {
  if (profile.testimonials.length === 0) return null

  return (
    <Section id={sections.testimonials} titleId={TITLE_ID}>
      <Reveal>
        <SectionTitle
          id={TITLE_ID}
          title="Quem já trabalhou com a gente"
        />
      </Reveal>

      <ul className={styles.grid}>
        {profile.testimonials.map((testimonial, index) => (
          <li key={`${testimonial.name}-${index}`}>
            <Reveal delay={index * 0.08} className={styles.cardWrapper}>
              <figure className={styles.card}>
                <Quote className={styles.mark} aria-hidden="true" />
                <blockquote className={styles.quote}>
                  <p>{testimonial.quote}</p>
                </blockquote>
                <figcaption className={styles.author}>
                  <span className={styles.name}>{testimonial.name}</span>
                  {(testimonial.role || testimonial.company) && (
                    <span className={styles.role}>
                      {[testimonial.role, testimonial.company].filter(Boolean).join(', ')}
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
