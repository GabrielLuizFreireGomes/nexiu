import { useState } from 'react'
import styles from './ProjectThumb.module.css'

const FALLBACK_VARIANTS = 3

// Escolhe sempre a mesma variação de fundo para o mesmo projeto.
function getVariant(id = '') {
  let sum = 0
  for (const char of id) sum += char.codePointAt(0)
  return sum % FALLBACK_VARIANTS
}

/**
 * Miniatura 16:10 do projeto. Sem `image`, ou se ela falhar ao carregar,
 * mostra uma miniatura gerada em CSS com a inicial do título. Com `fill`,
 * ocupa toda a altura do contêiner e mostra a imagem inteira, sem corte.
 */
export function ProjectThumb({ project, eager = false, fill = false }) {
  const [failed, setFailed] = useState(false)
  const showImage = Boolean(project.image) && !failed

  return (
    <div className={`${styles.thumb} ${fill ? styles.fill : ''}`}>
      {showImage ? (
        <img
          className={styles.image}
          src={project.image}
          alt={`Captura de tela do site ${project.title}`}
          width={800}
          height={500}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div
          className={styles.fallback}
          data-variant={getVariant(project.id)}
          role="img"
          aria-label={`Miniatura ilustrativa do projeto ${project.title}`}
        >
          <span className={styles.initial} aria-hidden="true">
            {project.title.trim().charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  )
}
