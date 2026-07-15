'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

const SLIDER_IMAGES = [
  '/slider/Blockchain cover.png',
  '/slider/Beauty Banner.png',
  '/slider/pixora cover.png',
  '/slider/pet cover.png',
  '/slider/swimsuit banner.png',
  '/slider/Christmas post thumbnail.png',
  '/slider/travel cover.png',
  '/slider/Shipping cover.png',
  '/slider/Estara Banner Cover.png',
  '/slider/eco clean liquids cover.png',
]

export function Banner() {
  const [mounted, setMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const delay = window.innerWidth < 768 ? 5000 : 3000
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length)
    }, delay)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const slider = (
    <div className="relative overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <Image
            src={SLIDER_IMAGES[currentSlide]}
            alt=""
            width={180}
            height={65}
            className="w-full h-full object-contain rounded-lg"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )

  return (
    <section
      id="home"
      className="md:min-h-screen relative flex flex-col items-center justify-center pt-40 md:pt-10 pb-30 md:pb-0 px-6 relative overflow-hidden"
    >
      <div className="w-full text-center relative z-10">
        {/* Mobile: split name */}
        <div className="md:hidden">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-bold tracking-tight mb-3 text-balance"
          >
            Shivam
          </motion.h1>

          <div className="w-[180px] h-[50px] flex justify-center items-center mx-auto mb-3 overflow-hidden rounded-full">
            {slider}
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-bold tracking-tight mb-4 text-balance"
          >
            Pandey
          </motion.h1>
        </div>

        {/* Desktop: full name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden md:block text-8xl font-bold tracking-tight mb-4 text-balance"
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
          className="text-sm md:text-md text-foreground/100 max-w-full md:max-w-4xl mx-auto leading-relaxed text-balance mt-5 md:mt-30"
        >
          Crafting beautiful, minimalistic interfaces with smooth animations and attention to detail.
          Specialized in creating user-centric designs that combine aesthetics with functionality.
        </motion.p>

      </div>

      {/* Desktop: slider below content */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="hidden md:block w-[250px] h-[200px] absolute top-auto bottom-6 right-5 overflow-hidden mx-auto"
        >
          {slider}
        </motion.div> */}

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
