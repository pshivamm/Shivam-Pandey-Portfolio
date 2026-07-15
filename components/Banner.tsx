'use client'

import { motion } from 'framer-motion'

export function Banner() {

  return (
    <section
      id="home"
      className="md:pt-35 pt-24 pb-10 md:pb-10 px-6 overflow-hidden min-h-screen"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between relative z-10">
          <div className="w-full">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[clamp(3rem,15vw,11rem)] font-bold leading-36 mb-4 text-balance" style={{ fontFamily: 'var(--font-averia)' }}
            >
              Shivam Pandey
            </motion.h1>

            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl lg:text-8xl font-medium mb-6 text-balance"
            >
              UI/UX Designer.
            </motion.h4>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-sm md:text-md text-foreground/100 max-w-full md:max-w-md ms-auto leading-relaxed text-balance"
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
          <div className="w-6 h-10 border border-black rounded-full flex justify-center">
            <motion.div className="w-1 h-2 bg-black rounded-full mt-2" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
