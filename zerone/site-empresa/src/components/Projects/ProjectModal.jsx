import { useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useScrollLock } from '../../hooks/useScrollLock'
import { getTransition } from '../../utils/motion'
import { Button } from '../ui/Button'
import { Chip } from '../ui/Chip'
import { FeaturedBadge } from './FeaturedBadge'
import { ProjectThumb } from './ProjectThumb'
import styles from './ProjectModal.module.css'

// Etapas do estudo de caso, na ordem exibida. Cada uma é opcional.
const CASE_STEPS = [
  { key: 'challenge', label: 'Desafio' },
  { key: 'solution', label: 'Solução' },
  { key: 'result', label: 'Resultado' },
]

/**
 * Detalhe de um projeto em um diálogo modal: prende o foco, fecha com Esc ou
 * com clique fora e devolve o foco ao card ao fechar.
 */
export function ProjectModal({ project, onClose }) {
  const { title, description, tags = [], liveUrl, featured, year, caseStudy } = project
  const caseSteps = CASE_STEPS.filter((step) => caseStudy?.[step.key])
  const dialogRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()
  const reducedMotion = useReducedMotion()
  const transition = getTransition(reducedMotion, { duration: 0.2 })

  useScrollLock()
  useFocusTrap(dialogRef)
  useEscapeKey(onClose)

  const handleOverlayPointerDown = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return createPortal(
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
      onPointerDown={handleOverlayPointerDown}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className={styles.dialog}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={transition}
      >
        <button
          type="button"
          className={styles.close}
          aria-label="Fechar detalhes do projeto"
          onClick={onClose}
        >
          <X aria-hidden="true" />
        </button>

        {/* data-lenis-prevent mantém a rolagem nativa dentro do diálogo. */}
        <div className={styles.scroller} data-lenis-prevent>
          <div className={styles.media}>
            <ProjectThumb project={project} eager fill />
          </div>

          <div className={styles.body}>
            {(featured || year) && (
              <p className={styles.meta}>
                {featured && <FeaturedBadge />}
                {year && <span>{year}</span>}
              </p>
            )}

            <h2 id={titleId} className={styles.title}>
              {title}
            </h2>
            <p id={descriptionId} className={styles.description}>
              {description}
            </p>

            {caseSteps.length > 0 && (
              <dl className={styles.caseStudy}>
                {caseSteps.map((step) => (
                  <div key={step.key} className={styles.caseStep}>
                    <dt className={styles.caseLabel}>{step.label}</dt>
                    <dd className={styles.caseText}>{caseStudy[step.key]}</dd>
                  </div>
                ))}
              </dl>
            )}

            {tags.length > 0 && (
              <ul className={styles.tags} aria-label="Tecnologias">
                {tags.map((tag) => (
                  <li key={tag}>
                    <Chip>{tag}</Chip>
                  </li>
                ))}
              </ul>
            )}

            {liveUrl && (
              <div className={styles.actions}>
                <Button
                  href={liveUrl}
                  external
                  aria-label={`Ver site ${title} (abre em nova aba)`}
                >
                  Ver site
                  <ArrowUpRight aria-hidden="true" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  )
}
