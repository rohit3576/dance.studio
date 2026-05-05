import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../animations/gsapConfig'
import { DancerSpin, DancerArabesque, DancerPower } from '../components/DancerSVG'
import { useMouseParallax } from '../hooks/useMouseParallax'

const STUDIO_FEATURES = [
  {
    icon: '+',
    title: 'PRO MIRRORS',
    desc: 'Floor-to-ceiling mirrors for clean form feedback from every angle.',
    color: '#b347ff',
  },
  {
    icon: '~',
    title: 'SOUND SYSTEM',
    desc: 'Immersive sound tuned for practice, rehearsal, and showcase nights.',
    color: '#00d4ff',
  },
  {
    icon: '*',
    title: 'SPRUNG FLOOR',
    desc: 'Shock-absorbing maple flooring that protects joints during long sessions.',
    color: '#ff2d9b',
  },
  {
    icon: '>',
    title: 'NEON STAGE',
    desc: 'Programmable lighting for performance prep and content shoots.',
    color: '#00ff88',
  },
]

function StudioRoom() {
  const mouseParallax = useMouseParallax(0.012)

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden neon-border will-change-transform"
      style={{
        transform: `perspective(1000px) rotateX(${mouseParallax.y * 2}deg) rotateY(${mouseParallax.x * 2}deg) translate3d(0,0,0)`,
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0a0015_0%,#050010_50%,#0d0020_100%)]" />
      <svg className="absolute bottom-0 left-0 right-0 h-1/2 w-full opacity-20" viewBox="0 0 800 400" preserveAspectRatio="none">
        {[...Array(10)].map((_, i) => {
          const x = (i / 9) * 800
          return <line key={`v-${i}`} x1={x} y1={0} x2={400} y2={-200} stroke="#b347ff" strokeWidth="0.5" />
        })}
        {[...Array(7)].map((_, i) => {
          const y = (i / 6) * 400
          return <line key={`h-${i}`} x1={0} y1={y} x2={800} y2={y} stroke="#b347ff" strokeWidth="0.5" opacity={0.5} />
        })}
      </svg>

      {[15, 38, 62, 85].map((pct, i) => (
        <div key={pct} className="absolute top-0" style={{ left: `${pct}%` }}>
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent sm:h-16" />
          <div
            className="h-2 w-2 rounded-full"
            style={{
              background: ['#b347ff', '#00d4ff', '#ff2d9b', '#00ff88'][i],
              boxShadow: `0 0 22px 8px ${['#b347ff44', '#00d4ff44', '#ff2d9b44', '#00ff8844'][i]}`,
            }}
          />
        </div>
      ))}

      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b347ff] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />

      <div className="absolute bottom-0 left-[14%] h-40 w-32 opacity-80 animate-float sm:h-52 sm:w-40">
        <DancerSpin color="#00d4ff" className="h-full w-full" />
      </div>
      <div className="absolute bottom-0 left-[42%] h-48 w-36 opacity-90 animate-float-2 sm:h-60 sm:w-48">
        <DancerPower color="#b347ff" className="h-full w-full" />
      </div>
      <div className="absolute bottom-0 right-[10%] h-36 w-28 opacity-75 animate-float-3 sm:h-48 sm:w-36">
        <DancerArabesque color="#ff2d9b" className="h-full w-full" />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(179,71,255,0.05)_0%,transparent_45%,rgba(0,0,0,0.35)_100%)]" />
      <div className="absolute left-1/2 top-4 -translate-x-1/2 font-mono text-[8px] uppercase tracking-[0.32em] text-white/25">
        STUDIO A - CIPHER HQ
      </div>
    </div>
  )
}

export default function SceneStudioShowcase() {
  const sectionRef = useRef(null)
  const visualRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        visualRef.current,
        { scale: 1.04, opacity: 0.6 },
        {
          scale: 1,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: visualRef.current,
            start: 'top 85%',
            end: 'top 25%',
            scrub: 1.2,
          },
        }
      )

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="studio"
      className="scene-section relative w-full overflow-hidden py-20 md:py-24"
      style={{ background: 'linear-gradient(180deg, #020205 0%, #080015 50%, #020205 100%)' }}
    >
      <div
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(179,71,255,0.08) 0%, transparent 70%)', filter: 'blur(56px)' }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div
          className="mb-10 flex items-center gap-4 md:mb-12"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="h-px w-12 bg-[#ff2d9b]/40 sm:w-16" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#ff2d9b] sm:tracking-[0.4em]">Scene 04 - Studio</span>
        </motion.div>

        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <div ref={contentRef}>
            <h2 className="mb-6 font-display text-[clamp(3rem,7vw,7rem)] leading-none tracking-wide">
              THE <span className="gradient-text-purple">SPACE</span>
              <br />
              WHERE <span style={{ color: '#ff2d9b' }}>LEGENDS</span>
              <br />
              ARE MADE
            </h2>

            <p className="mb-9 max-w-md font-body text-base leading-relaxed text-white/45">
              Our flagship studio is engineered for high-output training, clean technique, and camera-ready rehearsals.
            </p>

            <div className="space-y-4">
              {STUDIO_FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.08 * i }}
                >
                  <span className="mt-0.5 w-5 flex-shrink-0 text-xl" style={{ color: feat.color }}>{feat.icon}</span>
                  <div>
                    <div className="mb-1 font-mono text-xs tracking-[0.2em]" style={{ color: feat.color }}>{feat.title}</div>
                    <p className="font-body text-sm leading-relaxed text-white/40">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div ref={visualRef} className="relative will-change-transform">
            <StudioRoom />
            <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { val: '5,000', unit: 'sq ft', label: 'Studio Space' },
                { val: '50k', unit: 'W', label: 'Sound Power' },
                { val: '4', unit: 'rooms', label: 'Dance Floors' },
              ].map(({ val, unit, label }) => (
                <div key={label} className="neon-border glass p-2 text-center sm:p-3">
                  <div className="font-display text-xl gradient-text-purple sm:text-2xl">
                    {val}<span className="ml-1 text-xs text-white/40 sm:text-sm">{unit}</span>
                  </div>
                  <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-white/30 sm:text-[9px] sm:tracking-[0.2em]">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
