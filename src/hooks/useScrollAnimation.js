import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../animations/gsapConfig'

export function useScrollAnimation(options = {}) {
  const {
    trigger,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = 1.2,
    toggleActions = 'play none none reverse',
    once = true,
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
  } = options

  const elementRef = useRef(null)
  const ctxRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    const triggerElement = trigger || element
    if (!element || !triggerElement) return

    ctxRef.current = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start,
          end,
          scrub,
          toggleActions,
          once,
          onEnter: onEnter ? () => onEnter(element) : undefined,
          onLeave: onLeave ? () => onLeave(element) : undefined,
          onEnterBack: onEnterBack ? () => onEnterBack(element) : undefined,
          onLeaveBack: onLeaveBack ? () => onLeaveBack(element) : undefined,
          // Performance optimizations
          anticipatePin: 1,
          fastScrollEnd: 0.5,
        }
      })

      return tl
    }, element)

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert()
      }
    }
  }, [trigger, start, end, scrub, toggleActions, once, onEnter, onLeave, onEnterBack, onLeaveBack])

  return [elementRef, ctxRef]
}

export function useParallax(ref, intensity = 1, options = {}) {
  const {
    start = 'top bottom',
    end = 'bottom top',
    scrub = 1,
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: -intensity * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub,
          // Performance
          anticipatePin: 0.5,
        }
      })
    }, element)

    return () => ctx.revert()
  }, [ref, intensity, start, end, scrub])
}

export function useRevealAnimation(ref, options = {}) {
  const {
    delay = 0,
    duration = 1,
    ease = 'power3.out',
    from = { y: 60, opacity: 0 },
    to = { y: 0, opacity: 1 },
    start = 'top 80%',
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const ctx = gsap.context(() => {
      gsap.fromTo(element, from, {
        ...to,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: element,
          start,
          toggleActions: 'play none none reverse',
          once: true,
        }
      })
    }, element)

    return () => ctx.revert()
  }, [ref, delay, duration, ease, from, to, start])
}