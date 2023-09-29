export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: ['hero3'],
  },
};

export const components = {
  hero3: {
    html: {
      code: new URL('../Components/hero3.html', import.meta.url),
      properties: {
        selector: 'hero-3',
      },
    },
    js: {},
  },
};
