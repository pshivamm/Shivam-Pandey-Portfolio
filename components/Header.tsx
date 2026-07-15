'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun, Menu, X } from 'lucide-react'

const NAV_ITEMS = ['home', 'works', 'skills', 'about', 'contact']

export function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  const handleNavClick = (section: string) => {
    setMobileOpen(false)
  }

  if (!mounted) return null

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80">
      <nav className="max-w-7xl mx-auto px-6 py-4 md:py-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="tracking-tight text-xl md:text-2xl font-semibold">
          ❋ Shivam Pandey.
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-1 absolute left-1/2 -translate-x-1/2 backdrop-blur-xs p-1 rounded-full bg-background/20 border border-foreground/20">
          {NAV_ITEMS.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => handleNavClick(section)}
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
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-foreground/10 border border-foreground/20 rounded-full transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 hover:bg-foreground/10 border border-foreground/20 rounded-full transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-6">
          {NAV_ITEMS.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => handleNavClick(section)}
              className={`text-2xl font-medium transition-colors ${
                activeSection === section
                  ? 'text-foreground'
                  : 'text-foreground/50 hover:text-foreground'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
