import { ArrowUpRight } from 'lucide-react'
import { ProjectThumb } from './ProjectThumb'
import styles from './ProjectCard.module.css'

/**
 * Projeto na galeria: número e categoria, imagem, título com seta, descrição
 * e tecnologias. O título é o botão que abre o detalhe; a área clicável dele
 * cobre o card inteiro.
 */
export function ProjectCard({ project, number, onOpen }) {
  const { title, category, description, tags = [], featured, year } = project

  return (
    <article className={styles.card}>
      <p className={styles.meta}>
        <span className={styles.number}>{String(number).padStart(2, '0')}</span>
        {category && <span className={styles.category}>{category}</span>}
        <span className={styles.metaEnd}>
          {featured && <span className={styles.featured}>Destaque</span>}
          {year && <span>{year}</span>}
        </span>
      </p>

      <div className={styles.media}>
        <ProjectThumb project={project} />
      </div>

      <h3 className={styles.title}>
        <button
          type="button"
          className={styles.titleButton}
          aria-haspopup="dialog"
          onClick={onOpen}
        >
          <span className={styles.titleText}>{title}</span>
          <ArrowUpRight className={styles.arrow} aria-hidden="true" />
        </button>
      </h3>

      <p className={styles.description}>{description}</p>

      {tags.length > 0 && (
        <p className={styles.tech}>
          <span className="visually-hidden">Tecnologias: </span>
          {tags.join(' · ')}
        </p>
      )}
    </article>
  )
}
