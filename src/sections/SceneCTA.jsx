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
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
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
      id="contact"
      className="scene-section relative w-full overflow-hidden py-20 md:py-28"
      style={{ background: '#020205' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full md:h-[900px] md:w-[900px]"
          style={{
            background: 'radial-gradient(circle, rgba(179,71,255,0.12) 0%, rgba(0,212,255,0.06) 40%, transparent 70%)',
            filter: 'blur(58px)',
          }}
        />
      </div>

      <div
        className="absolute bottom-0 left-0 h-48 w-36 opacity-10 animate-float pointer-events-none sm:h-60 sm:w-48"
        style={{ transform: `translate3d(${mouseParallax.x * 20}px, ${mouseParallax.y * 10}px, 0)` }}
      >
        <DancerLeap color="#b347ff" className="h-full w-full" />
      </div>
      <div
        className="absolute bottom-0 right-0 h-48 w-36 opacity-10 animate-float-2 pointer-events-none sm:h-60 sm:w-48"
        style={{ transform: `scaleX(-1) translate3d(${mouseParallax.x * -15}px, ${mouseParallax.y * 15}px, 0)` }}
      >
        <DancerSpin color="#00d4ff" className="h-full w-full" />
      </div>
      <div
        className="absolute left-[10%] top-8 h-36 w-28 opacity-8 animate-float-3 pointer-events-none sm:h-40 sm:w-32"
        style={{ transform: `translate3d(${mouseParallax.x * 25}px, ${mouseParallax.y * 20}px, 0)` }}
      >
        <DancerArabesque color="#ff2d9b" className="h-full w-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 text-center sm:px-6">
        <motion.div
          className="mb-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="hidden h-px w-12 bg-[#b347ff]/40 sm:block" />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#b347ff] sm:tracking-[0.4em]">Scene 05 - Contact</span>
          <span className="hidden h-px w-12 bg-[#b347ff]/40 sm:block" />
        </motion.div>

        <div ref={titleRef} className="mb-6 will-change-transform">
          <h2 className="font-display text-[clamp(3.35rem,14vw,14rem)] leading-[0.9] tracking-[0.01em]">
            <span className="block gradient-text-purple">JOIN THE</span>
            <span className="block text-white">MOVEMENT</span>
          </h2>
        </div>

        <motion.p
          className="mx-auto mb-12 max-w-xl font-body text-base leading-relaxed text-white/45 sm:mb-16 sm:text-lg"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          Your first class is on us. Walk in curious, walk out moving differently. The floor is waiting.
        </motion.p>

        <div ref={contentRef} className="mb-12 grid gap-4 md:mb-16 md:grid-cols-3 md:gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              className="relative p-5 text-left md:p-6"
              style={{
                border: `1px solid ${plan.color}${plan.featured ? '80' : '35'}`,
                background: plan.featured ? `linear-gradient(135deg, ${plan.color}12 0%, rgba(255,255,255,0.02) 100%)` : 'rgba(255,255,255,0.02)',
                boxShadow: plan.featured ? `0 0 42px ${plan.color}18` : 'none',
              }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.62, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ background: plan.color, color: '#020205' }}>
                  Popular
                </div>
              )}
              <div className="mb-4 font-mono text-xs tracking-[0.3em]" style={{ color: plan.color }}>{plan.name}</div>
              <div className="mb-1 font-display text-4xl sm:text-5xl" style={{ color: plan.color }}>{plan.price}</div>
              <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">{plan.period}</div>
              <ul className="mb-8 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 font-body text-sm text-white/45">
                    <span style={{ color: plan.color }}>+</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className="min-h-11 w-full font-mono text-xs uppercase tracking-[0.18em] transition-colors duration-300"
                style={{ border: `1px solid ${plan.color}60`, color: plan.color }}
                data-cursor-hover
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.25 }}
        >
          <GlowButton primary>START YOUR JOURNEY</GlowButton>
          <GlowButton>BOOK A FREE TRIAL</GlowButton>
        </motion.div>

        <motion.div
          className="mt-14 flex flex-col items-center justify-center gap-5 text-white/30 md:flex-row md:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.35 }}
        >
          <a href="tel:+919876543210" className="font-mono text-xs tracking-[0.18em] transition-colors duration-300 hover:text-[#b347ff]" data-cursor-hover>
            +91 98765 43210
          </a>
          <span className="hidden h-4 w-px bg-white/10 md:block" />
          <a href="mailto:dance@cipher.studio" className="font-mono text-xs tracking-[0.18em] transition-colors duration-300 hover:text-[#b347ff]" data-cursor-hover>
            dance@cipher.studio
          </a>
          <span className="hidden h-4 w-px bg-white/10 md:block" />
          <span className="font-mono text-xs tracking-[0.18em]">Bandra West, Mumbai</span>
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto mt-20 max-w-6xl border-t border-white/5 px-5 pt-8 sm:px-6 md:mt-24">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#b347ff] to-[#00d4ff]" />
            <span className="font-display text-lg tracking-[0.2em]">CIPHER</span>
          </div>
          <p className="text-center font-mono text-[10px] tracking-[0.18em] text-white/25">
            2026 CIPHER DANCE STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            {['IG', 'TW', 'YT', 'TK'].map((social) => (
              <a key={social} href="#home" className="font-mono text-[10px] tracking-[0.2em] text-white/30 transition-colors duration-300 hover:text-[#b347ff]" data-cursor-hover>
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
