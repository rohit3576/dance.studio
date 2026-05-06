import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from '../animations/gsapConfig'
import { DancerLeap, DancerSpin, DancerArabesque } from '../components/DancerSVG'
import { useMouseParallax } from '../hooks/useMouseParallax'

function GlowButton({ children, primary }) {
  return (
    <motion.button
      className="relative min-h-14 w-full overflow-hidden px-6 py-4 font-display text-base tracking-[0.14em] sm:w-auto sm:px-9 sm:text-lg"
      style={{
        background: primary ? 'linear-gradient(135deg, #b347ff 0%, #00d4ff 100%)' : 'transparent',
        border: primary ? 'none' : '1px solid rgba(179,71,255,0.55)',
        color: '#fff',
        boxShadow: primary ? '0 0 34px rgba(179,71,255,0.25)' : '0 0 24px rgba(179,71,255,0.08)',
      }}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.25 }}
      data-cursor-hover
    >
      <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

const PLANS = [
  {
    name: 'DROP-IN',
    price: 'Rs. 799',
    period: 'per class',
    color: '#b347ff',
    features: ['Any single class', 'Studio access', 'Beginner friendly'],
    cta: 'Book a Class',
  },
  {
    name: 'MONTHLY',
    price: 'Rs. 3,999',
    period: 'per month',
    color: '#00d4ff',
    features: ['Unlimited classes', 'Priority booking', 'Progress tracking', 'Community access'],
    cta: 'Join Monthly',
    featured: true,
  },
  {
    name: 'ELITE',
    price: 'Rs. 8,999',
    period: 'per month',
    color: '#ff2d9b',
    features: ['Everything in Monthly', '1-on-1 coaching', 'Showcase priority', 'Gear discount'],
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
      gsap.fromTo(
        titleRef.current,
        { scale: 0.95, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
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
      id="contact"
      className="scene-section relative w-full overflow-hidden py-24 md:py-40"
      style={{ background: '#020205' }}
    >
      {/* Cinematic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020205] via-[#0d0520] to-[#020205] opacity-50" />
        <div
          className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #b347ff 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div ref={titleRef} className="text-center mb-20">
          <motion.div
            className="inline-flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="h-px w-12 bg-[#b347ff]/40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#b347ff]">JOIN THE MOVEMENT</span>
            <span className="h-px w-12 bg-[#b347ff]/40" />
          </motion.div>

          <h2 className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.85] tracking-tight mb-8">
            READY TO <span className="gradient-text-purple glow-purple">ASCEND?</span>
          </h2>
          <p className="font-body text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
            Choose your path and start your journey with India's most elite dance community.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
              className={`relative group ${plan.featured ? 'z-20' : 'z-10'}`}
            >
              {plan.featured && (
                <div className="absolute -inset-[2px] rounded-[24px] bg-gradient-to-b from-[#b347ff] via-[#00d4ff] to-[#ff2d9b] opacity-40 blur-sm group-hover:opacity-100 transition-opacity duration-500" />
              )}
              <div className="glass-panel-heavy h-full p-8 sm:p-10 rounded-[22px] flex flex-col items-center text-center">
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase mb-8" style={{ color: plan.color }}>{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-display text-4xl sm:text-5xl text-white">{plan.price}</span>
                </div>
                <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-10">{plan.period}</div>
                
                <div className="w-full h-px bg-white/5 mb-10" />
                
                <ul className="w-full space-y-5 mb-12 flex-grow">
                  {plan.features.map((feat) => (
                    <li key={feat} className="font-body text-sm text-white/50 flex items-center justify-center gap-3">
                      <div className="w-1 h-1 rounded-full" style={{ background: plan.color }} />
                      {feat}
                    </li>
                  ))}
                </ul>

                <button 
                  className="w-full py-5 rounded-xl font-mono text-[10px] tracking-[0.3em] uppercase transition-all duration-500 overflow-hidden relative group/btn"
                  style={{ 
                    background: plan.featured ? 'white' : 'transparent',
                    color: plan.featured ? 'black' : 'white',
                    border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <span className="relative z-10">{plan.cta}</span>
                  {!plan.featured && (
                    <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-500 group-hover/btn:translate-y-0" />
                  )}
                  {!plan.featured && (
                    <span className="absolute inset-0 flex items-center justify-center text-black opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100 z-20">{plan.cta}</span>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
