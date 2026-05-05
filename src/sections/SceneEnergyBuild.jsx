import React, { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap, ScrollTrigger } from '../animations/gsapConfig'
import { DancerLeap, DancerSpin, DancerPower, DancerArabesque } from '../components/DancerSVG'
import { useMouseParallax } from '../hooks/useMouseParallax'

export default function SceneEnergyBuild() {
  const sectionRef = useRef(null)
  const bgLayerRef = useRef(null)
  const midLayerRef = useRef(null)
  const fgLayerRef = useRef(null)
  const textRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-20%' })
  const mouseParallax = useMouseParallax(0.01)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Parallax layers - optimized with single timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
          anticipatePin: 0.5,
        }
      })

      // Background layer (slowest - depth illusion)
      tl.to(bgLayerRef.current, {
        yPercent: -20,
        ease: 'none',
      }, 0)

      // Midground layer (medium speed)
      tl.to(midLayerRef.current, {
        yPercent: -40,
        ease: 'none',
      }, 0)

      // Foreground layer (fastest)
      tl.to(fgLayerRef.current, {
        yPercent: -70,
        ease: 'none',
      }, 0)

      // Text reveal
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
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
      id="classes"
      className="scene-section relative w-full min-h-[150vh] overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #020205 0%, #0d0520 50%, #020205 100%)' }}
    >
      {/* Background layer - slowest */}
      <div
        ref={bgLayerRef}
        className="absolute inset-0 z-[1]"
        style={{ 
          top: '-20%', 
          height: '140%',
          willChange: 'transform',
          transform: `translateX(${mouseParallax.x * 15}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      >
        {/* Large BG orb with pulsing glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-15 animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, #b347ff 0%, transparent 70%)', filter: 'blur(80px)' }}
        />
        {/* Grid with perspective */}
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            perspective: '500px',
            transform: 'rotateX(30deg)',
            transformOrigin: 'top center',
          }}
        />
        <div className="absolute bottom-0 left-[5%] w-64 h-64 opacity-8 animate-float-3">
          <DancerArabesque color="#b347ff" opacity={0.4} className="w-full h-full" />
        </div>
        <div className="absolute top-[10%] right-[8%] w-72 h-72 opacity-6 animate-float">
          <DancerSpin color="#b347ff" opacity={0.3} className="w-full h-full" />
        </div>
      </div>

      {/* Mid layer */}
      <div
        ref={midLayerRef}
        className="absolute inset-0 z-[2]"
        style={{ 
          top: '-10%', 
          height: '120%',
          willChange: 'transform',
          transform: `translateX(${mouseParallax.x * -10}px)`,
          transition: 'transform 0.4s ease-out',
        }}
      >
        <div className="absolute top-1/4 left-[15%] w-96 h-96 opacity-25 animate-float-2">
          <DancerSpin color="#00d4ff" className="w-full h-full" />
        </div>
        <div className="absolute top-[30%] right-[15%] w-80 h-80 opacity-20 animate-float">
          <DancerLeap color="#ff2d9b" className="w-full h-full" />
        </div>
        {/* Mid orbs with glow pulse */}
        <div className="absolute top-1/3 left-[20%] w-64 h-64 rounded-full opacity-10 animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        <div className="absolute bottom-1/3 right-[20%] w-48 h-48 rounded-full opacity-10 animate-glow-pulse"
          style={{ 
            background: 'radial-gradient(circle, #ff2d9b 0%, transparent 70%)', 
            filter: 'blur(40px)',
            animationDelay: '1.5s',
          }}
        />
      </div>

      {/* Foreground layer - fastest */}
      <div
        ref={fgLayerRef}
        className="absolute inset-0 z-[3]"
        style={{ 
          top: '0%', 
          height: '110%',
          willChange: 'transform',
          transform: `translateX(${mouseParallax.x * 25}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="absolute top-[40%] left-[35%] w-48 h-48 opacity-40 animate-float-3">
          <DancerPower color="#ff2d9b" className="w-full h-full" />
        </div>
        <div className="absolute bottom-[20%] left-[60%] w-40 h-40 opacity-30 animate-float">
          <DancerLeap color="#00ff88" className="w-full h-full" />
        </div>
      </div>

      {/* Content - sticks to center */}
      <div className="relative z-[20] flex flex-col items-center justify-center min-h-[150vh] py-32">
        <div ref={textRef} className="text-center max-w-4xl mx-auto px-6">
          {/* Section label */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-16 h-px bg-[#00d4ff]/40" />
            <span className="font-mono text-[10px] text-[#00d4ff] tracking-[0.4em] uppercase">Scene 02 — Energy</span>
            <span className="w-16 h-px bg-[#00d4ff]/40" />
          </div>

          <h2 className="font-display text-[clamp(3rem,9vw,8rem)] leading-none tracking-wider text-white mb-6">
            BUILT ON{' '}
            <span className="gradient-text-purple glow-purple">ENERGY</span>
          </h2>

          <p className="font-body text-lg text-white/40 max-w-xl mx-auto leading-relaxed mb-12">
            Every class is a pulse. Every movement is a statement.
            We train bodies and free souls — because dance isn't learned,
            it's <em className="text-white/70 not-italic">unleashed.</em>
          </p>

          {/* Style cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-16">
            {[
              { name: 'BREAKDANCE', color: '#b347ff', delay: 0 },
              { name: 'WAACKING', color: '#00d4ff', delay: 0.1 },
              { name: 'HIP HOP', color: '#ff2d9b', delay: 0.2 },
              { name: 'KRUMP', color: '#00ff88', delay: 0.3 },
              { name: 'POPPING', color: '#b347ff', delay: 0.4 },
              { name: 'LOCKING', color: '#00d4ff', delay: 0.5 },
              { name: 'VOGUE', color: '#ff2d9b', delay: 0.6 },
              { name: 'HOUSE', color: '#00ff88', delay: 0.7 },
            ].map(({ name, color, delay }) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="relative group neon-border p-4 text-center cursor-pointer overflow-hidden"
                style={{ borderColor: `${color}33` }}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(circle at center, ${color}11 0%, transparent 70%)` }}
                />
                <div className="w-1 h-1 rounded-full mx-auto mb-3 animate-pulse-glow" style={{ background: color }} />
                <span className="font-display text-sm tracking-[0.15em]" style={{ color }}>
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}