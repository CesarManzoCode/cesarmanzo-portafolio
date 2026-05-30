import { useI18n } from '../i18n/context';
import { Container } from './Container';
import { ProjectCard } from './ProjectCard';
import { ProjectFeatured } from './ProjectFeatured';
import { Reveal } from './fx/Reveal';
import { SectionHeading } from './SectionHeading';

export function Projects() {
  const { c } = useI18n();
  const featured = c.portfolio.projects.find((p) => p.featured);
  const rest = c.portfolio.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-shell">
      <Container>
        <SectionHeading
          index="02"
          eyebrow={c.sections.projects.eyebrow}
          title={c.sections.projects.title}
          description={c.sections.projects.description}
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
