// import fs from 'fs';
// import path from 'path';

export const components = {
  buttons: {
    html: {
      code: new URL('../Components/hero7.html', import.meta.url),
      properties: {
        selector: 'hero-7',
      },
      containerProperties: {
        minHeight: '768',
        bgClass: 'bg-black',
      },
    },
    js: {},
  },
};

export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: Object.keys(components),
  },
};
