import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/*.html"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["Nunito", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
        'serif': ["Georgia", "Cambria", "Times New Roman", "Times", "serif"],
      },
      colors: {
        gray: colors.slate,
        primary: colors.cyan,
        // secondary: colors.violet,
        secondary: {
          50: '#FDEFEC',
          100: '#F9D1C8',
          200: '#F5B2A3',
          300: '#F1937E',
          400: '#ED755A',
          500: '#EE4B2E',
          600: '#DC3C18',
          700: '#A52D12',
          800: '#6E1E0C',
          900: '#260803',
        },
        tertiary: colors.fuchsia,
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

