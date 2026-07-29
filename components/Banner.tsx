'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useMemo, useState, type CSSProperties } from 'react'

const ROLES = ['Web', 'Product', 'Graphic', 'Frontend']

// ---- Cursor Image Trail config ----
const TRAIL_IMAGES = [
  "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/8e0d22a8-ac82-4893-90d8-3403f80ec600/w=800",
    "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/d6af07a0-4dc5-4de4-07b1-9d2ad6100000/w=800",
    "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/c083d83a-f5a4-4434-989f-4eaa9bbe7500/w=800",
    "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/93bad0e0-e2ab-4e21-de9c-4cb54b028f00/w=800",
    "https://imagedelivery.net/IEUjvl3YUlxY-MrTpOAWDQ/09a59a65-3c07-4500-f72c-68c824168c00/w=800",
]

const TRAIL_CONFIG = {
  imageWidth: 150,
  imageHeight: 200,
  radius: 8,
  fit: 'cover' as 'cover' | 'contain',
  position: 'center' as 'top' | 'center' | 'bottom',
  frequency: 35, // 1-50, higher = images spawn more often
  visibleFor: 1, // seconds an image stays fully visible before fading
}

const TRANSITION = { type: 'spring' as const, stiffness: 300, damping: 30 }

interface TrailImage {
  id: number
  slot: number
  x: number
  y: number
  state: 'entering' | 'exiting'
}

function useCursorTrail() {
  const threshold = 200 - ((TRAIL_CONFIG.frequency - 1) * 199) / 49

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeImages, setActiveImages] = useState<TrailImage[]>([])

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setMousePos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
    setIsHovering(true)
  }
  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => setIsHovering(false)

  useEffect(() => {
    if (!isHovering) return
    const lastImage = activeImages[activeImages.length - 1]
    const distance = lastImage
      ? Math.hypot(mousePos.x - lastImage.x, mousePos.y - lastImage.y)
      : Infinity
    if (distance <= threshold) return

    const newImage: TrailImage = {
      id: Math.random(),
      slot: currentImageIndex,
      x: mousePos.x,
      y: mousePos.y,
      state: 'entering',
    }
    setActiveImages((prev) => [...prev, newImage])
    setCurrentImageIndex((prev) => (prev + 1) % TRAIL_IMAGES.length)

    setTimeout(() => {
      setActiveImages((prev) =>
        prev.map((img) => (img.id === newImage.id ? { ...img, state: 'exiting' } : img))
      )
    }, TRAIL_CONFIG.visibleFor * 1000)

    setTimeout(() => {
      setActiveImages((prev) => prev.filter((img) => img.id !== newImage.id))
    }, TRAIL_CONFIG.visibleFor * 1000 + 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mousePos, isHovering, currentImageIndex])

  return { activeImages, handleMouseMove, handleMouseEnter, handleMouseLeave }
}

export function Banner() {
  const [roleIndex, setRoleIndex] = useState(0)
  const { activeImages, handleMouseMove, handleMouseEnter, handleMouseLeave } = useCursorTrail()

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="md:min-h-screen flex flex-col relative overflow-hidden px-6 pt-24 md:pt-35 pb-10 md:pb-10"
    >
      {/* Cursor image trail layer */}
      {activeImages.map(({ id, slot, x, y, state }) => (
        <motion.div
          key={id}
          initial={{
            opacity: 0,
            scale: 0.5,
            filter: 'blur(10px)',
            x: x - TRAIL_CONFIG.imageWidth / 2,
            y: y - TRAIL_CONFIG.imageHeight / 2,
          }}
          animate={{
            opacity: state === 'entering' ? 1 : 0,
            scale: state === 'entering' ? 1 : 0.5,
            filter: state === 'entering' ? 'blur(0px)' : 'blur(10px)',
            x: x - TRAIL_CONFIG.imageWidth / 2,
            y: y - TRAIL_CONFIG.imageHeight / 2,
          }}
          transition={TRANSITION}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${TRAIL_CONFIG.imageWidth}px`,
            height: `${TRAIL_CONFIG.imageHeight}px`,
            backgroundImage: `url(${TRAIL_IMAGES[slot]})`,
            backgroundSize: TRAIL_CONFIG.fit,
            backgroundPosition:
              TRAIL_CONFIG.fit === 'cover' ? `center ${TRAIL_CONFIG.position}` : 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: `${TRAIL_CONFIG.radius}px`,
            pointerEvents: 'none',
            zIndex: 5,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        <div className="w-full pt-10 md:pt-0 text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[clamp(3rem,15vw,11rem)] font-bold leading-16 md:leading-30 lg:leading-36 mb-4 text-balance"
            style={{ fontFamily: 'var(--font-averia)' }}
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
          className="text-sm md:text-md text-foreground/100 max-w-full md:max-w-md ms-auto leading-relaxed text-balance pb-16 md:pb-0"
        >
          I am a visual designer with a product mindset, passionate about crafting beautiful, minimalistic, and user-centric digital experiences. I love working at the intersection of design, research, strategy, and technology—from shaping the product vision to seeing it brought to life. I create interfaces that seamlessly combine aesthetics with functionality.
        </motion.p>
      </div>

    </section>
  )
}