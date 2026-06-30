'use client'

import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram, FaBehance } from 'react-icons/fa'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="pt-20 mt-0 md:mt-20 pb-10 px-6 bg-foreground/5">
      <div className="max-w-7xl mx-auto">
        {/* Main Section */}
        <div className="flex flex-col md:flex-row items-bottom justify-between gap-6 md:gap-8 mb-10">
          {/* Left - CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight whitespace-nowrap">
              Do you like <br /> what you see?
            </h2>
          </motion.div>

          {/* Right - Social Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 md:gap-6"
          >
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-background hover:bg-foreground/5 border border-foreground/20 rounded-xl transition-colors clickable group"
              aria-label="LinkedIn"
            >
              <FaLinkedin
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-background hover:bg-foreground/5 border border-foreground/20 rounded-xl transition-colors clickable group"
              aria-label="LinkedIn"
            >
              <FaInstagram
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-background hover:bg-foreground/5 border border-foreground/20 rounded-xl transition-colors clickable group"
              aria-label="LinkedIn"
            >
              <FaBehance
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-background hover:bg-foreground/5 border border-foreground/20 rounded-xl transition-colors clickable group"
              aria-label="GitHub"
            >
              <FaGithub
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            </a>
            <a
              href="mailto:shivam@example.com"
              className="p-2.5 bg-background hover:bg-foreground/5 border border-foreground/20 rounded-xl transition-colors clickable group"
              aria-label="Email"
            >
              <FaEnvelope
                size={20}
                className="group-hover:scale-110 transition-transform"
              />
            </a>
          </motion.div>

          {/* Right - Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-start md:justify-end"
          >
            <div className="text-left md:text-right">
              <p className="text-sm text-foreground/60 mb-2">Address</p>
              <p className="text-lg font-medium text-balance">
                123 Design Street <br />
                Creative City, India 123456
              </p>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="md:flex justify-between items-center text-xs text-foreground/60"
        >
          <p className='mb-2 md:mb-0'> &copy; All rights reserved. {currentYear}</p>
          <p>Designed & Built by Shivam Pandey.</p>
        </motion.div>
      </div>
    </footer>
  )
}
