// import fs from 'fs';
// import path from 'path';

export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: ['about4'],
  },
};

export const components = {
  about4: {
    html: {
      code: new URL('../Components/about4.html', import.meta.url),
      properties: {
        selector: 'about-4',
      },
    },
    js: {},
  },
};
