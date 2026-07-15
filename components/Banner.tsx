'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const ROLES = ['Web', 'Product', 'Graphic', 'Frontend']

export function Banner() {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="md:min-h-screen flex flex-col relative overflow-hidden px-6 pt-24 md:pt-35 pb-10 md:pb-10"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        <div className="w-full pt-10 md:pt-0 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[clamp(3rem,15vw,11rem)] font-bold leading-16 md:leading-30 lg:leading-36 mb-4 text-balance" style={{ fontFamily: 'var(--font-averia)' }}
          >
            Shivam Pandey
          </motion.h1>

          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-5xl lg:text-8xl font-medium mb-6 text-balance"
          >
            ↪ &nbsp;
            <span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROLES[roleIndex]}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>{' '}
            Designer.
          </motion.h4>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm md:text-md text-foreground/100  max-w-full md:max-w-md ms-auto leading-relaxed text-balance pb-16 md:pb-0"
        >
          I am a visual designer with a product mindset, passionate about crafting beautiful, minimalistic, and user-centric digital experiences. I love working at the intersection of design, research, strategy, and technology—from shaping the product vision to seeing it brought to life. I create interfaces that seamlessly combine aesthetics with functionality.
        </motion.p>
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-black">Scroll to explore</p>
          <div className="w-6 h-10 border border-black rounded-full flex justify-center bg-background">
            <motion.div className="w-1 h-2 bg-foreground rounded-full mt-2" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
