import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useConfig } from '../hooks/useConfig'
import './Navbar.css'

const NAV_ITEMS = [
  { label: 'About', path: '/' },
  { label: 'Projects', path: '/projects' },
]

export default function Navbar() {
  const { config } = useConfig()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="nav">
      <div className="container nav__inner">
        <div className="nav__brand">
          <img className="nav__logo" src={config.navLogo ?? config.developerLogo} alt={`${config.developerName} logo`} />
          <span className="nav__name">{config.developerName}</span>
        </div>

        <nav className="nav__links">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) => 'nav__link' + (isActive ? ' is-active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className={'nav__toggle' + (open ? ' is-open' : '')}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav__toggle-bars">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {open && (
        <div className="nav__mobile">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              onClick={() => setOpen(false)}
              className={({ isActive }) => 'nav__mobile-link' + (isActive ? ' is-active' : '')}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  )
}
