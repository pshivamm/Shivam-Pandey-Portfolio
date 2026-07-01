'use client'

import { motion } from 'framer-motion'

export function Banner() {
  return (
    <section
      id="home"
      className="md:min-h-screen flex flex-col items-center justify-center pt-40 md:pt-10 pb-30 md:pb-0 px-6 relative overflow-hidden"
    >
      {/* Main Content */}
      <div className="w-full text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold tracking-tight mb-4 text-balance"
        >
          Shivam Pandey
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-medium mb-6 text-balance"
        >
          UI/UX Designer
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-sm md:text-md text-foreground/90 max-w-full md:max-w-4xl mx-auto leading-relaxed text-balance mt-10 md:mt-40"
        >
          Crafting beautiful, minimalistic interfaces with smooth animations and attention to detail.
          Specialized in creating user-centric designs that combine aesthetics with functionality.
        </motion.p>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#works"
            className="px-5 py-3 leading-tight flex items-center bg-foreground text-background text-sm rounded-full hover:opacity-80 transition-opacity clickable"
          >
            View My Works
          </a>
          <a
            href="#contact"
            className="px-5 py-3 leading-tight flex items-center border border-foreground text-sm rounded-full hover:bg-foreground/10 transition-colors clickable"
          >
            Get In Touch
          </a>
        </motion.div> */}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-foreground/60">Scroll to explore</p>
          <div className="w-6 h-10 border border-foreground rounded-full flex justify-center">
            <motion.div className="w-1 h-2 bg-foreground rounded-full mt-2" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
