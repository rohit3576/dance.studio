/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      colors: {
        neon: {
          purple: '#b347ff',
          blue: '#00d4ff',
          pink: '#ff2d9b',
          green: '#00ff88',
        },
        dark: {
          900: '#020205',
          800: '#080810',
          700: '#0f0f1a',
          600: '#14141f',
          500: '#1a1a2e',
        }
      },
      transitionTimingFunction: {
        'expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-2': 'float 8s ease-in-out 1s infinite',
        'float-3': 'float 10s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'border-pulse': 'border-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-30px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.1)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.1, transform: 'scale(1)' },
          '50%': { opacity: 0.2, transform: 'scale(1.2)' },
        },
        'border-pulse': {
          '0%, 100%': { borderColor: 'rgba(179, 71, 255, 0.3)' },
          '50%': { borderColor: 'rgba(179, 71, 255, 0.8)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px #b347ff44' },
          '50%': { boxShadow: '0 0 40px #b347ff88' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        }
      }
    },
  },
  plugins: [],
}
