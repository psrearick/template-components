export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: ['hero4'],
  },
};

export const components = {
  hero4: {
    html: {
      code: new URL('../Components/hero4.html', import.meta.url),
      properties: {
        selector: 'hero-4',
      },
    },
    js: {},
  },
};
