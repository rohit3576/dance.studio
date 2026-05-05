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
      const { x: cursorX, y: cursorY } = cursorPosRef.current
      const { x: followerX, y: followerY } = followerPosRef.current

      // Cursor follows instantly
      cursorPosRef.current = { x: mouseX - 6, y: mouseY - 6 }
      cursorRef.current.style.transform = `translate3d(${cursorPosRef.current.x}px, ${cursorPosRef.current.y}px, 0)`

      // Follower follows with lerp for smooth delay
      const lerpFactor = 0.1
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
      if (target && followerRef.current) {
        followerRef.current.style.width = '60px'
        followerRef.current.style.height = '60px'
        followerRef.current.style.borderColor = 'rgba(179, 71, 255, 0.8)'
        followerRef.current.style.backgroundColor = 'rgba(179, 71, 255, 0.1)'
      }
    }

    const handleMouseLeave = (e) => {
      if (!(e.target instanceof Element)) return
      const target = e.target.closest('a, button, [data-cursor-hover]')
      if (target && followerRef.current) {
        followerRef.current.style.width = '40px'
        followerRef.current.style.height = '40px'
        followerRef.current.style.borderColor = 'rgba(179, 71, 255, 0.4)'
        followerRef.current.style.backgroundColor = 'transparent'
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
