import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './public/*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
      colors: {
        gray: colors.slate,
        'gray-norm': colors.gray,
        // primary: colors.cyan,
        // secondary: colors.violet,
        // tertiary: colors.fuchsia,
        primary: {
          900: '#001f26',
          800: '#003640',
          700: '#004e5c',
          600: '#00687a',
          500: '#008399',
          400: '#009eb9',
          300: '#1abbd9',
          200: '#4cd7f6',
          100: '#acedff',
          50: '#d8f6ff',
        },
        secondary: {
          50: '#ffede9',
          100: '#ffdad3',
          200: '#ffb4a5',
          300: '#ff8a73',
          400: '#fe5638',
          500: '#da3d22',
          600: '#b72309',
          700: '#8e1300',
          800: '#650a00',
          900: '#3f0400',
        },
        tertiary: {
          900: '#2c1600',
          800: '#4a2800',
          700: '#693c00',
          600: '#8a5100',
          500: '#ac6605',
          400: '#cb7f25',
          300: '#eb993e',
          200: '#ffb86f',
          100: '#ffdcbe',
          50: '#ffeee0',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/container-queries')],
};
