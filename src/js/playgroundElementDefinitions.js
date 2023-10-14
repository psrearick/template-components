import fs from 'fs';
import path from 'path';

export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: ['header7'],
  },
};

export const components = {
  header7: {
    html: {
      code: new URL('../Components/header7.html', import.meta.url),
      properties: {
        selector: 'header-7',
      },
      containerProperties: {
        bgClass: 'bg-gray-700',
      },
    },
    js: {
      code: fs.readFileSync(
        path.join(__dirname, '/Components/header.js'),
        'utf8',
      ),
      properties: {
        selector: 'header-7',
      },
    },
  },
};
