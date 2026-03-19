import { portfolioData } from '../data/portfolio';
import { Container } from './Container';
import { ProjectCard } from './ProjectCard';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

export function Projects() {
  return (
    <section id="projects" className="section-shell">
      <Container>
        <SectionHeading
          eyebrow="Proyectos"
          title="Soluciones Desarrolladas"
          description="Implementaciones backend y soluciones de IA orientadas a procesamiento de datos, automatización y rendimiento en entornos reales."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {portfolioData.projects.map((project, index) => (
            <Reveal key={project.name} delay={index * 0.08} className="h-full">
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
