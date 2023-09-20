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
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}

