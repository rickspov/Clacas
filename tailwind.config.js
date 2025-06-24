/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'slate-gray': '#7D8D9E',
        'reseda-green': '#748574',
        'battleship-gray': '#7F7F6F',
        'battleship-gray-2': '#858F89',
        'jet': '#383633',
        lavender: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        beige: {
          50: '#fdfbf7',
          100: '#faf6ed',
          200: '#f5ecd8',
          300: '#eeddb8',
          400: '#e4c98a',
          500: '#d9b55c',
          600: '#c9a03d',
          700: '#a8832f',
          800: '#87682a',
          900: '#6f5526',
        },
        olive: {
          50: '#f6f7f3',
          100: '#ecefe6',
          200: '#d9e0cc',
          300: '#bcc8a3',
          400: '#9aac7a',
          500: '#7a9055',
          600: '#5f7340',
          700: '#4a5a33',
          800: '#3d492c',
          900: '#333d27',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-soft': 'linear-gradient(180deg, #7D8D9E 0%, #748574 25%, #7F7F6F 50%, #858F89 75%, #383633 100%)',
      },
    },
  },
  plugins: [],
} 