/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // Deep Blue
        secondary: "#3B82F6", // Bright Blue
        accent: "#F59E0B", // Golden Yellow
        background: "#F3F4F6", // Light Gray
        text: "#111827", // Dark Gray/Black
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

