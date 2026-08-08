/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/app.html', './src/**/*.svelte'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
