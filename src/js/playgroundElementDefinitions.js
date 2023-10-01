// import fs from 'fs';
// import path from 'path';

export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: ['hero6'],
  },
};

export const components = {
  hero6: {
    html: {
      code: new URL('../Components/hero6.html', import.meta.url),
      properties: {
        selector: 'hero-6',
      },
    },
    js: {},
  },
};
