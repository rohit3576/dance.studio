import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '../animations/gsapConfig'
import { DancerLeap, DancerSpin, DancerArabesque } from '../components/DancerSVG'
import { useMouseParallax } from '../hooks/useMouseParallax'

const HeroChar = ({ char, delay }) => (
  <motion.span
    className="inline-block"
    initial={{ y: '120%', opacity: 0, filter: 'blur(10px)' }}
    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
    transition={{
      duration: 1.2,
      delay,
      ease: [0.16, 1, 0.3, 1],
    }}
  >
    {char === ' ' ? '\u00A0' : char}
  </motion.span>
)

const HERO_TITLE = 'FEEL THE RHYTHM'
const HERO_SUB = 'Where movement becomes art'

export default function SceneHero() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const overlayRef = useRef(null)
  const contentRef = useRef(null)
  const mouseParallax = useMouseParallax(0.01)

  useEffect(() => {
    const section = sectionRef.current
    const bg = bgRef.current
    const content = contentRef.current
    if (!section || !bg || !content) return

    // Create a single timeline for all scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      }
    })

    // Cinematic zoom in on scroll
    tl.to(bg, {
      scale: 1.25,
      ease: 'none',
    }, 0)

    // Smooth content fade and move
    tl.to(content, {
      opacity: 0,
      y: -80,
      ease: 'power2.inOut',
    }, 0)

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.vars?.trigger === section) t.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="home"
      className="scene-section relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden pt-20"
    >
      {/* Background - Layered Cinematic Depth */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 scale-[1.0] will-change-transform" 
        style={{ transformOrigin: 'center center' }}
      >
        {/* Layer 1: Animated Mesh Gradient */}
        <div className="absolute inset-0 mesh-gradient-bg opacity-40" />
        
        {/* Layer 2: Deep bg gradient */}
        <div className="absolute inset-0 bg-gradient-radial"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 50%, #1a0a30 0%, #07030f 50%, #020205 100%)',
          }}
        />

        {/* Layer 3: Cinematic Grid */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(179,71,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(179,71,255,0.2) 1px, transparent 1px)',
            backgroundSize: '100px 100px',
            transform: 'perspective(1000px) rotateX(60deg) translateY(-100px)',
            transformOrigin: 'top',
          }}
        />

        {/* Layer 4: Floating geometric lines (Midground) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-[#b347ff] to-transparent"
              style={{
                width: '100%',
                top: `${20 + i * 15}%`,
                left: '-50%',
                transform: `rotate(${i * 15 - 30}deg)`,
                animation: `float-line ${10 + i * 2}s linear infinite`,
              }}
            />
          ))}
        </div>

        {/* Layer 5: Large dancer silhouette center (Foreground-ish) */}
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            transform: `translate3d(${mouseParallax.x * 40}px, ${mouseParallax.y * 40}px, 0)`,
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          <div className="relative h-[450px] w-[380px] opacity-20 animate-float sm:h-[600px] sm:w-[550px] lg:h-[750px] lg:w-[650px]">
            <DancerLeap color="#b347ff" className="w-full h-full" />
            <div className="absolute inset-0 bg-[#b347ff] blur-[120px] opacity-20 rounded-full" />
          </div>
        </div>

        {/* Layer 6: Secondary dancers (Midground) */}
        <div 
          className="absolute top-[15%] left-[10%] w-64 h-64 opacity-15 animate-float-2 pointer-events-none"
          style={{
            transform: `translate3d(${mouseParallax.x * 60}px, ${mouseParallax.y * 60}px, 0)`,
            transition: 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          <DancerSpin color="#00d4ff" className="w-full h-full" />
        </div>
        <div 
          className="absolute bottom-[10%] right-[10%] w-56 h-56 opacity-10 animate-float-3 pointer-events-none"
          style={{
            transform: `translate3d(${mouseParallax.x * -40}px, ${mouseParallax.y * -40}px, 0)`,
            transition: 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          <DancerArabesque color="#ff2d9b" className="w-full h-full" />
        </div>

        {/* Layer 7: Neon orbs with pulsing glow */}
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-10 animate-glow-pulse pointer-events-none"
          style={{ background: 'radial-gradient(circle, #b347ff 0%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 animate-glow-pulse pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)', 
            filter: 'blur(60px)',
            animationDelay: '1.5s',
          }}
        />
      </div>

      {/* Vignette & Grain are handled by body::before/after in index.css */}

      {/* Content */}
      <div ref={contentRef} className="relative z-[10] text-center px-6 max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.8em', y: 10 }}
          animate={{ opacity: 1, letterSpacing: '0.4em', y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[10px] text-[#b347ff] uppercase tracking-[0.4em] mb-8 flex items-center justify-center gap-4"
        >
          <span className="hidden h-px w-12 bg-gradient-to-r from-transparent to-[#b347ff] sm:block opacity-50" />
          CIPHER DANCE STUDIO - EST. 2019
          <span className="hidden h-px w-12 bg-gradient-to-l from-transparent to-[#b347ff] sm:block opacity-50" />
        </motion.div>

        {/* Main title with cinematic reveal */}
        <div className="relative group">
          <h1 className="font-display text-[clamp(2.5rem,11vw,10.5rem)] leading-[0.85] tracking-[0.02em] overflow-hidden py-4">
            {HERO_TITLE.split(' ').map((word, wordIndex) => {
              const previousChars = HERO_TITLE.split(' ').slice(0, wordIndex).join('').length + wordIndex

              return (
                <span key={word} className="inline-block whitespace-nowrap mr-[0.2em] last:mr-0">
                  {word.split('').map((char, i) => (
                    <span key={`${word}-${char}-${i}`} className="inline-block overflow-hidden align-top">
                      <HeroChar
                        char={char}
                        delay={0.5 + (previousChars + i) * 0.05}
                      />
                    </span>
                  ))}
                </span>
              )
            })}
          </h1>
          {/* Subtle glow behind heading */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#b347ff]/5 blur-[100px] -z-10 animate-pulse-slow" />
        </div>

        {/* Gradient accent line with sweep */}
        <div className="relative max-w-2xl mx-auto my-10">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-px light-sweep"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(179,71,255,0.5), rgba(0,212,255,0.5), rgba(255,45,155,0.5), transparent)',
              transformOrigin: 'center'
            }}
          />
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-body text-xs sm:text-base md:text-lg text-white/50 tracking-[0.3em] uppercase max-w-2xl mx-auto"
        >
          {HERO_SUB}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
        >
          <a href="#classes" className="group relative px-10 py-4 bg-white text-black font-mono text-xs uppercase tracking-widest overflow-hidden transition-all duration-500 hover:text-white">
            <span className="relative z-10">Explore Classes</span>
            <div className="absolute inset-0 bg-black translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
          </a>
          <a href="#about" className="group relative px-10 py-4 border border-white/20 font-mono text-xs uppercase tracking-widest overflow-hidden transition-all duration-500">
            <span className="relative z-10">Our Story</span>
            <div className="absolute inset-0 bg-white/5 translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
          </a>
        </motion.div>
      </div>

      {/* Stats bottom - FIXED RESPONSIVENESS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-10 left-0 right-0 z-20 px-6"
      >
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 max-w-4xl mx-auto sm:gap-x-16">
          {[
            { num: '12+', label: 'Dance Styles' },
            { num: '500+', label: 'Students' },
            { num: '50+', label: 'Champions' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center min-w-[100px] flex-shrink-0">
              <div className="font-display text-2xl sm:text-3xl md:text-4xl gradient-text-purple tracking-tight">{num}</div>
              <div className="font-mono text-[9px] text-white/30 tracking-[0.2em] sm:text-[10px] uppercase mt-1">{label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Corner accents - More subtle */}
      <div className="absolute top-24 left-8 z-10 opacity-30">
        <div className="w-10 h-10 border-l border-t border-white" />
      </div>
      <div className="absolute top-24 right-8 z-10 opacity-30">
        <div className="w-10 h-10 border-r border-t border-white" />
      </div>
    </section>
  )
}
