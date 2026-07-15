'use client'

import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'

const LOVE_TEXT =
  'transforming ideas into intuitive digital experiences, crafting clean and accessible interfaces, solving real user problems, building side projects, learning emerging technologies, collaborating with passionate people, and paying attention to every pixel.'

const HATE_TEXT =
  'confusing user journeys, cluttered layouts, poor accessibility, inconsistent design systems, unnecessary complexity, and products that put business goals ahead of user needs.'

function WordReveal({ text, progress }: { text: string; progress: number }) {
  const words = text.split(' ')
  const total = words.length

  return (
    <>
      {words.map((word, i) => {
        const threshold = i / total
        const opacity = progress >= threshold
          ? Math.min(1, 0.2 + (progress - threshold) * 8)
          : 0.2
        return (
          <span
            key={`${word}-${i}`}
            className="inline"
            style={{ color: `color-mix(in oklab, var(--foreground) ${opacity * 100}%, transparent)` }}
          >
            {word}{i < total - 1 ? ' ' : ''}
          </span>
        )
      })}
    </>
  )
}

export function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const [progress, setProgress] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const p = Math.max(0, Math.min(1, (v - 0) / 0.6))
    setProgress(p)
  })

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="min-h-screen py-20 md:py-32 px-6 bg-background"
    >
      <div className="max-w-5xl mx-auto space-y-8 md:space-y-16">
        <p className="text-2xl md:text-4xl lg:text-6xl font-medium leading-normal text-balance">
          <span
            className="text-3xl md:text-6xl lg:text-8xl italic font-bold text-foreground"
            style={{ fontFamily: 'var(--font-averia)' }}
          >
            ✧ I Love
          </span>{' '}
          <WordReveal text={LOVE_TEXT} progress={progress} />
          <br />
          <br />
          <span
            className="text-3xl md:text-6xl lg:text-8xl italic font-bold text-foreground"
            style={{ fontFamily: 'var(--font-averia)' }}
          >
            ✧I Hate
          </span>{' '}
          <WordReveal text={HATE_TEXT} progress={progress} />
        </p>
      </div>
    </section>
  )
}
