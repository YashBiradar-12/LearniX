import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Olive Green Palette - Primary
        olive: {
          50: '#F5F3EB',
          100: '#FAF9F5',
          150: '#EEECE2',
          200: '#DDDCCF',
          300: '#C9C6B8',
          400: '#B5B1A3',
          500: '#8B9A55',
          600: '#6B7D3A',
          700: '#4F5F2A',
          800: '#3F4A22',
          900: '#2F3618',
        },
        // Neutral palette
        neutral: {
          50: '#F9F7F4',
          100: '#F5F3EB',
          200: '#EEE9E0',
          300: '#E0DAD0',
          400: '#D4C5B9',
          500: '#C4B5A8',
          600: '#8B7B6B',
          700: '#6B5F54',
          800: '#50453A',
          900: '#30352A',
        },
        // Status colors
        accent: {
          sage: '#8B9A55',
          gold: '#9D8552',
          sky: '#7BA89E',
          clay: '#A88977',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(48, 53, 42, 0.08)',
        'sm-soft': '0 1px 3px rgba(48, 53, 42, 0.04)',
        'md-soft': '0 4px 12px rgba(48, 53, 42, 0.12)',
        'lg-soft': '0 8px 24px rgba(48, 53, 42, 0.15)',
      },
      spacing: {
        'xs': '0.5rem',
        'sm': '0.75rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
      },
    },
  },
  plugins: [],
} satisfies Config
