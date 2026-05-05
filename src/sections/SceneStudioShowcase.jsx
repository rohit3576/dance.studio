import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '../animations/gsapConfig'
import { DancerSpin, DancerArabesque, DancerPower, DancerLeap } from '../components/DancerSVG'
import { useMouseParallax } from '../hooks/useMouseParallax'

const STUDIO_FEATURES = [
  {
    icon: '◈',
    title: 'PRO MIRRORS',
    desc: 'Floor-to-ceiling professional mirrors on all four walls for perfect form feedback.',
    color: '#b347ff',
  },
  {
    icon: '◉',
    title: 'SOUND SYSTEM',
    desc: '50,000W immersive surround sound — feel the bass in your bones.',
    color: '#00d4ff',
  },
  {
    icon: '◎',
    title: 'SPRUNG FLOOR',
    desc: 'Shock-absorbing maple sprung floor — dance longer, recover faster.',
    color: '#ff2d9b',
  },
  {
    icon: '◐',
    title: 'NEON STAGE',
    desc: 'Programmable LED stage lighting for performance rehearsal and showcases.',
    color: '#00ff88',
  },
]

function StudioRoom() {
  const roomRef = useRef(null)
  const mouseParallax = useMouseParallax(0.012)

  return (
    <div 
      ref={roomRef}
      className="relative w-full aspect-[4/3] overflow-hidden neon-border"
      style={{
        transform: `perspective(1000px) rotateX(${mouseParallax.y * 2}deg) rotateY(${mouseParallax.x * 2}deg)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      {/* Room bg */}
      <div className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0a0015 0%, #050010 50%, #0d0020 100%)',
        }}
      />

      {/* Floor perspective lines */}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-1/2 opacity-20" viewBox="0 0 800 400" preserveAspectRatio="none">
        {[...Array(12)].map((_, i) => {
          const x = (i / 11) * 800
          return (
            <line key={i} x1={x} y1={0} x2={400} y2={-200}
              stroke="#b347ff" strokeWidth="0.5" />
          )
        })}
        {[...Array(8)].map((_, i) => {
          const y = (i / 7) * 400
          return (
            <line key={i} x1={0} y1={y} x2={800} y2={y}
              stroke="#b347ff" strokeWidth="0.5" opacity={0.5} />
          )
        })}
      </svg>

      {/* Ceiling lights */}
      {[15, 35, 55, 75, 90].map((pct, i) => (
        <div key={i} className="absolute top-0" style={{ left: `${pct}%` }}>
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="w-2 h-2 rounded-full -ml-0.5 animate-glow-pulse"
            style={{
              background: ['#b347ff', '#00d4ff', '#ff2d9b', '#b347ff', '#00d4ff'][i],
              boxShadow: `0 0 20px 8px ${['#b347ff44', '#00d4ff44', '#ff2d9b44', '#b347ff44', '#00d4ff44'][i]}`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        </div>
      ))}

      {/* Neon strip on walls */}
      <div className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(90deg, transparent, #b347ff, #00d4ff, #ff2d9b, transparent)' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ background: 'linear-gradient(90deg, transparent, #b347ff, #00d4ff, transparent)' }}
      />
      <div className="absolute left-0 top-0 bottom-0 w-0.5"
        style={{ background: 'linear-gradient(180deg, transparent, #b347ff44, transparent)' }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-0.5"
        style={{ background: 'linear-gradient(180deg, transparent, #b347ff44, transparent)' }}
      />

      {/* Dancers in room with parallax */}
      <div 
        className="absolute bottom-0 left-[20%] w-40 h-52 animate-float opacity-80"
        style={{
          transform: `translate(${mouseParallax.x * 15}px, ${mouseParallax.y * 10}px)`,
          transition: 'transform 0.35s ease-out',
        }}
      >
        <DancerSpin color="#00d4ff" className="w-full h-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full"
          style={{ background: 'radial-gradient(ellipse, #00d4ff44, transparent)', filter: 'blur(4px)' }}
        />
      </div>
      <div 
        className="absolute bottom-0 left-[45%] w-48 h-60 animate-float-2 opacity-90"
        style={{
          transform: `translate(${mouseParallax.x * -10}px, ${mouseParallax.y * 15}px)`,
          transition: 'transform 0.4s ease-out',
        }}
      >
        <DancerPower color="#b347ff" className="w-full h-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-3 rounded-full"
          style={{ background: 'radial-gradient(ellipse, #b347ff55, transparent)', filter: 'blur(4px)' }}
        />
      </div>
      <div 
        className="absolute bottom-0 right-[15%] w-36 h-48 animate-float-3 opacity-70"
        style={{
          transform: `translate(${mouseParallax.x * 20}px, ${mouseParallax.y * 5}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <DancerArabesque color="#ff2d9b" className="w-full h-full" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full"
          style={{ background: 'radial-gradient(ellipse, #ff2d9b44, transparent)', filter: 'blur(4px)' }}
        />
      </div>

      {/* Mirror effect top */}
      <div className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(179,71,255,0.04) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {/* STUDIO label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-white/20 tracking-[0.4em] uppercase">
        STUDIO A — CIPHER HQ
      </div>
    </div>
  )
}

export default function SceneStudioShowcase() {
  const sectionRef = useRef(null)
  const imgRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Cinematic reveal
      gsap.fromTo(imgRef.current,
        { scale: 1.1, filter: 'brightness(0.3)' },
        {
          scale: 1.0,
          filter: 'brightness(1)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imgRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            anticipatePin: 0.5,
          }
        }
      )

      // Content reveal
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 75%',
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
      id="studio"
      className="scene-section relative w-full py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020205 0%, #080015 50%, #020205 100%)' }}
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none animate-glow-pulse"
        style={{ background: 'radial-gradient(circle, rgba(179,71,255,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="w-16 h-px bg-[#ff2d9b]/40" />
          <span className="font-mono text-[10px] text-[#ff2d9b] tracking-[0.4em] uppercase">Scene 04 — Studio</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div ref={contentRef}>
            <motion.h2
              className="font-display text-[clamp(3rem,7vw,7rem)] leading-none tracking-wide mb-6"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              THE{' '}
              <span className="gradient-text-purple">SPACE</span>
              <br />
              WHERE{' '}
              <span style={{ color: '#ff2d9b' }}>LEGENDS</span>
              <br />
              ARE MADE
            </motion.h2>

            <motion.p
              className="font-body text-base text-white/40 leading-relaxed mb-10 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Our 5,000 sq ft flagship studio in the heart of the city is engineered
              for elite performance. Professional-grade everything — because you deserve
              nothing less than the best.
            </motion.p>

            {/* Features list */}
            <div className="space-y-4">
              {STUDIO_FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  className="flex items-start gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * i }}
                >
                  <span className="text-xl mt-0.5 flex-shrink-0" style={{ color: feat.color }}>
                    {feat.icon}
                  </span>
                  <div>
                    <div className="font-mono text-xs tracking-[0.2em] mb-1" style={{ color: feat.color }}>
                      {feat.title}
                    </div>
                    <p className="font-body text-sm text-white/35 group-hover:text-white/60 transition-colors duration-300">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: studio visual */}
          <motion.div
            ref={imgRef}
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <StudioRoom />

            {/* Stats overlaying the room visual */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { val: '5,000', unit: 'sq ft', label: 'Studio Space' },
                { val: '50k', unit: 'W', label: 'Sound Power' },
                { val: '4', unit: 'rooms', label: 'Dance Floors' },
              ].map(({ val, unit, label }) => (
                <div key={label} className="neon-border p-3 text-center glass">
                  <div className="font-display text-2xl gradient-text-purple">
                    {val}<span className="text-sm text-white/40 ml-1">{unit}</span>
                  </div>
                  <div className="font-mono text-[9px] text-white/25 tracking-[0.2em] uppercase mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}