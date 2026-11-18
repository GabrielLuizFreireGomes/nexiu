import { useState } from 'react'
import { profile } from '../../data/profile'
import { getInitials } from '../../utils/getInitials'
import styles from './Avatar.module.css'

/** Logo da empresa; sem logo (ou se ele falhar ao carregar), mostra as iniciais. */
export function Avatar() {
  const [failed, setFailed] = useState(false)
  const showLogo = Boolean(profile.logo) && !failed

  if (showLogo) {
    return (
      <img
        className={styles.avatar}
        src={profile.logo}
        alt={`Logo ${profile.name}`}
        width={240}
        height={240}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <div className={`${styles.avatar} ${styles.initials}`} aria-hidden="true">
      {getInitials(profile.name)}
    </div>
  )
}
