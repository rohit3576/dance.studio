import { useEffect, useRef, useState } from 'react'

export function useMouseParallax(intensity = 0.02) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const roomyViewport = window.matchMedia('(min-width: 768px)').matches

    if (reduceMotion || !finePointer || !roomyViewport) {
      setMousePosition({ x: 0, y: 0 })
      return
    }

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }

      if (rafRef.current) return

      rafRef.current = requestAnimationFrame(animate)
    }

    const animate = () => {
      rafRef.current = null
      setMousePosition({
        x: mouseRef.current.x * intensity,
        y: mouseRef.current.y * intensity,
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [intensity])

  return mousePosition
}

export function useMouseGlow(intensity = 0.15) {
  const [glowPosition, setGlowPosition] = useState({ x: '50%', y: '50%' })
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!finePointer) return

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      }
    }

    const animate = () => {
      setGlowPosition({
        x: `${mouseRef.current.x}px`,
        y: `${mouseRef.current.y}px`,
      })
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return {
    ...glowPosition,
    opacity: intensity,
  }
}
