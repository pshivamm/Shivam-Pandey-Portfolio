'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { useEffect } from 'react'
import type { BehanceProject } from './Works'

interface WorkModalProps {
  work: BehanceProject | null
  onClose: () => void
}

export function WorkModal({ work, onClose }: WorkModalProps) {
  useEffect(() => {
    if (work) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [work])

  const publishDate = work
    ? new Date(work.publishedOn * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      })
    : ''

  return (
    <AnimatePresence>
      {work && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-60 overflow-y-auto overscroll-y-contain scrollbar-hide"
            style={{ WebkitOverflowScrolling: 'touch' }}
            data-lenis-prevent
          >
            <div className="min-h-full px-4 py-6 md:px-10 md:py-12">
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-5xl mx-auto bg-background rounded-[34px] border border-foreground/10 shadow-2xl"
              >
                <div className="sticky top-6 z-60 flex justify-end px-4 md:px-5 pt-4 md:pt-5">
                  <button
                    onClick={onClose}
                    className="p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 flex flex-col gap-10 md:gap-12 pb-6 px-6 md:pb-16 md:px-18">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="pr-12"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 rounded-xl bg-foreground/10 text-sm font-medium">
                        {publishDate}
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                      {work.title}
                    </h2>

                    {work.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {work.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-lg bg-foreground/5 text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {work.tools?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {work.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1 rounded-lg bg-foreground/10 text-xs font-semibold"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}

                    {work.description && (
                      <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-4xl mb-6">
                        {work.description}
                      </p>
                    )}

                    <a
                      href={work.behanceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      View on Behance
                      <ExternalLink size={16} />
                    </a>
                  </motion.div>

                  {work.images?.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="w-full"
                    >
                      <div className="space-y-8">
                        {work.images.map((img, idx) => (
                          <div key={idx} className="w-full overflow-hidden rounded-xl">
                            <img
                              src={img}
                              alt={`${work.title} - Image ${idx + 1}`}
                              className="w-full h-auto block"
                              loading={idx === 0 ? 'eager' : 'lazy'}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div className="h-1" />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
