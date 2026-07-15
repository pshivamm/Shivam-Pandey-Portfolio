'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { GoOrganization } from "react-icons/go";
import { ContactModal } from './ContactModal'

const EXPERIENCE = [
  {
    id: 1,
    title: 'UI/UX Designer',
    company: 'IT Infonity',
    duration: 'Feb 2024 - Oct 2025',
    description: [
      'Developed and maintained responsive websites using HTML, CSS, JavaScript, and modern UI practices to improve user engagement.',
      'Collaborated with cross-functional teams to gather requirements and implement design solutions that met business objectives.',
      'Conducted user research and usability testing to inform design decisions and improve user experience.',
    ],
  },
  {
    id: 2,
    title: 'Web Designer',
    company: 'Netfrux Technologies',
    duration: 'Feb 2023 - Jan 2024',
    description: [
      'Designed and developed responsive websites using HTML, CSS, JavaScript, and CMS platforms like Shopify and Wix.',
      'Built modern UI components using Tailwind CSS and Bootstrap, improving UI consistency and responsiveness.',
      'Optimized website performance and cross-browser compatibility, enhancing user engagement.',
      'Worked closely with clients to translate business requirements into functional and visually appealing designs.',
    ],
  },
  {
    id: 3,
    title: 'Junior Web Designer',
    company: 'System & Tech Solutions',
    duration: 'Jan 2022 - Dec 2022',
    description: [
      'Assisted in designing and developing responsive web pages using HTML, CSS, and JavaScript.',
      'Implemented UI layouts using Bootstrap and improved front-end interactions with basic jQuery.',
      'Supported senior designers in UI enhancements and website updates.',
      'Gained hands-on experience in responsive design and front-end development best practices.',
    ],
  },
]

export function Experience() {
  const [showContact, setShowContact] = useState(false)

  return (
    <section id="experience" className="min-h-screen py-25 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-20"
          style={{ fontFamily: 'var(--font-averia)' }}
        >
          ✦ Professional Experience.
        </motion.h2>

          <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-foreground/20 md:-translate-x-px" />

          {EXPERIENCE.map((exp, index) => {
            const isLeft = index % 2 === 0
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-start mb-10 md:mb-16 last:mb-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                {/* Content */}
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="p-6 border border-foreground/20 rounded-2xl hover:bg-foreground/5 transition-colors flex flex-col md:flex-row items-start justify-between gap-5 group">
                    <GoOrganization className='text-3xl md:text-5xl' />
                    <div className="">
                      <div className="flex flex-col md:flex-row items-start md:items-center mb-2 justify-between gap-2 md:gap-5">
                        <div className="">
                          <h4 className="text-lg md:text-xl font-bold group-hover:text-foreground/80 transition-colors">
                            {exp.title}
                          </h4>
                          <p className="text-sm text-foreground/70 mt-1">{exp.company}</p>
                        </div>
                        <p className="text-xs text-foreground/50 mb-3">{exp.duration}</p>
                      </div>
                      <div className="space-y-2 text-xs text-foreground/60">
                        {exp.description.map((point, pointIndex) => (
                          <p key={`${exp.id}-${pointIndex}`} className="leading-relaxed">
                            • {point}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-5 md:left-1/2 w-3 h-3 md:w-4 md:h-4 -translate-x-1.5 md:-translate-x-2 bg-background border-2 border-foreground/40 rounded-full top-7 z-10" />

                {/* Spacer for the other side */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            )
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <button
            onClick={() => setShowContact(true)}
            className="px-12 py-5 text-xl sm:text-2xl md:text-4xl bg-foreground text-background font-bold rounded-full hover:opacity-80 transition-opacity clickable inline-block"
          >
            Let&apos;s Talk
          </button>
        </motion.div>
      </div>

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </section>
  )
}
