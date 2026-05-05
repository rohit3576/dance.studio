import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '../animations/gsapConfig'
import { DancerLeap, DancerSpin, DancerPower, DancerArabesque } from '../components/DancerSVG'
import { useMouseParallax } from '../hooks/useMouseParallax'

function GlowButton({ children, primary }) {
  const [hover, setHover] = useState(false)

  return (
    <motion.button
      className="relative px-10 py-5 font-display text-xl tracking-[0.2em] overflow-hidden group"
      style={{
        background: primary
          ? 'linear-gradient(135deg, #b347ff 0%, #00d4ff 100%)'
          : 'transparent',
        border: primary ? 'none' : '1px solid rgba(179,71,255,0.5)',
        color: '#fff',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      transition={{ duration: 0.3 }}
      data-cursor-hover
    >
      {primary && (
        <>
          {/* Glow behind */}
          <motion.div
            className="absolute inset-0 -z-10"
            animate={{ opacity: hover ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
            style={{
              background: 'linear-gradient(135deg, #b347ff, #00d4ff)',
              filter: 'blur(20px)',
              transform: 'scale(1.5)',
            }}
          />
          {/* Shimmer overlay */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{ x: hover ? '100%' : '-100%' }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                skewX: '-15deg',
              }}
            />
          </div>
        </>
      )}

      {!primary && (
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ background: 'rgba(179,71,255,0.08)' }}
        />
      )}

      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

const PLANS = [
  {
    name: 'DROP-IN',
    price: '₹799',
    period: 'per class',
    color: '#b347ff',
    features: ['Any single class', 'Access to studio', 'Beginner friendly'],
    cta: 'Book a Class',
  },
  {
    name: 'MONTHLY',
    price: '₹3,999',
    period: 'per month',
    color: '#00d4ff',
    features: ['Unlimited classes', 'Priority booking', 'Progress tracking', 'Community access'],
    cta: 'Join Monthly',
    featured: true,
  },
  {
    name: 'ELITE',
    price: '₹8,999',
    period: 'per month',
    color: '#ff2d9b',
    features: ['All Monthly features', '1-on-1 coaching', 'Showcase priority', 'Gear discount 20%'],
    cta: 'Go Elite',
  },
]

export default function SceneCTA() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const mouseParallax = useMouseParallax(0.008)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Title reveal
      gsap.fromTo(titleRef.current,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
            anticipatePin: 1,
          }
        }
      )

      // Content reveal
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          ease: 'power3.out',
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
      id="join"
      className="scene-section relative w-full py-32 overflow-hidden"
      style={{ background: '#020205' }}
    >
      {/* Background massive glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full animate-glow-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(179,71,255,0.12) 0%, rgba(0,212,255,0.06) 40%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Corner dancers with mouse parallax */}
      <div 
        className="absolute bottom-0 left-0 w-48 h-60 opacity-15 animate-float pointer-events-none"
        style={{
          transform: `translate(${mouseParallax.x * 20}px, ${mouseParallax.y * 10}px)`,
          transition: 'transform 0.4s ease-out',
        }}
      >
        <DancerLeap color="#b347ff" className="w-full h-full" />
      </div>
      <div 
        className="absolute bottom-0 right-0 w-48 h-60 opacity-15 animate-float-2 pointer-events-none"
        style={{ 
          transform: `scaleX(-1) translate(${mouseParallax.x * -15}px, ${mouseParallax.y * 15}px)`,
          transition: 'transform 0.45s ease-out',
        }}
      >
        <DancerSpin color="#00d4ff" className="w-full h-full" />
      </div>
      <div 
        className="absolute top-8 left-[10%] w-32 h-40 opacity-8 animate-float-3 pointer-events-none"
        style={{
          transform: `translate(${mouseParallax.x * 25}px, ${mouseParallax.y * 20}px)`,
          transition: 'transform 0.35s ease-out',
        }}
      >
        <DancerArabesque color="#ff2d9b" className="w-full h-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="w-16 h-px bg-[#b347ff]/40" />
          <span className="font-mono text-[10px] text-[#b347ff] tracking-[0.4em] uppercase">Scene 05 — Join</span>
          <span className="w-16 h-px bg-[#b347ff]/40" />
        </motion.div>

        {/* Main CTA title */}
        <div ref={titleRef} className="mb-6">
          <h2 className="font-display text-[clamp(4rem,14vw,14rem)] leading-none tracking-tight">
            <span className="block gradient-text-purple">JOIN THE</span>
            <span className="block text-white">MOVEMENT</span>
          </h2>
        </div>

        <motion.p
          className="font-body text-lg text-white/40 max-w-xl mx-auto mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your first class is on us. Walk in a beginner.
          Walk out transformed. The floor is waiting — are you ready?
        </motion.p>

        {/* Pricing cards */}
        <div ref={contentRef} className="grid md:grid-cols-3 gap-6 mb-16">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`relative p-6 text-left group ${plan.featured ? 'scale-105' : ''}`}
              style={{
                border: `1px solid ${plan.color}${plan.featured ? '80' : '30'}`,
                background: plan.featured
                  ? `linear-gradient(135deg, ${plan.color}10 0%, transparent 100%)`
                  : 'rgba(255,255,255,0.02)',
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-[10px] font-mono tracking-[0.2em] uppercase"
                  style={{ background: plan.color, color: '#000' }}
                >
                  POPULAR
                </div>
              )}

              <div className="font-mono text-xs tracking-[0.3em] mb-4" style={{ color: plan.color }}>
                {plan.name}
              </div>
              <div className="font-display text-5xl mb-1" style={{ color: plan.color }}>
                {plan.price}
              </div>
              <div className="font-mono text-[10px] text-white/25 tracking-[0.2em] uppercase mb-6">
                {plan.period}
              </div>

              <ul className="space-y-2 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 font-body text-sm text-white/40 group-hover:text-white/60 transition-colors duration-300">
                    <span style={{ color: plan.color }}>▸</span>
                    {f}
                  </li>
                ))}
              </ul>

              <motion.button
                className="w-full py-3 font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300"
                style={{
                  border: `1px solid ${plan.color}60`,
                  color: plan.color,
                }}
                whileHover={{
                  backgroundColor: `${plan.color}20`,
                  borderColor: plan.color,
                }}
                whileTap={{ scale: 0.97 }}
                data-cursor-hover
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Main CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <GlowButton primary>START YOUR JOURNEY</GlowButton>
          <GlowButton>BOOK A FREE TRIAL</GlowButton>
        </motion.div>

        {/* Contact info */}
        <motion.div
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-white/25"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="tel:+919876543210" className="font-mono text-xs tracking-[0.2em] hover:text-[#b347ff] transition-colors duration-300" data-cursor-hover>
            +91 98765 43210
          </a>
          <span className="w-px h-4 bg-white/10 hidden md:block" />
          <a href="mailto:dance@cipher.studio" className="font-mono text-xs tracking-[0.2em] hover:text-[#b347ff] transition-colors duration-300" data-cursor-hover>
            dance@cipher.studio
          </a>
          <span className="w-px h-4 bg-white/10 hidden md:block" />
          <span className="font-mono text-xs tracking-[0.2em]">
            Bandra West, Mumbai
          </span>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-24 border-t border-white/5 pt-8 max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#b347ff] to-[#00d4ff]" />
            <span className="font-display text-lg tracking-[0.2em]">CIPHER</span>
          </div>
          <p className="font-mono text-[10px] text-white/20 tracking-[0.2em]">
            © 2025 CIPHER DANCE STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            {['IG', 'TW', 'YT', 'TK'].map(s => (
              <a key={s} href="#" className="font-mono text-[10px] text-white/25 hover:text-[#b347ff] tracking-[0.2em] transition-colors duration-300" data-cursor-hover>
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}