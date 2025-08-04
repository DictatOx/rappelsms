/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      colors: {
        primary: {
          DEFAULT: "#0d9488",
          50:  "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        accent: { DEFAULT: "#f97316" },
        dark:   { DEFAULT: "#0f172a" },
      },

      /* ← ICI l’image hero */
      backgroundImage: {
        hero: "url('/hero-bg.jpg')", // image placée dans /public/hero-bg.jpg
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};