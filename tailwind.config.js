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
        'text-secondary' :'var(--text-secondary)'
      } , 
      fontFamily:{
        inter:["Inconsolata", 'monospace']
      }
    },
  },
  plugins: [],
}

