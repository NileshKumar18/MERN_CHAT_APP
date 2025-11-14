/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-main": "linear-gradient(135deg, #7C3AED, #A78BFA)", // main purple gradient
        "gradient-bg": "linear-gradient(135deg, #2A273F, #1E1E2E)",   // dark background gradient
      },
      colors: {
        primary: "#7C3AED",
        secondary: "#A78BFA",
        background: "#1E1E2E",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
