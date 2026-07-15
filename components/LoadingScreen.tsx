'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const NUM_PARTICLES = 30

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showSubtitle, setShowSubtitle] = useState(false)

  useEffect(() => {
    const subTimer = setTimeout(() => setShowSubtitle(true), 1500)

    const duration = 3500
    const interval = 30
    let elapsed = 0
    let timer: ReturnType<typeof setInterval>

    timer = setInterval(() => {
      elapsed += interval
      const p = Math.min(elapsed / duration, 1)
      setProgress(p)
      if (p >= 1) clearInterval(timer)
    }, interval)

    const exitTimer = setTimeout(() => setIsLoading(false), 4000)
    return () => {
      clearTimeout(subTimer)
      clearTimeout(exitTimer)
      clearInterval(timer)
    }
  }, [])

  const text = "✻ Hello there! ✻"

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          exit={{ opacity: 0, scale: 1.08, filter: 'blur(4px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          id="loader_bg"
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center gap-10 md:gap-14 overflow-hidden"
        >
          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: NUM_PARTICLES }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-foreground/10"
                style={{
                  left: `${(i / NUM_PARTICLES) * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          {/* Decorative corners */}
          <div className="absolute top-8 left-8 w-8 h-8 md:w-12 md:h-12">
            <motion.div
              className="w-full h-full border-t-2 border-l-2 border-foreground/20 rounded-tl-xl"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div className="absolute top-8 right-8 w-8 h-8 md:w-12 md:h-12">
            <motion.div
              className="w-full h-full border-t-2 border-r-2 border-foreground/20 rounded-tr-xl"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
          </div>
          <div className="absolute bottom-8 left-8 w-8 h-8 md:w-12 md:h-12">
            <motion.div
              className="w-full h-full border-b-2 border-l-2 border-foreground/20 rounded-bl-xl"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </div>
          <div className="absolute bottom-8 right-8 w-8 h-8 md:w-12 md:h-12">
            <motion.div
              className="w-full h-full border-b-2 border-r-2 border-foreground/20 rounded-br-xl"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            />
          </div>

          {/* Main text */}
          <div className="relative z-10 text-center">
            <h1 className="flex flex-wrap justify-center px-4">
              {text.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight inline-block"
                  style={{ fontFamily: 'var(--font-averia)' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>

            <AnimatePresence>
              {showSubtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm md:text-base text-foreground/50 mt-4 md:mt-6 tracking-wide"
                >
                  Welcome to my portfolio
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Ring progress */}
          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-16 h-16 md:w-20 md:h-20">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-foreground/10"
                />
                <motion.circle
                  cx="50" cy="50" r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="text-foreground"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 44}
                  initial={false}
                  animate={{ strokeDashoffset: 2 * Math.PI * 44 * (1 - progress) }}
                  transition={{ duration: 0.03, ease: 'linear' }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm md:text-base font-medium tabular-nums">
                {Math.round(progress * 100)}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
