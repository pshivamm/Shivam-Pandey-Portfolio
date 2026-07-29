'use client'

import { useEffect, useRef, useState } from 'react'

const LOVE_TEXT =
  'transforming ideas into intuitive digital experiences, crafting clean and accessible interfaces, solving real user problems, building side projects, learning emerging technologies, collaborating with passionate people, and paying attention to every pixel.'

const HATE_TEXT =
  'confusing user journeys, cluttered layouts, poor accessibility, inconsistent design systems, unnecessary complexity, and products that put business goals ahead of user needs.'

function WordReveal({ text, progress }: { text: string; progress: number }) {
  const words = text.split(' ')

  return (
    <>
      {words.map((word, i) => {
        const threshold = i / words.length
        const opacity = progress >= threshold
          ? Math.min(1, 0.2 + (progress - threshold) * 8)
          : 0.2
        return (
          <span
            key={`${word}-${i}`}
            className="inline"
            style={{ color: `color-mix(in oklab, var(--foreground) ${opacity * 100}%, transparent)` }}
          >
            {word}{i < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </>
  )
}

export function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height
      const totalScroll = sectionHeight + vh
      const scrolled = vh - sectionTop
      const raw = Math.max(0, Math.min(1, scrolled / (totalScroll * 0.6)))
      setProgress(raw)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const loveProgress = Math.min(1, progress * 2)
  const hateProgress = Math.max(0, Math.min(1, (progress - 0.5) * 2))

  return (
    <section ref={sectionRef} id="manifesto" className="min-h-screen py-20 md:py-32 px-6 bg-background">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-averia)' }}>
            ✧ I Love
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-normal text-balance">
            <WordReveal text={LOVE_TEXT} progress={loveProgress} />
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-averia)' }}>
            ✧ I Hate
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-normal text-balance">
            <WordReveal text={HATE_TEXT} progress={hateProgress} />
          </p>
        </div>
      </div>
    </section>
  )
}
