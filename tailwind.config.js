/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/app.html', './src/**/*.svelte'],
  theme: {
    extend: {
      colors: {
        ink: '#1a1025',
        panel: '#241733',
        edge: '#3d2a57',
        bright: '#e8e0f5',
        soft: '#c9bce0',
        muted: '#9d8bb8',
        faint: '#6d5d88',
        accent: '#b78aff',
      },
    },
  },
  plugins: [],
}
