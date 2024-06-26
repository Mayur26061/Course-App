/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        350: '350px',
        500: '500px',
      },
      maxWidth: {
        600: '600px'
      }
    },
  },
  plugins: [],
}
