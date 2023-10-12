import colors from 'tailwindcss/colors';

const toRgba = (hexCode, opacity = 50) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity / 100})`;
};

const flattenColorPalette = (obj, sep = '-') =>
  Object.assign(
    {},
    ...(function _flatten(o, p = '') {
      return [].concat(
        ...Object.keys(o).map((k) =>
          typeof o[k] === 'object'
            ? _flatten(o[k], k + sep)
            : { [p + k]: o[k] },
        ),
      );
    })(obj),
  );

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
        // primary: colors.red,
        // secondary: colors.lime,
        // tertiary: colors.amber,
        gray: colors.slate,
        'gray-norm': colors.gray,

        // primary: colors.red,
        // secondary: colors.lime,
        // tertiary: colors.amber,

        // primary: colors.amber,
        // primary: colors.cyan,
        // secondary: colors.teal,
        // secondary: colors.cyan,
        // secondary: colors.violet,
        // tertiary: colors.fuchsia,

        primary: {
          950: '#000c0f',
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
          950: '#210200',
        },
        tertiary: {
          50: '#ffeee0',
          100: '#ffdcbe',
          200: '#ffb86f',
          300: '#eb993e',
          400: '#cb7f25',
          500: '#ac6605',
          600: '#8a5100',
          700: '#693c00',
          800: '#4a2800',
          900: '#2c1600',
          950: '#120900',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries'),
    function ({ addUtilities, theme }) {
      const utilities = {
        '.bg-stripes': {
          backgroundImage:
            'linear-gradient(45deg, var(--stripes-color) 12.50%, transparent 12.50%, transparent 50%, var(--stripes-color) 50%, var(--stripes-color) 62.50%, transparent 62.50%, transparent 100%)',
          backgroundSize: '10px 15px',
        },
      };

      const addColor = (name, color) =>
        (utilities[`.bg-stripes-${name}`] = { '--stripes-color': color });

      const colors = flattenColorPalette(theme('backgroundColor'));
      for (let name in colors) {
        try {
          const [r, g, b, a] = toRgba(colors[name]);
          if (a !== undefined) {
            addColor(name, colors[name]);
          } else {
            addColor(name, `rgba(${r}, ${g}, ${b}, 0.4)`);
          }
        } catch (_) {
          addColor(name, colors[name]);
        }
      }

      addUtilities(utilities);
    },
  ],
};
