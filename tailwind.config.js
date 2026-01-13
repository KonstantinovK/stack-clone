// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#f8f9fa',
        black: '#131313',
        white: '#ffffff',
      },
      spacing: {
        'header-top-padding': '100px',
        'nav-height': '80px',
        'section-padding-desktop': '80px',
        'section-padding-tablet': '40px',
        'section-padding-mobile': '20px',
      },
    },
  },
  plugins: [],
}
