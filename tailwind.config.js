module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/slick-carousel/slick/slick-theme.css",
    "./node_modules/slick-carousel/slick/slick.css"
  ],
  corePlugins: {
    preflight: false,
  },
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
}