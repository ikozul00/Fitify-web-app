module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./modules/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'allerta-stencil': ['"Allerta Stencil"', 'sans-serif'],
        'gloria-hallelujah': [' "Gloria Hallelujah"','sans-serif']
      },
      colors: {
        'fitify-black': '#352E39',
        'fitify-green':'#198C8C'
      },
      width: {
        '100': '15rem',
      }
    }
  },
  plugins: [],
}
