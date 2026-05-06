import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Classes', href: '#classes' },
  { label: 'Contact', href: '#contact' },
]

const easeOutExpo = [0.16, 1, 0.3, 1]

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.65, ease: easeOutExpo },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.5, ease: easeOutExpo },
  },
}

const menuListVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.09,
    },
  },
}

const menuItemVariants = {
  hidden: { y: 42, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.78, ease: easeOutExpo },
  },
  exit: {
    y: -28,
    opacity: 0,
    transition: { duration: 0.38, ease: easeOutExpo },
  },
}

const ambientDots = [
  ['12%', '22%', '0s'],
  ['22%', '76%', '1.1s'],
  ['36%', '18%', '2.2s'],
  ['51%', '84%', '0.6s'],
  ['64%', '28%', '1.8s'],
  ['78%', '68%', '2.8s'],
  ['88%', '34%', '1.4s'],
  ['44%', '52%', '3.2s'],
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
        transition={{ duration: 1.1, ease: easeOutExpo }}
        className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-700 ease-expo ${
          scrolled
            ? 'py-3 bg-black/45 backdrop-blur-2xl border-b border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.28)]'
            : 'py-5 sm:py-7 lg:py-9 bg-transparent'
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 overflow-hidden">
          <div className="absolute left-[12%] top-[-70px] h-32 w-72 rounded-full bg-[#b347ff]/10 blur-3xl" />
          <div className="absolute right-[18%] top-[-80px] h-36 w-80 rounded-full bg-[#00d4ff]/10 blur-3xl" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-70" />
        </div>

        <div className="relative mx-auto grid max-w-[1800px] grid-cols-[1fr_auto] items-center gap-6 px-5 sm:px-8 lg:grid-cols-[1fr_auto_1fr] lg:px-12 xl:px-16">
          <motion.div
            className="group flex cursor-pointer items-center gap-3.5 lg:gap-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="relative h-10 w-10 lg:h-11 lg:w-11">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b347ff] via-[#ff2d9b] to-[#00d4ff] opacity-90 shadow-[0_0_28px_rgba(179,71,255,0.28)] transition-all duration-700 group-hover:shadow-[0_0_42px_rgba(0,212,255,0.35)]" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b347ff] to-[#00d4ff] opacity-40 blur-xl transition-opacity duration-700 group-hover:opacity-80" />
              <div className="absolute inset-[2px] z-10 flex items-center justify-center rounded-full bg-black/90 ring-1 ring-white/10">
                <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.85)]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl leading-none tracking-[0.24em] text-white lg:text-[1.7rem]">CIPHER</span>
              <span className="hidden font-mono text-[8px] uppercase tracking-[0.32em] text-white/35 lg:block">Dance Studio</span>
            </div>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl lg:flex">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.08, duration: 0.75, ease: easeOutExpo }}
                className="group relative overflow-hidden rounded-full px-5 py-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/55 transition-all duration-500 ease-expo hover:text-white"
              >
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent transition-transform duration-700 ease-expo group-hover:translate-x-[120%]" />
                <span className="absolute inset-x-5 bottom-2 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#b347ff] to-transparent opacity-0 shadow-[0_0_14px_rgba(179,71,255,0.8)] transition-all duration-500 ease-expo group-hover:scale-x-100 group-hover:opacity-100" />
                <span className="relative z-10 drop-shadow-[0_0_0_rgba(255,255,255,0)] transition-[filter] duration-500 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.38)]">{link.label}</span>
              </motion.a>
            ))}
          </div>

          <div className="flex items-center justify-end gap-5 lg:gap-8">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.72, duration: 0.7, ease: easeOutExpo }}
              className="group relative hidden items-center gap-3 overflow-hidden rounded-full border border-white/15 bg-white/95 px-7 py-3.5 font-mono text-[10px] uppercase tracking-[0.28em] text-black shadow-[0_10px_36px_rgba(255,255,255,0.08)] transition-colors duration-500 ease-expo hover:border-[#b347ff]/40 hover:bg-[#b347ff] hover:text-white hover:shadow-[0_0_38px_rgba(179,71,255,0.32)] lg:flex xl:px-8"
              whileHover={{ scale: 1.035, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-expo group-hover:translate-x-[120%]" />
              <span className="relative z-10">Book Now</span>
              <div className="relative z-10 h-1.5 w-1.5 rounded-full bg-black transition-colors duration-500 group-hover:bg-white group-hover:shadow-[0_0_14px_rgba(255,255,255,0.85)]" />
            </motion.button>

            {/* Hamburger Button */}
            <button
              className="relative z-[9100] flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_38px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-all duration-500 ease-expo hover:border-white/25 hover:bg-white/10 lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu-overlay"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-60" />
              <div className="relative h-5 w-6">
                <span className={`absolute left-0 top-0 h-px w-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.35)] transition-all duration-500 ease-expo will-change-transform ${menuOpen ? 'translate-y-[9px] rotate-45' : ''}`} />
                <span className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white transition-all duration-500 ease-expo will-change-transform ${menuOpen ? 'scale-x-0 opacity-0' : 'opacity-100'}`} />
                <span className={`absolute bottom-0 left-0 h-px w-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.35)] transition-all duration-500 ease-expo will-change-transform ${menuOpen ? '-translate-y-[10px] -rotate-45' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            id="mobile-menu-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 isolate z-[8998] flex min-h-svh items-center justify-center overflow-hidden bg-[#020205]/88 backdrop-blur-2xl will-change-[opacity] lg:hidden"
          >
            {/* Backdrop with Heavy Blur */}
            <motion.div
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.75, ease: easeOutExpo }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_18%_20%,rgba(179,71,255,0.24),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(0,212,255,0.18),transparent_36%),linear-gradient(180deg,rgba(2,2,5,0.78),rgba(2,2,5,0.96))]"
              onClick={() => setMenuOpen(false)}
            />
            
            {/* Background Accents */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute left-1/2 top-0 h-px w-[80vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#b347ff]/14 blur-[90px] will-change-transform animate-pulse-slow" />
              <div className="absolute -right-20 bottom-16 h-80 w-80 rounded-full bg-[#00d4ff]/12 blur-[100px] will-change-transform animate-pulse-slow" style={{ animationDelay: '2s' }} />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(0,0,0,0.48)_100%)]" />
              {ambientDots.map(([left, top, delay]) => (
                <span
                  key={`${left}-${top}`}
                  className="absolute h-1 w-1 rounded-full bg-white/35 shadow-[0_0_18px_rgba(255,255,255,0.45)] animate-pulse-slow"
                  style={{ left, top, animationDelay: delay }}
                />
              ))}
            </div>

            <nav className="relative z-10 flex min-h-svh w-full max-w-5xl flex-col justify-center px-6 pb-7 pt-20 text-center sm:px-10 sm:pb-9 sm:pt-24">
              <motion.div
                variants={menuListVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-col gap-1 sm:gap-2.5 md:gap-3"
              >
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    variants={menuItemVariants}
                    custom={i}
                    className="will-change-transform"
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group relative inline-flex min-h-[46px] items-center justify-center px-2 py-1 sm:min-h-[58px] md:min-h-[64px]"
                    >
                      <span className="absolute -inset-x-4 top-1/2 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-all duration-700 ease-expo group-hover:scale-x-100 group-hover:opacity-100" />
                      <span className="font-display text-[clamp(2.9rem,9svh,5.2rem)] leading-[0.82] tracking-[0.02em] text-white/22 transition-all duration-700 ease-expo group-hover:text-white group-hover:drop-shadow-[0_0_26px_rgba(255,255,255,0.22)] sm:tracking-[0.04em]">
                        {link.label}
                      </span>
                      <span className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(2.9rem,9svh,5.2rem)] leading-[0.82] tracking-[0.02em] text-[#b347ff]/25 opacity-0 blur-2xl transition-all duration-700 ease-expo group-hover:opacity-100 sm:tracking-[0.04em]">
                        {link.label}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </motion.div>

              {/* Footer Info in Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.52, duration: 0.7, ease: easeOutExpo }}
                className="mt-6 flex flex-col items-center gap-3 sm:mt-8 sm:gap-4"
              >
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/24 to-transparent" />
                <p className="font-mono text-[9px] uppercase tracking-[0.42em] text-white/35 sm:text-[10px]">CIPHER DANCE STUDIO</p>
                <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                  {['Instagram', 'Youtube', 'Facebook'].map((social) => (
                    <a key={social} href="#" className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/45 transition-all duration-500 ease-expo hover:text-white hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.26)]">
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
