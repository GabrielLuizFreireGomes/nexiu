import { ArrowUp } from 'lucide-react'
import { sections } from '../../data/navigation'
import { profile } from '../../data/profile'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p>
          © {year} {profile.name}. Todos os direitos reservados.
        </p>
        <a href={`#${sections.home}`} className={styles.topLink}>
          Voltar ao topo
          <ArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  )
}
