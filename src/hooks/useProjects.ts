import { useEffect, useState } from 'react'

export interface ProjectLink {
  label: string
  url: string
  type?: 'live' | 'code' | 'external'
}

export interface Project {
  name: string
  image?: string
  shortDescription?: string
  description?: string
  tags?: string[]
  links?: ProjectLink[]
}

let cache: Project[] | null = null

export function useProjects(): { projects: Project[]; loading: boolean } {
  const [projects, setProjects] = useState<Project[]>(cache ?? [])
  const [loading, setLoading] = useState(!cache)

  useEffect(() => {
    if (cache) return
    let active = true
    fetch('/projects.json')
      .then((res) => res.json())
      .then((data: Project[]) => {
        if (!active) return
        cache = data
        setProjects(data)
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

  return { projects, loading }
}
