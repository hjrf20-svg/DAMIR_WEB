import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        damir: {
          50:  '#faf7f2',
          100: '#f3ece0',
          200: '#e5d5bc',
          300: '#d4b891',
          400: '#c09a68',
          500: '#b08050',
          600: '#8B6340',
          700: '#6b4d32',
          800: '#5C4A1E',
          900: '#3d2e14',
          950: '#1f1709',
        },
        sage: {
          50:  '#f4f7f4',
          100: '#e4ece4',
          200: '#c9d9c9',
          300: '#a3bda3',
          400: '#76997a',
          500: '#5a7d5e',
          600: '#4A6B4E',
          700: '#3d5940',
          800: '#334836',
          900: '#2b3d2e',
          950: '#152018',
        },
        cream: {
          50:  '#FAF7F2',
          100: '#F5F0E8',
          200: '#EDE5D5',
          300: '#E0D4BC',
          400: '#CFC0A0',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-damir': 'linear-gradient(135deg, #5C4A1E 0%, #8B6340 50%, #6B8E6B 100%)',
        'gradient-hero': 'linear-gradient(to bottom, rgba(92,74,30,0.3), rgba(92,74,30,0.7))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'damir': '0 4px 20px rgba(92, 74, 30, 0.15)',
        'damir-lg': '0 8px 40px rgba(92, 74, 30, 0.2)',
        'card': '0 2px 12px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}

export default config
