/** Keep prerendered content visible; BaseLayout animates it when it enters view. */
export function Reveal({ children, delay = 0, className }) {
  return (
    <div
      className={className}
      data-reveal
      data-reveal-delay={delay}
    >
      {children}
    </div>
  )
}
