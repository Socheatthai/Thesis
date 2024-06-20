/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#000080',
        darkBlue: '#000066',
        lightpink: '#FFB6C1',
        pink: '#FF69B4',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}


