// import fs from 'fs';
// import path from 'path';

export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: ['buttons'],
  },
};

export const components = {
  buttons: {
    html: {
      code: new URL('../Components/buttons1.html', import.meta.url),
      properties: {
        selector: 'buttons-1',
      },
      containerProperties: {
        minHeight: '400',
      },
    },
    js: {},
  },
};
