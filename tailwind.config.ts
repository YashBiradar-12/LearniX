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
        primary: {
          50: '#fdfaf0',
          100: '#f5f3eb',
          200: '#e8e3d7',
          300: '#d4c5b9',
          400: '#b8a89a',
          500: '#8b7b6b',
          600: '#6b5f4f',
          700: '#5f6e48',
          800: '#4a5639',
          900: '#3d4a2f',
        },
        gold: {
          50: '#fffbf0',
          100: '#fff5dd',
          200: '#ffe6b8',
          300: '#ffd699',
          400: '#d4a574',
          500: '#c49966',
          600: '#b8860b',
          700: '#a67c52',
          800: '#8b6914',
          900: '#6b540f',
        },
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
        'sm-soft': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
} satisfies Config
