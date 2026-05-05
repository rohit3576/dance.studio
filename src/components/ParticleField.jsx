import React, { useEffect, useRef, useCallback } from 'react'

const getParticleCount = () => {
  if (window.matchMedia('(max-width: 640px)').matches) return 18
  if (window.matchMedia('(max-width: 1024px)').matches) return 30
  return 44
}
const COLORS = ['#b347ff', '#00d4ff', '#ff2d9b']

export default function ParticleField() {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])
  const canvasSizeRef = useRef({ w: 0, h: 0 })

  const createParticle = useCallback((w, h) => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.2, // Slower movement
    dy: (Math.random() - 0.5) * 0.2,
    opacity: Math.random() * 0.5 + 0.1,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let { w, h } = canvasSizeRef.current

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      canvasSizeRef.current = { w, h }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      
      particlesRef.current.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0')
        ctx.fill()

        // Update position
        p.x += p.dx
        p.y += p.dy

        // Wrap around edges
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    // Handle resize with debounce
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        resize()
        particlesRef.current = Array.from({ length: getParticleCount() }, () => 
          createParticle(w, h)
        )
      }, 100)
    }

    resize()
    particlesRef.current = Array.from({ length: getParticleCount() }, () => 
      createParticle(w, h)
    )
    draw()
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [createParticle])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ opacity: 0.5 }}
    />
  )
}
