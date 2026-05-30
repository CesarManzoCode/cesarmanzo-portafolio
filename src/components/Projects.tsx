import { portfolioData } from '../data/portfolio';
import { Container } from './Container';
import { ProjectCard } from './ProjectCard';
import { ProjectFeatured } from './ProjectFeatured';
import { Reveal } from './fx/Reveal';
import { SectionHeading } from './SectionHeading';

export function Projects() {
  const featured = portfolioData.projects.find((p) => p.featured);
  const rest = portfolioData.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-shell">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Proyectos"
          title="Productos reales, en producción"
          description="No son demos: son sistemas completos que diseñé, construí y desplegué — con usuarios, pagos y tests que los respaldan."
        />

        <div className="mt-12 space-y-6">
          {featured && <ProjectFeatured project={featured} />}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((project, index) => (
              <Reveal key={project.name} delay={index * 0.08} className="h-full">
                <ProjectCard project={project} index={index + 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
