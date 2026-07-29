'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaGlobe } from 'react-icons/fa'

interface ProjectData {
  name: string
  url: string
  id?: string
  icon?: string
  type: 'playstore' | 'appstore' | 'website'
  screenshots?: string[]
  screenshot?: string
  title?: string
}

const PROJECTS: ProjectData[] = [
  {
    name: 'Emma Health',
    url: 'https://play.google.com/store/apps/details?id=app.emmahealth.twa',
    type: 'playstore',
  },
  {
    name: 'MyLLC Manager',
    url: 'https://apps.apple.com/in/app/myllc-manager/id6749905082',
    id: '6749905082',
    type: 'appstore',
  },
  {
    name: 'Michelle Esthetics',
    url: 'https://michelleesthetics.com/',
    type: 'website',
  },
  {
    name: 'PawQuote',
    url: 'https://www.pawquote.com/',
    type: 'website',
  },
  {
    name: 'The Everyday Family',
    url: 'https://www.theeverydayfamily.org/',
    type: 'website',
  },
]

function PhoneScreenshots({ screenshots }: { screenshots: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (screenshots.length < 2) return
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % screenshots.length)
    }, 1000)
    return () => clearInterval(timer)
  }, [screenshots.length])

  return (
    <div className="relative h-full aspect-[3/5] overflow-hidden rounded-lg bg-foreground/5">
      {screenshots.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`Screenshot ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${i === index ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
    </div>
  )
}

function LaptopScreenshot({ screenshot }: { screenshot: string }) {
  return (
    <div className="h-full aspect-[5/3] max-w-[600px]">
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-foreground/10 rounded-t-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <div className="ml-2 flex-1 max-w-[160px] h-3 bg-foreground/10 rounded" />
        </div>
        <div className="flex-1 overflow-hidden rounded-b-lg bg-foreground/5">
          <img src={screenshot} alt="Website screenshot" className="w-full h-full object-cover object-top" />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, data }: { project: ProjectData; data: ProjectData | null }) {
  const storeIcon = {
    playstore: (
      <svg aria-hidden="true" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <path fill="none" d="M0,0h40v40H0V0z"></path><g><path d="M19.7,19.2L4.3,35.3c0,0,0,0,0,0c0.5,1.7,2.1,3,4,3c0.8,0,1.5-0.2,2.1-0.6l0,0l17.4-9.9L19.7,19.2z" fill="#EA4335"></path><path d="M35.3,16.4L35.3,16.4l-7.5-4.3l-8.4,7.4l8.5,8.3l7.5-4.2c1.3-0.7,2.2-2.1,2.2-3.6C37.5,18.5,36.6,17.1,35.3,16.4z" fill="#FBBC04"></path><path d="M4.3,4.7C4.2,5,4.2,5.4,4.2,5.8v28.5c0,0.4,0,0.7,0.1,1.1l16-15.7L4.3,4.7z" fill="#4285F4"></path><path d="M19.8,20l8-7.9L10.5,2.3C9.9,1.9,9.1,1.7,8.3,1.7c-1.9,0-3.6,1.3-4,3c0,0,0,0,0,0L19.8,20z" fill="#34A853"></path></g>
      </svg>
    ),
    appstore: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="16" height="16">
        <linearGradient id="as-grad" gradientUnits="userSpaceOnUse" x1="400.05" y1="798.7717" x2="400.05" y2="-1.2283" gradientTransform="matrix(1 0 0 -1 0 798.7717)">
          <stop offset="0" stopColor="#18BFFB" />
          <stop offset="1" stopColor="#2072F3" />
        </linearGradient>
        <path fill="url(#as-grad)" d="M638.4,0H161.6C72.3,0,0,72.3,0,161.6v476.9C0,727.7,72.3,800,161.6,800h476.9c89.2,0,161.6-72.3,161.6-161.6V161.6C800,72.3,727.7,0,638.4,0z" />
        <path fill="#FFFFFF" d="M396.6,183.8l16.2-28c10-17.5,32.3-23.4,49.8-13.4s23.4,32.3,13.4,49.8L319.9,462.4h112.9c36.6,0,57.1,43,41.2,72.8H143c-20.2,0-36.4-16.2-36.4-36.4c0-20.2,16.2-36.4,36.4-36.4h92.8l118.8-205.9l-37.1-64.4c-10-17.5-4.1-39.6,13.4-49.8c17.5-10,39.6-4.1,49.8,13.4L396.6,183.8L396.6,183.8z M256.2,572.7l-35,60.7c-10,17.5-32.3,23.4-49.8,13.4S148,614.5,158,597l26-45C213.4,542.9,237.3,549.9,256.2,572.7L256.2,572.7z M557.6,462.6h94.7c20.2,0,36.4,16.2,36.4,36.4c0,20.2-16.2,36.4-36.4,36.4h-52.6l35.5,61.6c10,17.5,4.1,39.6-13.4,49.8c-17.5,10-39.6,4.1-49.8-13.4c-59.8-103.7-104.7-181.3-134.5-233c-30.5-52.6-8.7-105.4,12.8-123.3C474.2,318.1,509.9,380,557.6,462.6L557.6,462.6z" />
      </svg>
    ),
    website: <FaGlobe size={16} />,
  }

  const storeLabel = {
    playstore: 'Google Play',
    appstore: 'App Store',
    website: 'Website',
  }

  return (
    <div className="flex-shrink-0 w-auto">
      <div className="bg-foreground/5 rounded-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-center p-6 h-[280px] md:h-[380px] bg-foreground/[0.02]">
          {project.type !== 'website' ? (
            data?.screenshots && data.screenshots.length > 0 ? (
              <PhoneScreenshots screenshots={data.screenshots} />
            ) : (
              <div className="h-full aspect-[9/19] rounded-xl bg-foreground/10 flex items-center justify-center">
                {data?.icon ? (
                  <img src={data.icon} alt={project.name} className="w-12 h-12 opacity-30" />
                ) : (
                  <span className="text-foreground/20 text-sm">{project.name.charAt(0)}</span>
                )}
              </div>
            )
          ) : data?.screenshot ? (
            <LaptopScreenshot screenshot={data.screenshot} />
          ) : (
            <div className="h-full aspect-[4/3] max-w-[600px] rounded-xl bg-foreground/10 flex items-center justify-center">
              <img src={`https://www.google.com/s2/favicons?domain=${new URL(project.url).hostname}&sz=64`} alt={project.name} className="w-12 h-12 opacity-30" />
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 px-4 md:px-5 py-3 md:py-4 border-t border-foreground/10">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg overflow-hidden bg-foreground/10 flex-shrink-0">
            {data?.icon ? (
              <img src={data.icon} alt={project.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-foreground/30 font-bold text-sm">
                {project.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm font-semibold truncate">{data?.title || project.name}</p>
            <div className="flex items-center gap-1 mt-0.5 text-foreground/50">
              <span className="text-[10px] md:text-xs">Available on:</span>
              <span className="flex items-center gap-1 text-[10px] md:text-[10px] font-medium text-foreground/70">
                {storeIcon[project.type]} {storeLabel[project.type]}
              </span>
            </div>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-2 rounded-md bg-foreground/10 hover:bg-foreground/20 transition-colors text-foreground/60 hover:text-foreground"
          >
            {storeIcon[project.type]}
          </a>
        </div>
      </div>
    </div>
  )
}

export function FeaturedProjects() {
  const [projectsData, setProjectsData] = useState<Record<string, ProjectData | null>>({})

  useEffect(() => {
    const fetchAll = async () => {
      const results: Record<string, ProjectData | null> = {}
      for (const project of PROJECTS) {
        try {
          const params = new URLSearchParams({ type: project.type, url: project.url })
          if (project.id) params.set('id', project.id)
          const res = await fetch(`/api/projects?${params}`)
          results[project.name] = res.ok ? await res.json() : null
        } catch {
          results[project.name] = null
        }
      }
      setProjectsData(results)
    }
    fetchAll()
  }, [])

  return (
    <section className="pt-16 md:pt-20 px-6 bg-background border-t border-foreground/5 overflow-hidden">
      <div className="max-w-7xl mx-auto mb-8 md:mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-12 md:mb-16" style={{ fontFamily: 'var(--font-averia)' }}
        >
          ✦ My Live Projects.
        </motion.h2>
      </div>

      <div className="relative w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
        <div
          className="flex"
          style={{
            animation: 'marquee 20s linear infinite',
            width: 'fit-content',
          }}
        >
          {[...PROJECTS, ...PROJECTS].map((project, i) => (
            <div key={`${project.name}-${i}`} className="pr-4 md:pr-6">
              <ProjectCard project={project} data={projectsData[project.name] ?? null} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
