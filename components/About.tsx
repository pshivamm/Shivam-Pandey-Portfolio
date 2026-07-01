'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { GoOrganization } from "react-icons/go";
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

export function About() {
  const [showContact, setShowContact] = useState(false)

  return (
    <section id="about" className="min-h-screen py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8 md:mb-16 text-balance"
        >
          <span className='text-3xl md:text-5xl text-foreground/50'>Hello there I&apos;m</span> <br /> Shivam Pandey.
        </motion.h2>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 md:mb-40">
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
                  <a
                    key={skill}
                    className="px-4 py-2 bg-foreground/10 rounded-full text-xs font-sm text-balance"
                  >
                    {skill}
                  </a>
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
            className="bg-foreground/10 h-96 md:h-full"
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

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 md:mb-30"
        >
          <h3 className="text-5xl md:text-7xl text-center font-bold tracking-tight mb-20">
            Professional Experience.
          </h3>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-foreground/20 md:-translate-x-px" />

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
                  <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="p-6 border border-foreground/20 rounded-2xl hover:bg-foreground/5 transition-colors flex items-start justify-between gap-5 group">
                    <GoOrganization className='text-5xl' />
                      <div className="">
                        <div className="flex items-center mb-2 justify-between gap-5">
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
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 -translate-x-2 md:-translate-x-2 bg-background border-2 border-foreground/40 rounded-full top-7 z-10" />

                  {/* Spacer for the other side */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <button
            onClick={() => setShowContact(true)}
            className="px-12 py-5 md:mb-5 text-2xl sm:text-4xl md:text-6xl bg-foreground text-background font-bold rounded-full hover:opacity-80 transition-opacity clickable inline-block"
          >
            Let&apos;s Talk
          </button>
        </motion.div>
      </div>

      <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />
    </section>
  )
}
