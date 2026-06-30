'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [showText, setShowText] = useState(false)
  const [progress, setProgress] = useState(0)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 300)

    const duration = 3800
    const interval = 100
    let elapsed = 0
    let timer: ReturnType<typeof setInterval>

    timer = setInterval(() => {
      elapsed += interval
      const p = Math.min(Math.round((elapsed / duration) * 100), 100)
      setProgress(p)
      if (p >= 100) clearInterval(timer)
    }, interval)

    if (barRef.current) {
      barRef.current.style.transition = `width ${duration}ms linear`
      barRef.current.style.width = '100%'
    }

    const exitTimer = setTimeout(() => setIsLoading(false), 4200)
    return () => {
      clearTimeout(textTimer)
      clearTimeout(exitTimer)
      clearInterval(timer)
    }
  }, [])

  const text = "Hello there!"

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center gap-5 md:gap-10"
        >
          <div className="flex items-center gap-1.5">
            <h1>
            {text.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, rotateX: -90 }}
                animate={
                  showText
                    ? { opacity: 1, y: 0, rotateX: 0 }
                    : { opacity: 0, y: 60, rotateX: -90 }
                }
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-5xl md:text-7xl font-bold tracking-tight inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
            </h1>
          </div>

          <div className="w-64 md:w-80 flex items-center gap-4">
            <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
              <div
                ref={barRef}
                className="h-full bg-foreground rounded-full"
                style={{ width: '0%' }}
              />
            </div>
            <p className="text-lg tabular-nums text-foreground/70 w-10 text-right">
              {progress}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
