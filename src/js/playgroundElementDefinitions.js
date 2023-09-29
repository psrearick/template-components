export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: ['about2'],
  },
};

export const components = {
  about2: {
    html: {
      code: new URL('../Components/about2.html', import.meta.url),
      properties: {
        selector: 'about-2',
      },
    },
    js: {},
  },
};
