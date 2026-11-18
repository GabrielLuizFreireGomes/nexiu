import { Mail } from 'lucide-react'
import { sections } from '../../data/navigation'
import { profile } from '../../data/profile'
import { getWhatsAppUrl } from '../../utils/getWhatsAppUrl'
import { BrandIcon } from '../ui/BrandIcon'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionTitle } from '../ui/SectionTitle'
import { SocialLinks } from '../ui/SocialLinks'
import styles from './Contact.module.css'

const TITLE_ID = 'contato-titulo'

export function Contact() {
  const mailto = profile.email ? `mailto:${profile.email}` : null
  const whatsappUrl = getWhatsAppUrl(profile.whatsapp)

  return (
    <Section id={sections.contact} titleId={TITLE_ID}>
      <Reveal className={styles.panel}>
        <SectionTitle
          id={TITLE_ID}
          title="Vamos conversar?"
          description={profile.contactText}
          align="center"
        />

        <div className={styles.actions}>
          {whatsappUrl ? (
            <Button
              href={whatsappUrl}
              external
              aria-label="Chamar no WhatsApp (abre em nova aba)"
            >
              <BrandIcon id="whatsapp" />
              Chamar no WhatsApp
            </Button>
          ) : (
            // Sem WhatsApp configurado, o e-mail assume o papel de botão principal.
            mailto && (
              <Button href={mailto}>
                <Mail aria-hidden="true" />
                Enviar e-mail
              </Button>
            )
          )}
        </div>
        {mailto && (
          <a href={mailto} className={styles.email}>
            {profile.email}
          </a>
        )}

        <SocialLinks className={styles.socials} />
      </Reveal>
    </Section>
  )
}
