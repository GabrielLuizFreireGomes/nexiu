import { profile } from '../../data/profile'
import { getWhatsAppUrl } from '../../utils/getWhatsAppUrl'
import { BrandIcon } from './BrandIcon'
import styles from './SocialLinks.module.css'

/**
 * Lista de links para as redes sociais da empresa, como botões só com ícone.
 * Com `withWhatsApp`, o WhatsApp entra como primeiro item.
 */
export function SocialLinks({ className = '', withWhatsApp = false }) {
  const whatsappUrl = withWhatsApp ? getWhatsAppUrl(profile.whatsapp) : null
  const links = whatsappUrl
    ? [{ id: 'whatsapp', label: 'WhatsApp', url: whatsappUrl }, ...profile.socials]
    : profile.socials

  if (links.length === 0) return null

  return (
    <ul className={`${styles.list} ${className}`}>
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.url}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} (abre em nova aba)`}
          >
            <BrandIcon id={link.id} />
          </a>
        </li>
      ))}
    </ul>
  )
}
