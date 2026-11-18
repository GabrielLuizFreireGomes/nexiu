import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { MotionConfig, motion } from 'motion/react'
import { navLinks, sections } from '../../data/navigation'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useEscapeKey } from '../../hooks/useEscapeKey'
import { useScrolled } from '../../hooks/useScrolled'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { getInitials } from '../../utils/getInitials'
import { ScrollProgress } from './ScrollProgress'
import styles from './Header.module.css'

const NAV_SECTION_IDS = navLinks.map((link) => link.id)
// Mesma largura em que o CSS troca o menu hambúrguer pelos links em linha.
const DESKTOP_QUERY = '(min-width: 48rem)'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const toggleRef = useRef(null)
  const menuId = useId()
  const activeId = useActiveSection(NAV_SECTION_IDS)
  const scrolled = useScrolled()
  const reducedMotion = useReducedMotion()

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const closeMenuWithEscape = useCallback(() => {
    setMenuOpen(false)
    toggleRef.current?.focus()
  }, [])
  useEscapeKey(closeMenuWithEscape, menuOpen)

  useEffect(() => {
    if (!menuOpen) return undefined

    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) closeMenu()
    }
    const desktopQuery = window.matchMedia(DESKTOP_QUERY)

    document.addEventListener('pointerdown', handlePointerDown)
    desktopQuery.addEventListener('change', closeMenu)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      desktopQuery.removeEventListener('change', closeMenu)
    }
  }, [menuOpen, closeMenu])

  const headerClasses = [styles.header, scrolled && styles.scrolled].filter(Boolean).join(' ')

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
      <ScrollProgress visible={scrolled} />
      <div className={styles.headerZone}>
        <span className={styles.hoverZone} aria-hidden="true" />
        <header ref={headerRef} className={headerClasses}>
        <div className={`container ${styles.inner}`}>
          <a href={`#${sections.home}`} className={styles.logo} onClick={closeMenu}>
            {profile.wordmark ? (
              <img
                className={styles.wordmark}
                src={profile.wordmark}
                alt={profile.name}
                width="870"
                height="260"
              />
            ) : (
              <>
                <span className={styles.logoMark} aria-hidden="true">
                  {getInitials(profile.name)}
                </span>
                <span className={styles.logoName}>{profile.name}</span>
              </>
            )}
          </a>

          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={`${styles.menuIcon} ${menuOpen ? styles.menuIconOpen : ''}`}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
            </span>
          </button>

          <nav
            id={menuId}
            aria-label="Principal"
            className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
          >
            <ul className={styles.links}>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={styles.link}
                    aria-current={activeId === link.id ? 'location' : undefined}
                    onClick={closeMenu}
                  >
                    {link.label}
                    {activeId === link.id && (
                      <motion.span
                        className={styles.activeIndicator}
                        layoutId="active-nav-indicator"
                        transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.7 }}
                        aria-hidden="true"
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        </header>
      </div>
    </MotionConfig>
  )
}
