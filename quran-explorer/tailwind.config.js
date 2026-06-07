/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sandal: {
          50:  '#FAF5EF',
          100: '#F0E6D3',
          200: '#DFC9A8',
          500: '#B8935A',
          700: '#7A5C32',
          900: '#3D2B12',
        },
        'accent-green': '#2E7D5E',
        'accent-blue': '#2B5B8A',
      },
      fontFamily: {
        amiri: ['var(--font-amiri)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        lora: ['var(--font-lora)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        noto: ['var(--font-noto-malayalam)', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        shake: 'shake 0.3s ease-in-out',
      }
    },
  },
  plugins: [],
}
