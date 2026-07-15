'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { ContactModal } from './ContactModal'

const SKILLS = ['Figma', 'Photoshop', 'Adobe XD', 'Adobe Illustrator', 'Canva', 'Wireframing', 'Prototyping', 'HTML', 'CSS', 'Bootstrap', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Responsive Design']

const EDUCATION = [
  {
    id: 1,
    degree: 'Bachelor of Arts',
    school: 'Deen Dayal Upadhyaya Gorakhpur University',
    year: '2022',
  }
]

export function About() {
  const [showContact, setShowContact] = useState(false)

  return (
    <section id="about" className="min-h-screen py-25 px-6 bg-foreground/5">
      <div className="max-w-7xl mx-auto">
        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8 md:mb-16 text-balance"
        >
          <span className='text-3xl md:text-5xl text-foreground/50'>Hello there. I&apos;m</span> <br /> <span style={{ fontFamily: 'var(--font-averia)' }}>✦ Shivam Pandey</span>.
        </motion.h2>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Content */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm md:text-md text-foreground/80 leading-relaxed mb-8 text-balance"
            >
              I&apos;m a passionate UI/UX designer with a love for creating beautiful, minimalistic
              interfaces. My journey in design started with a curiosity about how things work and
              evolved into a career focused on solving complex problems through elegant design
              solutions.
            </motion.p>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground/70">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2 mb-12">
                {SKILLS.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-foreground/10 rounded-full text-xs font-sm text-balance"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4 text-foreground/70">
                Education
              </h3>
              <div className="space-y-6">
                {EDUCATION.map((edu) => (
                  <div key={edu.id} className="border-l-3 border-foreground/20 pl-4 py-1">
                    <p className="text-lg mb-1 font-semibold text-balance">{edu.degree}</p>
                    <p className="text-sm text-foreground/60">{edu.school}</p>
                    <p className="text-xs text-foreground/50">{edu.year}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-foreground/10 rounded-xl overflow-hidden h-96 md:h-full"
          >
            <Image
              src="/shivam_img.png"
              alt="Shivam Pandey"
              width={500}
              height={600}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </section>
  )
}
