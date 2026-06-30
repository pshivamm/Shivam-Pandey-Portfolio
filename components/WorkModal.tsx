'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from "react";

interface Work {
  id: number
  title: string
  description: string
  category: string
  image: string
  images: string[]
  fullDescription: string
  tags: string[]
  year: string
}

interface WorkModalProps {
  work: Work | null
  onClose: () => void
}

export function WorkModal({ work, onClose }: WorkModalProps) {

  return (
    <AnimatePresence>
      {work && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
                        fixed
                        inset-0
                        z-60
                        overflow-y-auto
                        overscroll-y-contain
                        scrollbar-hide
                      "
                      data-lenis-prevent
          >
            {/* Modal Container */}
            <div className="min-h-full px-4 py-6 md:px-10 md:py-12">
              <div
                onClick={(e) => e.stopPropagation()}
                className="
                          relative
                          w-full
                          max-w-7xl
                          mx-auto
                          bg-background
                          rounded-[34px]
                          border
                          border-foreground/10
                          shadow-2xl
                        "
              >
                {/* Close Button */}
                <div className="sticky top-6 z-60 flex justify-end px-4 md:px-5 pt-4 md:pt-5">
                  <button
                    onClick={onClose}
                    className="p-3 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-10 md:gap-12 pb-6 px-6 md:pb-16 md:px-18">
                  {/* Header - Title and Info */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="pr-12"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-3 py-1 rounded-xl bg-foreground/10 text-sm font-medium">{work.category}</span>
                      <span className="text-sm text-foreground/60 font-medium">{work.year}</span>
                    </div>

                    <h2 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">{work.title}</h2>

                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground/70">
                      Skills Used
                    </h3>

                    <div className="flex flex-wrap gap-3 mb-6">
                      {work.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 rounded-lg bg-foreground/5 text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm md:text-md text-foreground/70 leading-relaxed max-w-4xl">
                      {work.fullDescription}
                    </p>

                  </motion.div>

                  {/* Images Grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="w-full"
                  >
                    <div className="space-y-8">
                      {work.images.map((image, idx) => (
                        <div
                          key={idx}
                          className="relative w-full overflow-hidden bg-foreground/5 aspect-video"
                        >
                          <Image
                            src={image}
                            alt={`${work.title} - Image ${idx + 1}`}
                            width={1200}
                            height={600}
                            priority={idx === 0}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Spacer */}
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
