import React from 'react'

// Dancer 1 - leaping pose
export function DancerLeap({ color = '#b347ff', opacity = 1, className = '' }) {
  return (
    <svg viewBox="0 0 120 220" className={className} style={{ opacity }}>
      {/* Head */}
      <circle cx="60" cy="22" r="14" fill={color} />
      {/* Body */}
      <path d="M60 36 Q55 70 45 90 Q35 110 30 130" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Arms leaping */}
      <path d="M55 55 Q30 35 15 20" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M58 60 Q85 40 105 30" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Legs split */}
      <path d="M45 90 Q20 120 10 150" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M45 90 Q70 120 90 145" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Glow */}
      <circle cx="60" cy="22" r="14" fill={color} opacity="0.2" filter="blur(8px)" />
    </svg>
  )
}

// Dancer 2 - spin pose
export function DancerSpin({ color = '#00d4ff', opacity = 1, className = '' }) {
  return (
    <svg viewBox="0 0 120 220" className={className} style={{ opacity }}>
      {/* Head */}
      <circle cx="60" cy="20" r="13" fill={color} />
      {/* Body curved */}
      <path d="M60 33 Q65 65 70 90 Q75 115 65 140" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Arms out wide */}
      <path d="M62 50 Q45 40 10 45" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M65 50 Q85 38 115 30" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Legs */}
      <path d="M65 140 Q55 165 50 195" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M65 140 Q80 160 100 175" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// Dancer 3 - crouched power pose
export function DancerPower({ color = '#ff2d9b', opacity = 1, className = '' }) {
  return (
    <svg viewBox="0 0 120 200" className={className} style={{ opacity }}>
      {/* Head tilted */}
      <circle cx="55" cy="22" r="14" fill={color} />
      {/* Body forward lean */}
      <path d="M55 36 Q52 60 48 80 Q44 100 40 120" stroke={color} strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* Arms power */}
      <path d="M50 55 Q25 45 5 55" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M52 58 Q75 55 95 40" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Legs crouched */}
      <path d="M40 120 Q25 145 20 170" stroke={color} strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M40 120 Q60 140 75 165" stroke={color} strokeWidth="7" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// Dancer 4 - arabesque
export function DancerArabesque({ color = '#00ff88', opacity = 1, className = '' }) {
  return (
    <svg viewBox="0 0 160 220" className={className} style={{ opacity }}>
      {/* Head */}
      <circle cx="50" cy="20" r="13" fill={color} />
      {/* Body upright */}
      <path d="M50 33 Q52 65 55 95 Q57 115 58 135" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Arms elegant */}
      <path d="M52 55 Q30 42 5 38" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M54 52 Q80 40 115 35" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Leg up arabesque */}
      <path d="M58 135 Q60 160 60 190" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M58 135 Q85 120 130 105" stroke={color} strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  )
}
