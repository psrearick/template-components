// import fs from 'fs';
// import path from 'path';

export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: ['process2'],
  },
};

export const components = {
  process2: {
    html: {
      code: new URL('../Components/process2.html', import.meta.url),
      properties: {
        selector: 'process-2',
      },
    },
    js: {},
  },
};
