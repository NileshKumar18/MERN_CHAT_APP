/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
      dark: '#0A0A0F',
      neonCyan: '#00FFF0',
      neonPink: '#FF00E6',
      neonGreen: '#8FFF00',
      textLight: '#E0E0E0',
    },
    },
  },
  plugins: [],
}
