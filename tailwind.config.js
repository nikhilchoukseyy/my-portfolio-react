/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors :{
        'bg-primary' : 'var(--bg-primary)',
        'text-primary' : 'var(--text-primary)', 
        'bg-secondary': 'var(--bg-secondary)', 
        'bg-buttons' : 'var(--bg-buttons)' , 
        'text-secondary' :'var(--text-secondary)',
        'bg-tertiary' : 'var(--bg-tertiary)',
        'text-tertiary': 'var(--text-tertiary)', 
        'bg-buttons2': 'var(--bg-buttons2)'
      } , 
      fontFamily:{
        cursive:["Cedarville Cursive", 'cursive'], 
        handwritten:["Shadows Into Light", 'cursive'], 
        cavet : ["Caveat", 'cursive'],
        amatic:["Amatic SC", 'sans-serif']
      }
    },
  },
  plugins: [],
}

