import { useEffect, useRef } from 'react'

export function useCustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)
  const rafRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const cursorPosRef = useRef({ x: 0, y: 0 })
  const followerPosRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!finePointer) {
      document.body.classList.add('native-cursor')
      return () => document.body.classList.remove('native-cursor')
    }

    cursorRef.current = document.querySelector('.cursor')
    followerRef.current = document.querySelector('.cursor-follower')

    if (!cursorRef.current || !followerRef.current) return

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      const { x: mouseX, y: mouseY } = mouseRef.current
      const { x: followerX, y: followerY } = followerPosRef.current

      // Cursor follows instantly
      cursorPosRef.current = { x: mouseX - 4, y: mouseY - 4 }
      cursorRef.current.style.transform = `translate3d(${cursorPosRef.current.x}px, ${cursorPosRef.current.y}px, 0)`

      // Follower follows with lerp for smooth delay
      const lerpFactor = 0.08
      followerPosRef.current = {
        x: followerX + (mouseX - followerX) * lerpFactor,
        y: followerY + (mouseY - followerY) * lerpFactor,
      }
      followerRef.current.style.transform = `translate3d(${followerPosRef.current.x - 20}px, ${followerPosRef.current.y - 20}px, 0)`

      rafRef.current = requestAnimationFrame(animate)
    }

    // Handle hover states for interactive elements
    const handleMouseEnter = (e) => {
      if (!(e.target instanceof Element)) return
      const target = e.target.closest('a, button, [data-cursor-hover]')
      if (target) {
        document.body.classList.add('cursor-hover')
      }
    }

    const handleMouseLeave = (e) => {
      if (!(e.target instanceof Element)) return
      const target = e.target.closest('a, button, [data-cursor-hover]')
      if (target) {
        document.body.classList.remove('cursor-hover')
      }
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])
}
