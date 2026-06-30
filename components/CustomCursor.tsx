'use client'

import { useCallback, useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const circlePos = useRef({ x: 0, y: 0 })
  const cursorTypeRef = useRef<'default' | 'button' | 'text' | 'link'>('default')
  const rafRef = useRef<number>(0)

  const updateCursorType = useCallback((target: Element | null) => {
    if (!target) return 'default' as const
    const tag = target.tagName
    if (tag === 'BUTTON' || target.getAttribute('role') === 'button' || target.classList.contains('clickable')) {
      return tag === 'INPUT' || tag === 'TEXTAREA' ? 'text' as const : 'button' as const
    }
    if (tag === 'A' || target.classList.contains('link-hover')) return 'link' as const
    if (tag === 'INPUT' || tag === 'TEXTAREA') return 'text' as const
    return 'default' as const
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX - 4}px`
        dotRef.current.style.top = `${e.clientY - 4}px`
      }

      // Trail particles in banner
      if (trailRef.current) {
        const isBanner = document.elementFromPoint(e.clientX, e.clientY)?.closest('#home')
        if (isBanner) {
          const particle = document.createElement('div')
          particle.className = 'cursor-trail-particle'
          particle.style.left = `${e.clientX}px`
          particle.style.top = `${e.clientY}px`
          trailRef.current.appendChild(particle)
          setTimeout(() => particle.remove(), 800)
        }
      }

      // Update cursor type
      const target = document.elementFromPoint(e.clientX, e.clientY)
      const newType = updateCursorType(target)
      if (newType !== cursorTypeRef.current) {
        cursorTypeRef.current = newType
      }
    }

    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (circleRef.current) circleRef.current.style.opacity = '0'
    }

    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1'
      if (circleRef.current) circleRef.current.style.opacity = '1'
    }

    // Smooth animation loop for the circle
    const animate = () => {
      const circle = circleRef.current
      if (circle) {
        const mx = mouseRef.current.x
        const my = mouseRef.current.y
        const cp = circlePos.current

        const type = cursorTypeRef.current
        const targetSize = type === 'button' ? 60 : 40
        const halfSize = targetSize / 2
        const speed = type === 'button' ? 0.15 : 0.12

        cp.x += (mx - cp.x) * speed
        cp.y += (my - cp.y) * speed

        circle.style.left = `${cp.x - halfSize}px`
        circle.style.top = `${cp.y - halfSize}px`
        circle.style.width = `${targetSize}px`
        circle.style.height = `${targetSize}px`
        circle.style.opacity = '1'
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [updateCursorType])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={circleRef} className="cursor-circle" />
      <div ref={trailRef} className="cursor-trail-container" />
    </>
  )
}
