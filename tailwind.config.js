import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/*.html"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ["Inter", "Nunito", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
        'serif': ["Montserrat", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
      },
      colors: {
        gray: colors.slate,
        primary: colors.cyan,
      },
    },
  },
  plugins: [],
}

