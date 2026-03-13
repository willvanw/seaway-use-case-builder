import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        seaway: {
          pink: '#FF2D78',
          'pink-light': '#FF5C9A',
          'pink-dark': '#D91A60',
          black: '#0A0A0A',
          'gray-900': '#141414',
          'gray-800': '#1E1E1E',
          'gray-700': '#2A2A2A',
          'gray-600': '#3A3A3A',
          'gray-400': '#8A8A8A',
          'gray-300': '#AAAAAA',
          white: '#FAFAFA',
        }
      },
      fontFamily: {
        sans: ['Avenir Next', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'pulse-pink': 'pulsePink 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
        'progress-fill': 'progressFill 0.8s ease-out forwards',
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'particle': 'particle 3s ease-out infinite',
        'wave': 'wave 8s ease-in-out infinite',
        'score-fill': 'scoreFill 1s ease-out forwards',
        'dot-pulse': 'dotPulse 1.4s ease-in-out infinite',
        'orbit': 'orbit 3s linear infinite',
        'morph': 'morph 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(50px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        slideInLeft: { '0%': { opacity: '0', transform: 'translateX(-50px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { '0%': { opacity: '0', transform: 'scale(0.8)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        pulsePink: { '0%, 100%': { boxShadow: '0 0 20px rgba(255, 45, 120, 0.3)' }, '50%': { boxShadow: '0 0 40px rgba(255, 45, 120, 0.6)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
        progressFill: { '0%': { width: '0%' }, '100%': { width: 'var(--progress-width)' } },
        bounceIn: { '0%': { opacity: '0', transform: 'scale(0.3)' }, '50%': { transform: 'scale(1.05)' }, '70%': { transform: 'scale(0.95)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        glow: { '0%': { boxShadow: '0 0 5px rgba(255, 45, 120, 0.2), 0 0 20px rgba(255, 45, 120, 0.1)' }, '100%': { boxShadow: '0 0 20px rgba(255, 45, 120, 0.4), 0 0 60px rgba(255, 45, 120, 0.2)' } },
        particle: { '0%': { opacity: '1', transform: 'translateY(0) scale(1)' }, '100%': { opacity: '0', transform: 'translateY(-100px) scale(0)' } },
        wave: { '0%, 100%': { transform: 'translateX(0) translateY(0)' }, '25%': { transform: 'translateX(10px) translateY(-10px)' }, '50%': { transform: 'translateX(0) translateY(-20px)' }, '75%': { transform: 'translateX(-10px) translateY(-10px)' } },
        scoreFill: { '0%': { width: '0%', opacity: '0' }, '50%': { opacity: '1' }, '100%': { width: 'var(--score-width)', opacity: '1' } },
        dotPulse: { '0%, 80%, 100%': { transform: 'scale(0)', opacity: '0' }, '40%': { transform: 'scale(1)', opacity: '1' } },
        orbit: { '0%': { transform: 'rotate(0deg) translateX(40px) rotate(0deg)' }, '100%': { transform: 'rotate(360deg) translateX(40px) rotate(-360deg)' } },
        morph: { '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }, '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' } },
      }
    },
  },
  plugins: [],
}
export default config
