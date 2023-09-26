import fs from 'fs';
import path from 'path';

export const sections = {
  playground: {
    path: new URL('../Sections/playground.html', import.meta.url),
    properties: {
      section: 'playground',
    },
  },
};

export const components = {
  header5: {
    html: {
      code: new URL('../Components/header5.html', import.meta.url),
      properties: {
        selector: 'header-5',
      },
    },
    js: {
      code: fs.readFileSync(
        path.join(__dirname, '/Components/header.js'),
        'utf8',
      ),
      properties: {
        selector: 'header-5',
      },
    },
  },
};
