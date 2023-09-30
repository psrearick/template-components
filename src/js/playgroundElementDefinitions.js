// import fs from 'fs';
// import path from 'path';

export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: ['about3'],
  },
};

export const components = {
  about3: {
    html: {
      code: new URL('../Components/about3.html', import.meta.url),
      properties: {
        selector: 'about-3',
      },
    },
    js: {},
  },
};
