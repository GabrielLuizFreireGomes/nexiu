import { MotionConfig } from 'motion/react'
import { About } from './components/About/About'
import { Contact } from './components/Contact/Contact'
import { Footer } from './components/Footer/Footer'
import { Header } from './components/Header/Header'
import { Hero } from './components/Hero/Hero'
import { Projects } from './components/Projects/Projects'
import { Services } from './components/Services/Services'
import { Skills } from './components/Skills/Skills'
import { Testimonials } from './components/Testimonials/Testimonials'
import { SmoothScroll } from './components/ui/SmoothScroll'
import { useReducedMotion } from './hooks/useReducedMotion'

export default function App() {
  const reducedMotion = useReducedMotion()

  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
      <SmoothScroll />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
