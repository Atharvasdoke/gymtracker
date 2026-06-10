/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      colors: {
        background: '#09090b', // zinc-950
        surface: '#18181b', // zinc-900
        primary: '#06b6d4', // cyan-500
        primaryHover: '#0891b2', // cyan-600
        textMain: '#fafafa', // zinc-50
        textMuted: '#a1a1aa', // zinc-400
      }
    },
  },
  plugins: [],
}
