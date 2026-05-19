/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0f0f1a",
        bg2: "#16162a",
        card: "#1e1e35",
        border_color: "#2a2a4a",
        primary: "#6c63ff",
        primary2: "#a78bfa",
        accent: "#10b981",
        text_color: "#e2e8f0",
        muted: "#8892a4",
        danger: "#ef4444",
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
