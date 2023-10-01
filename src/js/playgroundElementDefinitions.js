// import fs from 'fs';
// import path from 'path';

export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: ['testimonials1'],
  },
};

export const components = {
  testimonials1: {
    html: {
      code: new URL('../Components/testimonials1.html', import.meta.url),
      properties: {
        selector: 'testimonials-1',
      },
    },
    js: {},
  },
};
