import styles from './Section.module.css'

/**
 * Invólucro das seções da página: aplica o espaçamento vertical, a quebra
 * sutil no topo e a largura do conteúdo. `titleId` deve ser o id do título
 * da seção, para nomeá-la para leitores de tela.
 */
export function Section({ id, titleId, children }) {
  return (
    <section id={id} aria-labelledby={titleId} className={styles.section}>
      <div className="container">{children}</div>
    </section>
  )
}
