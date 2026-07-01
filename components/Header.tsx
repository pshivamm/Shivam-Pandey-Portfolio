'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    let initialTheme: 'light' | 'dark' = 'light'

    if (savedTheme) {
      initialTheme = savedTheme
    } else if (prefersDark) {
      initialTheme = 'dark'
    }

    setTheme(initialTheme)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const htmlElement = document.documentElement
    if (theme === 'dark') {
      htmlElement.classList.add('dark')
      htmlElement.classList.remove('light')
    } else {
      htmlElement.classList.remove('dark')
      htmlElement.classList.add('light')
    }
    localStorage.setItem('theme', theme)
  }, [theme, mounted])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id], footer[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [mounted])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  if (!mounted) return null

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xs">
      <nav className="max-w-7xl mx-auto px-6 md:px-0  py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="tracking-tight">
          <span className="text-2xl font-semibold mb-1" >Shivam Pandey.</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex gap-1 absolute left-1/2 transform -translate-x-1/2 backdrop-blur-xs p-1 rounded-full bg-background/20 border border-foreground/20">
          {['home', 'works', 'about', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activeSection === section
                  ? 'bg-foreground text-background shadow-sm'
                  : 'hover:bg-foreground/10'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-foreground/10 border border-foreground/20 bg-foreground/20 hover:bg-foreground-50 rounded-full transition-colors clickable"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </nav>
    </header>
  )
}
