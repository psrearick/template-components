// import fs from 'fs';
// import path from 'path';

export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: ['hero5'],
  },
};

export const components = {
  hero5: {
    html: {
      code: new URL('../Components/hero5.html', import.meta.url),
      properties: {
        selector: 'hero-5',
      },
    },
    js: {},
  },
};
