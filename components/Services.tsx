'use client'

import { motion } from 'framer-motion'

const SERVICES = [
  {
    id: '001',
    title: 'Product Design',
    description:
      'I turn ideas into clear, memorable experiences. My work blends creativity and strategy to build interfaces that feel polished, intuitive, and trustworthy — whether for a new startup or a growing team.',
    tags: [
      'UI/UX Design',
      'Mobile App Design',
      'Website Design',
      'SaaS Design',
      'Landing Page Design',
      'Web App Design',
    ],
  },
  {
    id: '002',
    title: 'Development Solutions',
    description:
      'I bring digital products to life with smooth, responsive interfaces and solid front-end architecture. Specializing in modern frameworks and CMS integration with animations that add personality.',
    tags: [
      'Front-end Development',
      'Next.js',
      'React',
      'Tailwind CSS',
      'CMS Integration',
      'Animations',
    ],
  },
  {
    id: '003',
    title: 'Branding Identity',
    description:
      'I treat brand and UX as one connected system. Building digital identities that stay consistent across every touchpoint, backed by clear strategy and practical guidelines.',
    tags: [
      'Branding',
      'Brand Identity',
      'Brand Design',
      'Rebranding',
      'Brand Strategy',
      'Visual Identity',
    ],
  },
]

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 px-6 bg-foreground/5">
      <div className="max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm font-medium text-foreground/40 tracking-widest uppercase mb-4"
        >
          Services
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-averia)' }}
        >
          My digital solutions.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-lg text-foreground/50 max-w-2xl mb-16 md:mb-24"
        >
          Empowering ideas with thoughtful design and clean development that drive real results.
        </motion.p>

        <div className="space-y-12 md:space-y-20">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="group"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 items-start border-t border-foreground/10 pt-8 md:pt-12">
                <span className="text-sm font-mono text-foreground/30 md:col-span-1">
                  {service.id}
                </span>

                <div className="md:col-span-2">
                  <h3
                    className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
                    style={{ fontFamily: 'var(--font-averia)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-xs md:text-sm border border-foreground/20 rounded-full text-foreground/60 hover:bg-foreground/5 hover:text-foreground/80 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
