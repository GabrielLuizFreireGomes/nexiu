import styles from './SectionTitle.module.css'

/** Cabeçalho padrão de seção: título (h2), linha decorativa e descrição. */
export function SectionTitle({ id, title, description, align = 'left' }) {
  return (
    <div className={`${styles.wrapper} ${styles[align]}`}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      <span className={styles.line} aria-hidden="true" />
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
