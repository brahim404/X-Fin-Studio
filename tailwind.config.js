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
          50: '#e6fbff',
          100: '#b3f3ff',
          200: '#80ebff',
          300: '#4de3ff',
          400: '#1adbff',
          500: '#00d4ff',
          600: '#00a8cc',
          700: '#007d99',
          800: '#005266',
          900: '#002933',
          950: '#001419',
        },
        dark: {
          50: '#f5f6f8',
          100: '#e1e4e9',
          200: '#c4c9d4',
          300: '#9aa3b4',
          400: '#6b7689',
          500: '#4a5568',
          600: '#3d4556',
          700: '#252a35',
          800: '#181c24',
          900: '#0d1017',
          950: '#06080b',
        },
        accent: {
          50: '#ffe6ec',
          100: '#ffb3c4',
          200: '#ff809c',
          300: '#ff4d74',
          400: '#ff1a4c',
          500: '#ff0040',
          600: '#cc0033',
          700: '#990026',
          800: '#66001a',
          900: '#33000d',
          950: '#1a0006',
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
        neon: {
          cyan: '#00d4ff',
          magenta: '#ff0040',
          purple: '#bf00ff',
          green: '#00ff88',
        },
      },
      fontFamily: {
        sans: ['Rajdhani', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Orbitron', 'Rajdhani', 'sans-serif'],
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
