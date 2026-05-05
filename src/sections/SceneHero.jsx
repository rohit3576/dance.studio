import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '../animations/gsapConfig'
import { DancerLeap, DancerSpin, DancerArabesque } from '../components/DancerSVG'
import { useMouseParallax } from '../hooks/useMouseParallax'

const HeroChar = ({ char, delay }) => (
  <motion.span
    className="inline-block"
    initial={{ y: '110%', opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{
      duration: 1,
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
  const mouseParallax = useMouseParallax(0.015)

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
        scrub: 1.2,
        anticipatePin: 1,
      }
    })

    // Zoom in on scroll with smooth transition
    tl.to(bg, {
      scale: 1.3,
      filter: 'blur(8px)',
      ease: 'none',
    }, 0)

    // Darken overlay on scroll
    tl.to(overlayRef.current, {
      opacity: 0.9,
      ease: 'none',
    }, 0)

    // Content fades out on scroll
    tl.to(content, {
      opacity: 0,
      y: -50,
      ease: 'none',
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
      id="about"
      className="scene-section relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background - gradient + dancer shapes */}
      <div 
        ref={bgRef} 
        className="absolute inset-0 scale-[1.0]" 
        style={{ 
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        {/* Deep bg gradient */}
        <div className="absolute inset-0 bg-gradient-radial"
          style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 50%, #1a0a30 0%, #07030f 50%, #020205 100%)',
          }}
        />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(179,71,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(179,71,255,0.3) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Large dancer silhouette center - with mouse parallax */}
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${mouseParallax.x * 20}px, ${mouseParallax.y * 20}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
          <div className="relative w-[600px] h-[700px] opacity-15 animate-float">
            <DancerLeap color="#b347ff" className="w-full h-full" />
          </div>
        </div>

        {/* Secondary dancers with parallax */}
        <div 
          className="absolute top-[10%] left-[5%] w-52 h-52 opacity-10 animate-float-2"
          style={{
            transform: `translate(${mouseParallax.x * 30}px, ${mouseParallax.y * 30}px)`,
            transition: 'transform 0.4s ease-out',
          }}
        >
          <DancerSpin color="#00d4ff" className="w-full h-full" />
        </div>
        <div 
          className="absolute bottom-[5%] right-[5%] w-48 h-48 opacity-8 animate-float-3"
          style={{
            transform: `translate(${mouseParallax.x * -20}px, ${mouseParallax.y * -20}px)`,
            transition: 'transform 0.35s ease-out',
          }}
        >
          <DancerArabesque color="#ff2d9b" className="w-full h-full" />
        </div>

        {/* Neon orbs with pulsing glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, #b347ff 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 animate-glow-pulse"
          style={{ 
            background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)', 
            filter: 'blur(40px)',
            animationDelay: '1s',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5 animate-glow-pulse"
          style={{ 
            background: 'radial-gradient(circle, #ff2d9b 0%, transparent 70%)', 
            filter: 'blur(60px)',
            animationDelay: '2s',
          }}
        />
      </div>

      {/* Dark overlay that intensifies on scroll */}
      <div ref={overlayRef} className="absolute inset-0 bg-[#020205]/30 z-[2]" />

      {/* Vignette */}
      <div className="absolute inset-0 z-[3]"
        style={{
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(2,2,5,0.7) 100%)'
        }}
      />

      {/* Content */}
      <div ref={contentRef} className="relative z-[10] text-center px-6 max-w-6xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.4em' }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="font-mono text-xs text-[#b347ff] uppercase tracking-[0.4em] mb-8 flex items-center justify-center gap-4"
        >
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-[#b347ff]" />
          CIPHER DANCE STUDIO — EST. 2019
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-[#b347ff]" />
        </motion.div>

        {/* Main title with char reveal */}
        <h1 className="font-display text-[clamp(4rem,12vw,11rem)] leading-none tracking-[0.05em] overflow-hidden">
          {HERO_TITLE.split('').map((char, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <HeroChar
                char={char}
                delay={0.4 + i * 0.04}
              />
            </span>
          ))}
        </h1>

        {/* Gradient accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-px my-6"
          style={{
            background: 'linear-gradient(90deg, transparent, #b347ff, #00d4ff, #ff2d9b, transparent)',
            transformOrigin: 'left'
          }}
        />

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="font-body text-lg text-white/50 tracking-[0.2em] uppercase"
        >
          {HERO_SUB}
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="absolute bottom-[-180px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
          <div className="relative w-px h-16 bg-white/10">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#b347ff] to-transparent"
              animate={{ height: ['0%', '100%'], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-24 left-6 z-10">
        <div className="w-8 h-8 border-l border-t border-[#b347ff]/30" />
      </div>
      <div className="absolute top-24 right-6 z-10">
        <div className="w-8 h-8 border-r border-t border-[#b347ff]/30" />
      </div>
      <div className="absolute bottom-6 left-6 z-10">
        <div className="w-8 h-8 border-l border-b border-[#b347ff]/30" />
      </div>
      <div className="absolute bottom-6 right-6 z-10">
        <div className="w-8 h-8 border-r border-b border-[#b347ff]/30" />
      </div>

      {/* Stats bottom */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-12"
      >
        {[
          { num: '12+', label: 'Dance Styles' },
          { num: '500+', label: 'Students' },
          { num: '50+', label: 'Champions' },
        ].map(({ num, label }) => (
          <div key={label} className="text-center">
            <div className="font-display text-3xl gradient-text-purple">{num}</div>
            <div className="font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase mt-1">{label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}