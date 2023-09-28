import fs from 'fs';
import path from 'path';

export const sections = {
  playground: {
    properties: {
      section: 'playground',
    },
    components: ['header6'],
  },
};

export const components = {
  header6: {
    html: {
      code: new URL('../Components/header6.html', import.meta.url),
      properties: {
        selector: 'header-6',
      },
    },
    js: {
      code: fs.readFileSync(
        path.join(__dirname, '/Components/headerMegaMenu.js'),
        'utf8',
      ),
      properties: {
        selector: 'header-6',
      },
    },
  },
};
