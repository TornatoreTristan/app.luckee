/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.{edge,js,ts,vue,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Satoshi-Regular', 'sans-serif'],
      bold: ['Satoshi-Bold', 'sans-serif'],
    },
    fontSize: {
      '2xs': '0.625rem',
      'xs': '0.75rem',
      'sm': '0.775rem',
      'base': '1rem',
      'md': '1.125rem',
      'lg': '1.25rem',
      'xl': '1.5rem',
      '2xl': '2rem',
      '3xl': '2.5rem',
      '4xl': '3rem',
      '5xl': '3.5rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '8xl': '6rem',
      '9xl': '7rem',
    },
    extend: {
      colors: {
        primary: '#F27B50',
        secondary: '#F2B872',
        tertiary: '#F2CFC2',
        decor: '#F2F2F2',
        dark: '#0D0D0D',
      },
    },
  },
  plugins: [],
}
