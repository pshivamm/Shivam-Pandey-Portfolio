'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

const SKILLS = [
  {
    title: 'Digital Product Design',
    content:
      'End-to-end product design from concept to launch. I craft intuitive digital products that balance user needs with business goals, iterating through wireframes, prototypes, and high-fidelity designs.',
  },
  {
    title: 'Visual Design',
    content:
      'Pixel-perfect interfaces with a keen eye for typography, color, spacing, and composition. I create visual languages that are both beautiful and functional, ensuring every element serves a purpose.',
  },
  {
    title: 'Design Systems',
    content:
      'Scalable, consistent design systems that empower teams to ship faster. I build component libraries with comprehensive documentation, token-based theming, and reusable patterns.',
  },
  {
    title: 'Strategic Thinking',
    content:
      'Connecting design decisions to business outcomes. I align product strategy with user research, market analysis, and stakeholder goals to create solutions that drive measurable impact.',
  },
  {
    title: 'Research & Discovery',
    content:
      'User-centered research methods including interviews, surveys, usability testing, and analytics review. I turn qualitative and quantitative data into actionable design insights.',
  },
  {
    title: 'Client Leadership',
    content:
      'Managing client relationships, presenting design rationale, and navigating feedback loops. I bridge the gap between stakeholder expectations and design best practices.',
  },
  {
    title: 'AI-Assisted Design Practice',
    content:
      'Leveraging AI tools to accelerate the design workflow — from ideation and prototyping to asset generation and user research. I integrate AI thoughtfully without compromising design quality.',
  },
]

export function Skills() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="skills"
      className="min-h-screen py-20 md:py-32 px-6 bg-background"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20">
        {/* Title column */}
        <div className="md:w-[35%] md:sticky md:top-32 md:self-start">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-balance"
            style={{ fontFamily: 'var(--font-averia)' }}
          >
            ✦ What I am good at.
          </motion.h2>
        </div>

        {/* Accordion column */}
        <div className="md:w-[65%] space-y-4 border-t border-foreground/10 pt-3">
          {SKILLS.map((skill, index) => {
            const isOpen = openIndex === index

            return (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-foreground/10 pt-5 pb-8"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-xl md:text-2xl lg:text-4xl font-medium tracking-tight">
                    {skill.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl md:text-3xl font-light text-foreground/40 group-hover:text-foreground/70 transition-colors"
                  >
                    +
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="text-sm md:text-base text-foreground/60 leading-relaxed pt-3 pb-2 max-w-2xl">
                    {skill.content}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
