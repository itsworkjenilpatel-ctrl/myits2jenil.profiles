import { useEffect, useState } from 'react'
import { useConfig } from '../hooks/useConfig'
import { GithubIcon, InstagramIcon, ContactIcon, DiscordIcon, LocationIcon, StatusIcon } from '../components/Icons'
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
      <div className="about__grid">
        <div className="about__visual">
          <div className="about__logo-ring">
            <img className="about__logo" src={config.developerLogo} alt={`${config.developerName} logo`} />
          </div>
        </div>

        <div className="about__content">
          <span className="about__eyebrow">About the developer</span>

          <h1 className="about__title">
            I'm <span className="about__title-accent">{config.developerName}</span>
          </h1>

          {config.profile?.realName && (
            <p className="about__realname">{config.profile.realName}</p>
          )}

          <div className="about__role-line">
            <p className="about__role-text mono">
              <span className="about__role-dot" /> {currentRole}
            </p>
          </div>

          {config.profile && (
            <div className="about__meta">
              {config.profile.location && (
                <span className="about__meta-tag">
                  <LocationIcon />
                  {config.profile.location}
                </span>
              )}
              {config.profile.status && (
                <span className="about__meta-tag">
                  <StatusIcon />
                  {config.profile.status}
                </span>
              )}
              {config.profile.age !== undefined && (
                <span className="about__meta-tag">{config.profile.age} yrs</span>
              )}
            </div>
          )}

          <p className="about__bio">
            {config.profile?.bio ??
              'I work on Discord server development, Discord bot development, and hosting & IT management — building and maintaining reliable, well-structured systems for communities and teams.'}
          </p>

          {config.tagline && <p className="about__tagline">"{config.tagline}"</p>}

          <div className="about__actions">
            {config.socials.contact && (
              <a
                className="about__btn about__btn--primary"
                href={
                  config.socials.contact.includes('@') && !config.socials.contact.startsWith('mailto:')
                    ? `mailto:${config.socials.contact}`
                    : config.socials.contact
                }
                target="_blank"
                rel="noreferrer"
              >
                <ContactIcon />
                Contact via Mail
              </a>
            )}
            {config.socials.discord && (
              <a
                className="about__btn about__btn--discord"
                href={config.socials.discord}
                target="_blank"
                rel="noreferrer"
              >
                <DiscordIcon />
                Contact via Discord
              </a>
            )}
            {config.socials.github && (
              <a className="about__btn" href={config.socials.github} target="_blank" rel="noreferrer">
                <GithubIcon />
                GitHub
              </a>
            )}
            {config.socials.instagram && (
              <a className="about__btn" href={config.socials.instagram} target="_blank" rel="noreferrer">
                <InstagramIcon />
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
