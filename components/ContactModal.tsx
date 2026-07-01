'use client'

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { FaEnvelope, FaLinkedin, FaGithub, FaPhoneAlt, FaInstagram, FaBehance } from 'react-icons/fa'
import { FaB, FaI } from "react-icons/fa6";

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

const SOCIAL_LINKS = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'shivampandey.self@gmail.com',
    href: 'mailto:shivampandey.self@gmail.com',
  },
  {
    icon: FaPhoneAlt,
    label: 'Phone',
    value: '+91 6307989801',
    href: 'tel:+916307989801',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: '@shivampandey',
    href: 'https://www.linkedin.com/in/shivam-pandey-19b927249/',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: '@pshivamm',
    href: 'https://github.com/pshivamm',
  }
]

export function ContactModal({ isOpen, onClose }: ContactModalProps) {

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl bg-background border rounded-[34px] border-foreground/10 rounded-5xl z-50 p-8 mb-10 md:p-12"
            data-lenis-prevent
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-foreground/10 hover:bg-foreground/20 rounded-full transition-colors clickable"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
            

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-left mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                Let&apos;s Connect
              </h2>
              <p className="text-sm md:text-md text-foreground/70">
                Get in touch through any of these channels. I&apos;d love to hear from you!
              </p>
            </motion.div>

            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SOCIAL_LINKS.map((link, index) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-4 border border-foreground/20 rounded-2xl hover:bg-foreground/5 transition-colors group clickable"
                  >
                    <div className="flex items-center gap-4">
                      <Icon
                        size={24}
                        className="text-foreground group-hover:scale-110 transition-transform"
                      />
                      <div className="text-left">
                        <p className="text-sm text-foreground/60 font-medium">{link.label}</p>
                        <p className="font-semibold group-hover:text-foreground/80 transition-colors">
                          {link.value}
                        </p>
                      </div>
                    </div>
                  </motion.a>
                )
              })}
            </div>

            {/* Large Social Icons */}
            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center gap-8 pt-8 border-t border-foreground/20"
            >
              {SOCIAL_LINKS.slice(2).map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-background hover:bg-foreground/5 border border-foreground/20 rounded-xl transition-colors clickable"
                    aria-label={link.label}
                  >
                    <Icon size={24} />
                  </a>
                )
              })}
            </motion.div> */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
