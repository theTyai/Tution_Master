/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#4f8ef7', dark: '#3a7bf5' },
        purple:  { DEFAULT: '#8b5cf6', dark: '#7c3aed' },
        bg:      { DEFAULT: '#0a0e1a', secondary: '#0f1526', card: '#141c30' },
      },
      fontFamily: {
        sora:   ['Sora', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
      },
    },
  },
  plugins: [],
};
