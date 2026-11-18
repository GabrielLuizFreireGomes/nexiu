import styles from './Button.module.css'

/**
 * Botão com aparência única para links e ações: renderiza <a> quando recebe
 * `href` e <button> caso contrário. Com `external`, abre em nova aba.
 */
export function Button({
  href,
  variant = 'primary',
  size = 'md',
  external = false,
  className = '',
  children,
  ...props
}) {
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ')

  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <a href={href} className={classes} {...externalProps} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
