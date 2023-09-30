// import fs from 'fs';
// import path from 'path';

export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: ['services4'],
  },
};

export const components = {
  services4: {
    html: {
      code: new URL('../Components/services4.html', import.meta.url),
      properties: {
        selector: 'services-4',
      },
    },
    js: {},
  },
};
