const BEHANCE_URL = 'https://www.behance.net/shivampandey69'
const CACHE_TTL = 60 * 60 * 1000
const FETCH_TIMEOUT = 8000
const MAX_CONCURRENT = 6

interface Cover {
  url: string
  width: number | null
  type: string
}

interface BehanceProject {
  id: number
  title: string
  image: string
  behanceUrl: string
  description: string
  tools: string[]
  tags: string[]
  images: string[]
  publishedOn: number
}

let cache: { data: BehanceProject[]; timestamp: number } | null = null

function fetchWithTimeout(url: string, timeout = FETCH_TIMEOUT) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)
  return fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; PortfolioBot/1.0)' },
    signal: controller.signal,
  }).finally(() => clearTimeout(id))
}

function extractProfileProjects(html: string): { id: number; name: string; url: string; image: string; publishedOn: number }[] {
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g
  let match

  while ((match = scriptRegex.exec(html)) !== null) {
    const content = match[1].trim()
    if (content.startsWith('{') && content.includes('profileProjects')) {
      const state = JSON.parse(content)
      const projects: any[] = state?.profile?.activeSection?.work?.profileProjects ?? []

      return projects.map((p) => {
        const covers = p.covers?.allAvailable ?? []
        const image = covers.length > 0 ? covers[0].url : ''
        return { id: p.id, name: p.name, url: p.url, image, publishedOn: p.publishedOn }
      })
    }
  }
  return []
}

function extractProjectDetails(html: string): { description: string; tools: string[]; tags: string[]; images: string[] } | null {
  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g
  let match

  while ((match = scriptRegex.exec(html)) !== null) {
    const content = match[1].trim()
    if (content.startsWith('{') && content.includes('"modules"')) {
      const state = JSON.parse(content)
      const proj = state?.project?.project
      if (!proj) return null

      const modules: any[] = proj.modules ?? []
      const images = modules
        .map((m: any) => {
          const sizes = m.imageSizes?.allAvailable ?? []
          const sorted = [...sizes].sort((a: any, b: any) => (b.width ?? Infinity) - (a.width ?? Infinity))
          return sorted[0]?.url || m.src || ''
        })
        .filter(Boolean)

      const tools = (proj.tools ?? []).map((t: any) => t.title)
      const tags = (proj.tags ?? []).map((t: any) => t.title)

      return {
        description: proj.description || '',
        tools,
        tags,
        images,
      }
    }
  }
  return null
}

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return Response.json(cache.data, {
      headers: { 'Cache-Control': 'public, max-age=3600' },
    })
  }

  try {
    const profileRes = await fetchWithTimeout(BEHANCE_URL)
    if (!profileRes.ok) {
      return Response.json({ error: 'Failed to fetch Behance profile' }, { status: 502 })
    }

    const profileHtml = await profileRes.text()
    const projects = extractProfileProjects(profileHtml)

    if (projects.length === 0) {
      return Response.json({ error: 'No projects found' }, { status: 502 })
    }

    const results: BehanceProject[] = []

    for (let i = 0; i < projects.length; i += MAX_CONCURRENT) {
      const batch = projects.slice(i, i + MAX_CONCURRENT)
      const batchResults = await Promise.allSettled(
        batch.map(async (p) => {
          try {
            const res = await fetchWithTimeout(p.url)
            if (!res.ok) throw new Error('Failed to fetch project page')
            const html = await res.text()
            const details = extractProjectDetails(html)

            return {
              id: p.id,
              title: p.name,
              image: p.image,
              behanceUrl: p.url,
              description: details?.description ?? '',
              tools: details?.tools ?? [],
              tags: details?.tags ?? [],
              images: details?.images?.length ? details.images : [p.image],
              publishedOn: p.publishedOn,
            }
          } catch {
            return {
              id: p.id,
              title: p.name,
              image: p.image,
              behanceUrl: p.url,
              description: '',
              tools: [],
              tags: [],
              images: [p.image],
              publishedOn: p.publishedOn,
            }
          }
        })
      )

      for (const result of batchResults) {
        if (result.status === 'fulfilled') {
          results.push(result.value)
        }
      }
    }

    results.sort((a, b) => b.publishedOn - a.publishedOn)

    cache = { data: results, timestamp: Date.now() }

    return Response.json(results, {
      headers: { 'Cache-Control': 'public, max-age=3600' },
    })
  } catch {
    if (cache) {
      return Response.json(cache.data, {
        headers: { 'Cache-Control': 'public, max-age=60' },
      })
    }
    return Response.json({ error: 'Failed to fetch Behance projects' }, { status: 502 })
  }
}
