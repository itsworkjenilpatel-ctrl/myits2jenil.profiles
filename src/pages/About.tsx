import { useEffect, useState } from 'react'
import { useConfig } from '../hooks/useConfig'
import {
  GithubIcon,
  InstagramIcon,
  ContactIcon,
  DiscordIcon,
  LocationIcon,
  YoutubeIcon,
  DownloadIcon,
  RocketIcon,
} from '../components/Icons'
import './About.css'

export default function About() {
  const { config } = useConfig()
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    if (config.roles.length <= 1) return
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % config.roles.length)
    }, 2200)
    return () => clearInterval(id)
  }, [config.roles.length])

  const currentRole = config.roles[roleIndex] ?? ''

  return (
    <section className="about">
      <div className="about__glow" />
      <div className="about__hero">
        {config.availableForFreelance && (
          <span className="about__badge">
            <span className="about__badge-dot" />
            Available for freelance
          </span>
        )}

        <h1 className="about__title">
          Hi, I'm <span className="about__title-accent">{config.developerName}</span>
        </h1>

        {config.profile?.realName && (
          <p className="about__realname">
            Real name: {config.profile.realName} <span className="about__realname-sep">·</span> Dev name: {config.developerName}
          </p>
        )}

        <p className="about__role-text mono">{currentRole}</p>

        <p className="about__bio">
          {config.profile?.bio ??
            'I build fast, delightful web apps and scalable Discord bots.'}
        </p>

        <div className="about__actions">
          {config.resumeUrl && (
            <a
              className="about__btn about__btn--primary"
              href={config.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              <DownloadIcon />
              Download Résumé
            </a>
          )}
          {config.projectsUrl && (
            <a className="about__btn" href={config.projectsUrl}>
              <RocketIcon />
              View Projects
            </a>
          )}
        </div>

        <div className="about__meta">
          {config.profile?.location && (
            <span className="about__meta-item">
              <LocationIcon />
              {config.profile.location}
            </span>
          )}

          {config.profile?.location && <span className="about__meta-sep" />}

          {config.socials.github && (
            <a className="about__meta-item about__meta-link" href={config.socials.github} target="_blank" rel="noreferrer">
              <GithubIcon />
              GitHub
            </a>
          )}
          {config.socials.contact && (
            <a
              className="about__meta-item about__meta-link"
              href={
                config.socials.contact.includes('@') && !config.socials.contact.startsWith('mailto:')
                  ? `mailto:${config.socials.contact}`
                  : config.socials.contact
              }
              target="_blank"
              rel="noreferrer"
            >
              <ContactIcon />
              Email
            </a>
          )}
          {config.socials.discord && (
            <a className="about__meta-item about__meta-link" href={config.socials.discord} target="_blank" rel="noreferrer">
              <DiscordIcon />
              Discord
            </a>
          )}
          {config.socials.youtube && (
            <a className="about__meta-item about__meta-link" href={config.socials.youtube} target="_blank" rel="noreferrer">
              <YoutubeIcon />
              YouTube
            </a>
          )}
          {config.socials.instagram && (
            <a className="about__meta-item about__meta-link" href={config.socials.instagram} target="_blank" rel="noreferrer">
              <InstagramIcon />
              Instagram
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
