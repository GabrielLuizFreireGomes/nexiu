import { useCallback, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import { sections } from '../../data/navigation'
import { projects } from '../../data/projects'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionTitle } from '../ui/SectionTitle'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'
import styles from './Projects.module.css'

const TITLE_ID = 'projetos-titulo'

// Destaques primeiro; entre os demais vale a ordem do array (sort é estável).
const sortedProjects = [...projects].sort(
  (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
)

export function Projects() {
  const [selectedId, setSelectedId] = useState(null)
  const closeModal = useCallback(() => setSelectedId(null), [])
  const selectedProject = sortedProjects.find((project) => project.id === selectedId)

  return (
    <Section id={sections.projects} titleId={TITLE_ID}>
      <Reveal>
        <SectionTitle
          id={TITLE_ID}
          title="Sites e apps que criamos"
          description="Uma seleção dos nossos trabalhos. Clique em um projeto para ver os detalhes."
        />
      </Reveal>

      {sortedProjects.length === 0 ? (
        <Reveal>
          <p className={styles.empty}>
            Ainda não há projetos por aqui. Em breve esta seção ganha novidades.
          </p>
        </Reveal>
      ) : (
        <>
          <ul className={styles.grid} data-project-grid>
            {sortedProjects.map((project, index) => (
              <li key={project.id}>
                {/* Cada card surge sozinho; o da direita um pouco depois. */}
                <Reveal delay={(index % 2) * 0.12} className={styles.cardReveal}>
                  <ProjectCard
                    project={project}
                    number={index + 1}
                    onOpen={() => setSelectedId(project.id)}
                  />
                </Reveal>
              </li>
            ))}
          </ul>

          <AnimatePresence>
            {selectedProject && (
              <ProjectModal
                key={selectedProject.id}
                project={selectedProject}
                onClose={closeModal}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </Section>
  )
}
