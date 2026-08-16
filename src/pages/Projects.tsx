import { useProjects, type ProjectLink } from '../hooks/useProjects'
import { ExternalLinkIcon, CodeIcon } from '../components/Icons'
import './Projects.css'

function linkIcon(type?: ProjectLink['type']) {
  if (type === 'code') return <CodeIcon />
  return <ExternalLinkIcon />
}

export default function Projects() {
  const { projects, loading } = useProjects()

  return (
    <section className="projects">
      <div className="projects__inner">
        <div className="projects__header">
          <span className="projects__eyebrow">Portfolio</span>
          <h2 className="projects__title">Featured Projects</h2>
        </div>

        {!loading && projects.length === 0 && (
          <p className="projects__empty">No projects added yet.</p>
        )}

        <div className="projects__grid">
          {projects.map((project) => (
            <article className="project-card" key={project.name}>
              {project.image && (
                <div className="project-card__media">
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    onError={(e) => {
                      const el = e.currentTarget
                      el.style.display = 'none'
                      el.parentElement?.classList.add('project-card__media--empty')
                    }}
                  />
                </div>
              )}

              <div className="project-card__body">
                <h3 className="project-card__name">{project.name}</h3>

                {project.shortDescription && (
                  <p className="project-card__desc">{project.shortDescription}</p>
                )}

                {!project.shortDescription && project.description && (
                  <p className="project-card__desc">{project.description}</p>
                )}

                {project.tags && project.tags.length > 0 && (
                  <div className="project-card__tags">
                    {project.tags.map((tag) => (
                      <span className="project-card__tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {project.links && project.links.length > 0 && (
                  <div className="project-card__links">
                    {project.links.map((link) => (
                      <a
                        key={link.label + link.url}
                        className={
                          'project-card__link' +
                          (link.type === 'live' ? ' project-card__link--primary' : '')
                        }
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {linkIcon(link.type)}
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
