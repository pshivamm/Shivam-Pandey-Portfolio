'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { WorkModal } from './WorkModal'

const CATEGORIES = ['All', 'Healthcare', 'Fintech', 'E-Commerce', 'SaaS', 'Education', 'RealEstate']

const WORKS = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A minimalistic e-commerce platform with smooth animations and intuitive navigation.',
    category: 'E-Commerce',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'],
    fullDescription:
      'Designed and developed a modern e-commerce platform focusing on user experience and performance.',
    tags: ['UI Design', 'UX Research', 'Prototyping'],
    year: '2024',
  },
  {
    id: 2,
    title: 'Mobile App Design',
    description: 'A health tracking mobile app with beautiful data visualization and animations.',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'],
    fullDescription:
      'Created a comprehensive mobile application with focus on health tracking and user engagement.',
    tags: ['Mobile Design', 'Animation', 'User Testing'],
    year: '2024',
  },
  {
    id: 3,
    title: 'Dashboard System',
    description: 'Complex dashboard with data visualization and real-time updates.',
    category: 'SaaS',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'],
    fullDescription:
      'Developed an enterprise dashboard system with advanced analytics and real-time data visualization.',
    tags: ['Dashboard Design', 'Data Viz', 'Interaction'],
    year: '2023',
  },
  {
    id: 4,
    title: 'Brand Identity',
    description: 'Complete brand identity system including guidelines and applications.',
    category: 'Fintech',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    images: ['https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'],
    fullDescription:
      'Created a comprehensive brand identity system from concept to implementation across multiple touchpoints.',
    tags: ['Branding', 'Visual Design', 'Guidelines'],
    year: '2023',
  },
]

export function Works() {
  const [selectedWork, setSelectedWork] = useState<(typeof WORKS)[0] | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredWorks = activeCategory === 'All' ? WORKS : WORKS.filter((work) => work.category === activeCategory)

  return (
    <section id="works" className="min-h-screen py-20 px-6 bg-foreground/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8 md:mb-12"
          >
            My Works
          </motion.h2>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-3 flex-wrap"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm rounded-md transition-all clickable ${
                  activeCategory === category
                    ? 'bg-foreground text-background'
                    : 'border border-foreground/50  hover:bg-foreground/10'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredWorks.map((work, index) => {
            const isLarge = index === 0
            const isWide = index === filteredWorks.length - 1 && filteredWorks.length > 1

            return (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`cursor-pointer group ${isLarge ? 'md:col-span-2 md:row-span-2' : ''} ${isWide ? 'md:col-span-2' : ''}`}
                onClick={() => setSelectedWork(work)}
              >
                <div className="flex flex-col h-full">
                  {/* Image */}
                  <div className={`relative overflow-hidden bg-foreground/5 flex-1 ${isLarge ? 'h-96 md:h-96' : 'h-48'}`}>
                    <Image
                      src={work.image}
                      alt={work.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Title and Description - Always Visible */}
                  <div className="py-3 md:py-4">
                    <h3 className={`font-bold mb-1.5 tracking-tight ${isLarge ? 'text-2xl' : 'text-2xl'}`}>
                      {work.title}
                    </h3>
                    <p className={`text-foreground/70 ${isLarge ? 'text-xs' : 'text-xs'}`}>
                      {work.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Work Modal */}
      <WorkModal work={selectedWork} onClose={() => setSelectedWork(null)} />
    </section>
  )
}
