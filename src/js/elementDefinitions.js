import fs from 'fs';
import path from 'path';

export const sections = {
  headers: new URL('../Sections/headers.html', import.meta.url),
  footers: new URL('../Sections/footers.html', import.meta.url),
  hero: new URL('../Sections/hero.html', import.meta.url),
  text: new URL('../Sections/text.html', import.meta.url),
  services: new URL('../Sections/services.html', import.meta.url),
  contact: new URL('../Sections/contact.html', import.meta.url),
  faq: new URL('../Sections/faq.html', import.meta.url),
};

export const components = {
  header1: {
    html: {
      code: new URL('../Components/header1.html', import.meta.url),
      properties: {
        selector: 'header-1',
      },
    },
    js: {
      code: fs.readFileSync(
        path.join(__dirname, '/Components/header.js'),
        'utf8',
      ),
      properties: {
        selector: 'header-1',
      },
    },
  },
  header2: {
    html: {
      code: new URL('../Components/header2.html', import.meta.url),
      properties: {
        selector: 'header-2',
      },
    },
    js: {
      code: fs.readFileSync(
        path.join(__dirname, '/Components/header.js'),
        'utf8',
      ),
      properties: {
        selector: 'header-2',
      },
    },
  },
  header3: {
    html: {
      code: new URL('../Components/header3.html', import.meta.url),
      properties: {
        selector: 'header-3',
      },
    },
    js: {
      code: fs.readFileSync(
        path.join(__dirname, '/Components/header.js'),
        'utf8',
      ),
      properties: {
        selector: 'header-3',
      },
    },
  },
  hero1: {
    html: {
      code: new URL('../Components/hero1.html', import.meta.url),
      properties: {
        selector: 'hero-1',
      },
    },
    js: {},
  },
  text1: {
    html: {
      code: new URL('../Components/text1.html', import.meta.url),
      properties: {
        selector: 'text-1',
      },
    },
    js: {},
  },
  text2: {
    html: {
      code: new URL('../Components/text2.html', import.meta.url),
      properties: {
        selector: 'text-2',
      },
    },
    js: {},
  },
  services1: {
    html: {
      code: new URL('../Components/services1.html', import.meta.url),
      properties: {
        selector: 'services-1',
      },
    },
    js: {},
  },
  contact1: {
    html: {
      code: new URL('../Components/contact1.html', import.meta.url),
      properties: {
        selector: 'contact-1',
      },
    },
    js: {},
  },
  faq1: {
    html: {
      code: new URL('../Components/faq1.html', import.meta.url),
      properties: {
        selector: 'faq-1',
      },
    },
    js: {
      code: fs.readFileSync(
        path.join(__dirname, '/Components/faq1.js'),
        'utf8',
      ),
      properties: {
        selector: 'faq-1',
      },
    },
  },
  footer1: {
    html: {
      code: new URL('../Components/footer1.html', import.meta.url),
      properties: {
        selector: 'footer-1',
      },
    },
    js: {},
  },
  text3: {
    html: {
      code: new URL('../Components/text3.html', import.meta.url),
      properties: {
        selector: 'text-3',
      },
    },
    js: {},
  },
};
