import { useEffect, useState } from 'react'

export interface SiteConfig {
  developerName: string
  developerLogo: string
  navLogo?: string
  roles: string[]
  tagline: string
  profile?: {
    realName: string
    age: number
    status: string
    location: string
    education: string
    bio: string
  }
  skills?: string[]
  availableForFreelance?: boolean
  resumeUrl?: string
  projectsUrl?: string
  socials: {
    github?: string
    instagram?: string
    contact?: string
    discord?: string
    youtube?: string
  }
}

const FALLBACK: SiteConfig = {
  developerName: 'Developer',
  developerLogo: '/logo.svg',
  navLogo: '/logo.svg',
  roles: ['Discord Server Development', 'Discord Bot Development', 'IT Management'],
  tagline: '',
  socials: {},
}

let cache: SiteConfig | null = null

export function useConfig(): { config: SiteConfig; loading: boolean } {
  const [config, setConfig] = useState<SiteConfig>(cache ?? FALLBACK)
  const [loading, setLoading] = useState(!cache)

  useEffect(() => {
    if (cache) return
    let active = true
    fetch('/config.json')
      .then((res) => res.json())
      .then((data: SiteConfig) => {
        if (!active) return
        cache = data
        setConfig(data)
        setLoading(false)
      })
      .catch(() => {
        if (!active) return
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return { config, loading }
}
