/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0f9',
          100: '#cce1f3',
          200: '#99c3e7',
          300: '#66a5db',
          400: '#3387cf',
          500: '#2b6cb0',
          600: '#1a5691',
          700: '#1a365d',
          800: '#132849',
          900: '#0d1a35',
        },
        accent: {
          50: '#e6f9f0',
          100: '#ccf3e1',
          200: '#99e7c3',
          300: '#66dba5',
          400: '#33cf87',
          500: '#00c36a',
          600: '#00a35c',
          700: '#00874e',
          800: '#006b40',
          900: '#004f32',
        },
      },
    },
  },
  plugins: [],
}
