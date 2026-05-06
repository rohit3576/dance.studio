import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap, ScrollTrigger } from '../animations/gsapConfig'
import { DancerPower, DancerLeap, DancerSpin } from '../components/DancerSVG'
import { useMouseParallax } from '../hooks/useMouseParallax'

const WORDS = [
  { text: 'MOVE', color: '#b347ff', sub: 'Push past every boundary' },
  { text: 'EXPRESS', color: '#00d4ff', sub: 'Your body is your voice' },
  { text: 'DOMINATE', color: '#ff2d9b', sub: 'Own every stage, every spotlight' },
]

function WordReveal({ text, color, sub, index }) {
  const ref = useRef(null)
  const wordRef = useRef(null)
  const subRef = useRef(null)
  const lineRef = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-10%' })

  useEffect(() => {
    if (!isInView || !ref.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Word reveal with blur and scale
      tl.fromTo(wordRef.current,
        { y: '110%', filter: 'blur(20px)', scale: 1.1 },
        { y: 0, filter: 'blur(0px)', scale: 1, duration: 1.2, ease: 'expo.out', delay: index * 0.15 }
      )

      // Sub text fade in
      tl.fromTo(subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )

      // Line expand
      tl.fromTo(lineRef.current,
        { width: 0, opacity: 0 },
        { width: '100%', opacity: 0.4, duration: 1.5, ease: 'expo.inOut' },
        '-=0.8'
      )
    }, ref)

    return () => ctx.revert()
  }, [isInView, index])

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center py-20 md:py-32 border-b border-white/5 last:border-0 group overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-5%' }}
      transition={{ duration: 0.8 }}
    >
      {/* Number */}
      <div className="font-mono text-[10px] tracking-[0.5em] text-white/10 mb-6 group-hover:text-white/30 transition-colors duration-700">
        SCENE 0{index + 1}
      </div>

      {/* Big word */}
      <div className="overflow-hidden relative">
        <h2
          ref={wordRef}
          className="font-display text-[clamp(3.5rem,18vw,20rem)] leading-[0.85] tracking-tight group-hover:scale-[1.02] transition-transform duration-1000 ease-expo"
          style={{ color, willChange: 'transform, filter' }}
        >
          {text}
        </h2>
        {/* Cinematic Sweep on Word */}
        <div className="absolute inset-0 light-sweep opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      </div>

      {/* Sub text */}
      <p
        ref={subRef}
        className="font-body text-xs sm:text-base text-white/30 tracking-[0.2em] uppercase mt-8 group-hover:text-white/60 transition-colors duration-700"
      >
        {sub}
      </p>

      {/* Decorative line */}
      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />

      {/* Hover glow - Immersive Deep Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 pointer-events-none"
        style={{ 
          background: `radial-gradient(circle at center, ${color}08 0%, transparent 70%)`,
          filter: 'blur(60px)'
        }}
      />
    </motion.div>
  )
}

export default function ScenePerformanceDrop() {
  const sectionRef = useRef(null)
  const burstRef = useRef(null)
  const contentRef = useRef(null)
  const mouseParallax = useMouseParallax(0.008)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Zoom burst on the background element
      gsap.fromTo(burstRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1.4,
          opacity: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 1,
            anticipatePin: 0.5,
          }
        }
      )

      // Content reveal
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
            anticipatePin: 1,
          }
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="scene-section relative w-full overflow-hidden"
      style={{ background: '#020205' }}
    >
      {/* Zoom burst bg element */}
      <div
        ref={burstRef}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(179,71,255,0.15) 0%, transparent 60%)',
          willChange: 'transform, opacity',
        }}
      />

      {/* Floating dancers background with mouse parallax */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div 
          className="absolute top-0 left-[5%] w-40 h-40 opacity-10 animate-float"
          style={{
            transform: `translate(${mouseParallax.x * 20}px, ${mouseParallax.y * 20}px)`,
            transition: 'transform 0.4s ease-out',
          }}
        >
          <DancerPower color="#b347ff" className="w-full h-full" />
        </div>
        <div 
          className="absolute top-[20%] right-[3%] w-36 h-36 opacity-8 animate-float-2"
          style={{
            transform: `translate(${mouseParallax.x * -15}px, ${mouseParallax.y * -15}px)`,
            transition: 'transform 0.35s ease-out',
          }}
        >
          <DancerLeap color="#00d4ff" className="w-full h-full" />
        </div>
        <div 
          className="absolute bottom-[10%] left-[2%] w-32 h-32 opacity-8 animate-float-3"
          style={{
            transform: `translate(${mouseParallax.x * 25}px, ${mouseParallax.y * 25}px)`,
            transition: 'transform 0.45s ease-out',
          }}
        >
          <DancerSpin color="#ff2d9b" className="w-full h-full" />
        </div>
      </div>

      <div ref={contentRef} className="relative z-[10] max-w-6xl mx-auto px-5 py-20 sm:px-6 md:py-24">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-[#ff2d9b]/40" />
          <span className="font-mono text-[10px] text-[#ff2d9b] tracking-[0.28em] sm:tracking-[0.4em] uppercase">Scene 03 - About</span>
        </motion.div>

        {/* Word reveals */}
        <div className="border-t border-white/5">
          {WORDS.map((word, i) => (
            <WordReveal key={word.text} {...word} index={i} />
          ))}
        </div>

        {/* Quote block */}
        <motion.div
          className="mt-24 text-center relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-8xl text-[#b347ff]/10 font-display leading-none">
            "
          </div>
          <blockquote className="font-body text-xl md:text-3xl text-white/60 italic max-w-2xl mx-auto leading-relaxed">
            Dance is the hidden language of the soul - it speaks where words cannot reach.
          </blockquote>
          <div className="mt-6 font-mono text-xs text-white/25 tracking-[0.3em] uppercase">
            - Martha Graham
          </div>
        </motion.div>
      </div>
    </section>
  )
}
