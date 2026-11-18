import { Star } from 'lucide-react'
import styles from './FeaturedBadge.module.css'

/** Selo discreto que marca os projetos com `featured: true`. */
export function FeaturedBadge({ className = '' }) {
  return (
    <span className={`${styles.badge} ${className}`}>
      <Star aria-hidden="true" />
      Destaque
    </span>
  )
}
