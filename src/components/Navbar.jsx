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

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = (event) => {
      if (event.matches) {
        setMenuOpen(false)
      }
    }

    closeOnDesktop(desktopQuery)
    desktopQuery.addEventListener('change', closeOnDesktop)

    return () => desktopQuery.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-700 ${
          scrolled
            ? 'py-4 bg-black/40 backdrop-blur-2xl border-b border-white/5'
            : 'py-6 md:py-10 bg-transparent'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          <motion.div
            className="flex items-center gap-4 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b347ff] to-[#00d4ff] animate-pulse-glow" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b347ff] to-[#00d4ff] blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-[2px] rounded-full bg-black z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </div>
            </div>
            <span className="font-display text-2xl tracking-[0.25em] text-white">CIPHER</span>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10 xl:gap-12">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-[10px] tracking-[0.28em] text-white/55 hover:text-white transition-all duration-500 uppercase relative group py-3"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#b347ff] group-hover:w-full transition-all duration-500 shadow-[0_0_10px_#b347ff]" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-5 lg:gap-8">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="hidden lg:flex items-center gap-3 px-7 xl:px-8 py-3 bg-white/95 text-black font-mono text-[10px] tracking-[0.28em] uppercase transition-all duration-500 hover:bg-[#b347ff] hover:text-white hover:shadow-[0_0_30px_rgba(179,71,255,0.35)] group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Book Now</span>
              <div className="w-1.5 h-1.5 rounded-full bg-black group-hover:bg-white transition-colors" />
            </motion.button>

            {/* Hamburger Button */}
            <button
              className="relative z-[9100] flex lg:hidden h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md transition-all duration-500 hover:bg-white/10 hover:border-white/20"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu-overlay"
            >
              <div className="relative w-6 h-5">
                <span className={`absolute left-0 top-0 h-px w-full bg-white transition-all duration-500 ease-expo ${menuOpen ? 'rotate-45 translate-y-[9px]' : ''}`} />
                <span className={`absolute left-0 top-1/2 -translate-y-1/2 h-px w-full bg-white transition-all duration-500 ease-expo ${menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 bottom-0 h-px w-full bg-white transition-all duration-500 ease-expo ${menuOpen ? '-rotate-45 -translate-y-[10px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            id="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[8998] flex items-center justify-center lg:hidden"
          >
            {/* Backdrop with Heavy Blur */}
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
              onClick={() => setMenuOpen(false)}
            />
            
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#b347ff]/10 blur-[150px] rounded-full animate-pulse-slow" />
              <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-[#00d4ff]/10 blur-[150px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
            </div>

            <nav className="relative z-10 w-full max-w-4xl px-8 text-center">
              <div className="flex flex-col gap-6 sm:gap-10">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ y: 60, opacity: 0, rotateX: -20 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -60, opacity: 0, rotateX: 20 }}
                    transition={{ 
                      delay: 0.1 + i * 0.1, 
                      duration: 0.8, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group relative inline-block"
                    >
                      <span className="font-display text-5xl sm:text-8xl tracking-tight text-white/20 transition-all duration-700 group-hover:text-white group-hover:tracking-widest">
                        {link.label}
                      </span>
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-5xl sm:text-8xl tracking-tight text-white opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:tracking-widest blur-2xl group-hover:blur-0">
                        {link.label}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Footer Info in Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mt-20 flex flex-col items-center gap-6"
              >
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <p className="font-mono text-[10px] tracking-[0.4em] text-white/30 uppercase">CIPHER DANCE STUDIO</p>
                <div className="flex gap-8">
                  {['Instagram', 'Youtube', 'Facebook'].map((social) => (
                    <a key={social} href="#" className="font-mono text-[9px] tracking-widest text-white/50 hover:text-white transition-colors uppercase">
                      {social}
                    </a>
                  ))}
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
