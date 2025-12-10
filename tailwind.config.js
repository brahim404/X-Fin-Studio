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
          50: '#e8eef5',
          100: '#c5d5e8',
          200: '#9eb9da',
          300: '#779dcc',
          400: '#5a88c1',
          500: '#3d73b6',
          600: '#325fa0',
          700: '#264a83',
          800: '#1a3666',
          900: '#0f2244',
          950: '#0a1628',
        },
        dark: {
          50: '#f5f6f8',
          100: '#e1e4e9',
          200: '#c4c9d4',
          300: '#9aa3b4',
          400: '#6b7689',
          500: '#4a5568',
          600: '#3d4556',
          700: '#2d3748',
          800: '#1a202c',
          900: '#0f1318',
          950: '#080a0d',
        },
        accent: {
          50: '#fee7e7',
          100: '#fcc8c8',
          200: '#f9a5a5',
          300: '#f47878',
          400: '#ec4b4b',
          500: '#dc2626',
          600: '#b91c1c',
          700: '#991b1b',
          800: '#7f1d1d',
          900: '#651a1a',
          950: '#450a0a',
        },
        steel: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-angular': 'linear-gradient(135deg, var(--tw-gradient-stops))',
        'gradient-diagonal': 'linear-gradient(45deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
