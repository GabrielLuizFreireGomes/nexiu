import styles from './Chip.module.css'

/**
 * Etiqueta em formato de pílula. Com `onClick` vira um botão de alternância
 * (usado nos filtros); sem ele é apenas texto.
 */
export function Chip({ children, size = 'md', active = false, onClick, className = '' }) {
  const classes = [styles.chip, styles[size], className].filter(Boolean).join(' ')

  if (onClick) {
    return (
      <button
        type="button"
        className={`${classes} ${styles.interactive}`}
        aria-pressed={active}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }

  return <span className={classes}>{children}</span>
}
