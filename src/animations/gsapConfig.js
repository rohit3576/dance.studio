import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Optimize GSAP for performance
gsap.config({
  force3D: true,
  nullTargetWarn: false,
})

// Default ease configs
export const EASE_CINEMATIC = 'power3.out'
export const EASE_SMOOTH = 'power2.inOut'
export const EASE_SNAP = 'back.out(1.7)'
export const EASE_ELASTIC = 'elastic.out(1, 0.5)'

// Default scroll trigger config factory
export function createScrollTrigger(trigger, options = {}) {
  return {
    trigger,
    start: 'top 90%',
    end: 'bottom 10%',
    toggleActions: 'play none none reverse',
    anticipatePin: 1,
    fastScrollEnd: 0.5,
    ...options,
  }
}

// Scrub scroll trigger factory
export function createScrubTrigger(trigger, options = {}) {
  return {
    trigger,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.5,
    anticipatePin: 0.5,
    ...options,
  }
}

// Text reveal animation helper
export function animateTextReveal(element, options = {}) {
  const {
    splitBy = 'chars', // 'chars', 'words', 'lines'
    stagger = 0.03,
    duration = 0.8,
    ease = EASE_CINEMATIC,
    from = { y: '100%', opacity: 0 },
    to = { y: '0%', opacity: 1 },
  } = options

  if (!element) return null

  const text = element.textContent
  element.textContent = ''
  element.style.overflow = 'hidden'
  element.style.display = 'inline-block'

  if (splitBy === 'chars') {
    text.split('').forEach((char, i) => {
      const span = document.createElement('span')
      span.textContent = char === ' ' ? '\u00A0' : char
      span.style.display = 'inline-block'
      span.style.overflow = 'hidden'
      element.appendChild(span)

      gsap.fromTo(span, from, {
        ...to,
        duration,
        ease,
        delay: i * stagger,
      })
    })
  }

  return () => gsap.killTweensOf(element)
}

export { gsap, ScrollTrigger }