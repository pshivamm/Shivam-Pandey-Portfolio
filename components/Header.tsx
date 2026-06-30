'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

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

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  if (!mounted) return null

  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xs bg-background/80 border-b border-foreground/10">
      <nav className="max-w-7xl mx-auto px-6 md:px-0  py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="tracking-tight">
          <span className="text-3xl" style={{ fontFamily: 'var(--font-caveat)' }}>Shivam Pandey</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex gap-8 absolute left-1/2 transform -translate-x-1/2">
          <a href="#home" className="text-sm font-medium hover:opacity-50 transition-opacity">
            Home
          </a>
          <a href="#works" className="text-sm font-medium hover:opacity-50 transition-opacity">
            Works
          </a>
          <a href="#about" className="text-sm font-medium hover:opacity-50 transition-opacity">
            About
          </a>
          <a href="#contact" className="text-sm font-medium hover:opacity-50 transition-opacity">
            Contact
          </a>
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
