/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        maroon: { DEFAULT: "#6E1423", deep: "#4A0B16", ink: "#2E060D", soft: "#8C2A38" },
        gold: { DEFAULT: "#B8893B", light: "#D9B56C", pale: "#EBD7A6", deep: "#8A6424" },
        ivory: "#FBF6EC",
        cream: { DEFAULT: "#F3E7D0", deep: "#E8D6B4" },
        temple: { DEFAULT: "#1F4A37", deep: "#12301F", soft: "#2E6149" },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        royal: ['"Cinzel"', "Georgia", "serif"],
        script: ['"Pinyon Script"', "cursive"],
        telugu: ['"Noto Serif Telugu"', "serif"],
        sans: ['"Jost"', "system-ui", "sans-serif"],
      },
      letterSpacing: { regal: "0.28em" },
    },
  },
  plugins: [],
};
