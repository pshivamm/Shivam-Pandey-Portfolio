'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { WorkModal } from './WorkModal'

export interface BehanceProject {
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

export function Works() {
  const [projects, setProjects] = useState<BehanceProject[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedWork, setSelectedWork] = useState<BehanceProject | null>(null)
  const [showAll, setShowAll] = useState(false)

  const displayed = showAll ? projects : projects.slice(0, 4)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/behance', { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProjects(data)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  return (
    <section id="works" className="min-h-screen py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-12 md:mb-16" style={{ fontFamily: 'var(--font-averia)' }}
        >
          ✦ My Works.
        </motion.h2>

        {loading ? (
          <div className="text-center text-foreground/50 py-20">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-foreground/50 py-20">No projects found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayed.map((work, index) => {
              const isLarge = index === 0

              return (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  // className={`cursor-pointer group ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
                  className={"cursor-pointer group bg-foreground/5 rounded-2xl px-8 py-16 md:px-10 md:py-20"}
                  onClick={() => setSelectedWork(work)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedWork(work)}
                >
                  <div className="flex flex-col h-full">
                    <div
                      className={`relative overflow-hidden rounded-lg border border-foreground/5 bg-foreground/5 flex-1 ${isLarge ? 'h-64 md:h-96' : 'h-40 md:h-48'}`}
                    >
                      <Image
                        src={work.image}
                        alt={work.title}
                        width={isLarge ? 1200 : 600}
                        height={isLarge ? 800 : 400}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="py-3 md:py-4 hidden">
                      {work.tools?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {work.tools.map((tool) => (
                            <span
                              key={tool}
                              className="px-2 py-0.5 bg-foreground/10 rounded text-xs font-medium"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}

                      <h3 className="font-bold mb-2 tracking-tight text-xl mt-1">
                        {work.title}
                      </h3>
                      {work.description && (
                        <p className="text-xs text-foreground/70 line-clamp-2 mb-2 hidden">
                          {work.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        {projects.length > 4 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="px-8 py-3 rounded-full border border-foreground/20 text-foreground font-medium hover:bg-foreground hover:text-background transition-all duration-300"
            >
              {showAll ? 'See less ↑' : 'See them all ✦'}
            </button>
          </div>
        )}
      </div>

      <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </section>
  )
}
