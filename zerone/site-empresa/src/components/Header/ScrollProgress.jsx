import { motion, useScroll, useSpring } from 'motion/react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './ScrollProgress.module.css'

export function ScrollProgress({ visible }) {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 105, damping: 28, mass: 0.38 })
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={`${styles.progress} ${visible ? styles.visible : ''}`}
      style={{ scaleX: reducedMotion ? scrollYProgress : smoothProgress }}
      initial={false}
      transition={reducedMotion ? { duration: 0 } : undefined}
      aria-hidden="true"
    />
  )
}
