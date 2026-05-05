import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Classes', href: '#classes' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-black/70 backdrop-blur-xl border-b border-white/10'
            : 'py-4 md:py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b347ff] to-[#00d4ff] animate-pulse-glow" />
              <div className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#b347ff] to-[#00d4ff] blur-md opacity-60" />
            </div>
            <a href="#home" className="font-display text-xl md:text-2xl tracking-[0.18em] text-white">CIPHER</a>
          </motion.div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.6 }}
                className="font-body text-sm tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-300 uppercase relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#b347ff] to-[#00d4ff] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="hidden md:block px-5 py-2 border border-[#b347ff]/50 text-[#b347ff] text-sm font-body tracking-[0.15em] uppercase hover:bg-[#b347ff]/10 transition-all duration-300 animate-border-pulse"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Book Now
          </motion.button>

          <button
            className="md:hidden relative z-[9100] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span className={`absolute h-px w-5 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute h-px w-5 bg-white transition-opacity duration-200 ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute h-px w-5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-[8998] md:hidden">
            <motion.button
              aria-label="Close menu overlay"
              className="absolute inset-0 h-full w-full bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              initial={{ x: '100%', opacity: 0.98 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 flex h-full w-[82vw] max-w-sm flex-col justify-center gap-7 border-l border-white/10 bg-[#05050d]/95 px-8 shadow-[0_0_80px_rgba(179,71,255,0.25)]"
            >
              <button
                className="absolute right-5 top-5 h-11 w-11 rounded-full border border-white/10 text-2xl leading-none text-white/80"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                x
              </button>
              <div className="mb-6">
                <div className="mb-3 h-px w-16 bg-gradient-to-r from-[#b347ff] to-[#00d4ff]" />
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">Menu</p>
              </div>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.35 }}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl tracking-[0.12em] text-white/85 transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.35 }}
                onClick={() => setMenuOpen(false)}
                className="mt-4 inline-flex min-h-12 items-center justify-center border border-[#00d4ff]/50 px-5 font-mono text-xs uppercase tracking-[0.2em] text-[#00d4ff] shadow-[0_0_28px_rgba(0,212,255,0.12)]"
              >
                Book Trial
              </motion.a>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
