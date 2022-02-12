module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./modules/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'logo-allerta-stencil': ['"Allerta Stencil"', 'sans-serif'],
        'logo-pacifico' : [' "Pacifico"','sans-serif'],
        'open-sans': [' "Open Sans"','sans-serif'],
      },
      colors: {
        'fitify-black': '#352E39',
        'fitify-green':'#198C8C',
        'fitify-green-light':'#d1e8e8',
        'fitify-purple' : '#6E6FB3',
        'fitify-gray' : '#8B8B8B'
      },
      width: {
        '100': '15rem',
      },
      height:{
        '100' : '26rem'
      },
      padding:{
        '3.2':'0.85rem'
      },
      screens:{
        'custom' : '975px'
      }
    }
  },
  plugins: [],
}
