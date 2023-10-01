// import fs from 'fs';
// import path from 'path';

export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: ['services5'],
  },
};

export const components = {
  services5: {
    html: {
      code: new URL('../Components/services5.html', import.meta.url),
      properties: {
        selector: 'services-5',
      },
    },
    js: {},
  },
};
