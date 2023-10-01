import fs from 'fs';
import path from 'path';

export const sections = {
  headers: {
    properties: {
      section: 'headers',
    },
    components: [
      'header1',
      'header2',
      'header3',
      'header4',
      'header5',
      'header6',
      'header7',
    ],
  },
  hero: {
    properties: {
      section: 'hero',
    },
    components: ['hero1', 'hero2', 'hero3', 'hero4', 'hero5'],
  },
  about: {
    properties: {
      section: 'about',
    },
    components: ['about1', 'about2', 'about3', 'about4'],
  },
  text: {
    properties: {
      section: 'text',
    },
    components: ['text1', 'text2', 'text3', 'text4'],
  },
  services: {
    properties: {
      section: 'services',
    },
    components: ['services1', 'services2', 'services3', 'services4'],
  },
  process: {
    properties: {
      section: 'process',
    },
    components: ['process1'],
  },
  contact: {
    properties: {
      section: 'contact',
    },
    components: ['contact1', 'contact2', 'contact3'],
  },
  faq: {
    properties: {
      section: 'faq',
    },
    components: ['faq1'],
  },
  footers: {
    properties: {
      section: 'footers',
    },
    components: ['footer1'],
  },
  testimonials: {
    properties: {
      section: 'testimonials',
    },
    components: ['testimonials1'],
  },
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
  header4: {
    html: {
      code: new URL('../Components/header4.html', import.meta.url),
      properties: {
        selector: 'header-4',
      },
    },
    js: {
      code: fs.readFileSync(
        path.join(__dirname, '/Components/header.js'),
        'utf8',
      ),
      properties: {
        selector: 'header-4',
      },
    },
  },
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
  header7: {
    html: {
      code: new URL('../Components/header7.html', import.meta.url),
      properties: {
        selector: 'header-7',
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
  hero1: {
    html: {
      code: new URL('../Components/hero1.html', import.meta.url),
      properties: {
        selector: 'hero-1',
      },
    },
    js: {},
  },
  hero2: {
    html: {
      code: new URL('../Components/hero2.html', import.meta.url),
      properties: {
        selector: 'hero-2',
      },
    },
    js: {},
  },
  hero3: {
    html: {
      code: new URL('../Components/hero3.html', import.meta.url),
      properties: {
        selector: 'hero-3',
      },
    },
    js: {},
  },
  hero4: {
    html: {
      code: new URL('../Components/hero4.html', import.meta.url),
      properties: {
        selector: 'hero-4',
      },
    },
    js: {},
  },
  hero5: {
    html: {
      code: new URL('../Components/hero5.html', import.meta.url),
      properties: {
        selector: 'hero-5',
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
  contact2: {
    html: {
      code: new URL('../Components/contact2.html', import.meta.url),
      properties: {
        selector: 'contact-2',
      },
    },
    js: {},
  },
  contact3: {
    html: {
      code: new URL('../Components/contact3.html', import.meta.url),
      properties: {
        selector: 'contact-3',
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
        path.join(__dirname, '/Components/accordion.js'),
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
  text4: {
    html: {
      code: new URL('../Components/text4.html', import.meta.url),
      properties: {
        selector: 'text-4',
      },
    },
    js: {},
  },
  services2: {
    html: {
      code: new URL('../Components/services2.html', import.meta.url),
      properties: {
        selector: 'services-2',
      },
    },
    js: {},
  },
  services3: {
    html: {
      code: new URL('../Components/services3.html', import.meta.url),
      properties: {
        selector: 'services-3',
      },
    },
    js: {
      code: fs.readFileSync(
        path.join(__dirname, '/Components/accordion.js'),
        'utf8',
      ),
      properties: {
        selector: 'services-3',
      },
    },
  },
  services4: {
    html: {
      code: new URL('../Components/services4.html', import.meta.url),
      properties: {
        selector: 'services-4',
      },
    },
    js: {},
  },
  process1: {
    html: {
      code: new URL('../Components/process1.html', import.meta.url),
      properties: {
        selector: 'process-1',
      },
    },
    js: {},
  },
  about1: {
    html: {
      code: new URL('../Components/about1.html', import.meta.url),
      properties: {
        selector: 'about-1',
      },
    },
    js: {},
  },
  about2: {
    html: {
      code: new URL('../Components/about2.html', import.meta.url),
      properties: {
        selector: 'about-2',
      },
    },
    js: {},
  },
  about3: {
    html: {
      code: new URL('../Components/about3.html', import.meta.url),
      properties: {
        selector: 'about-3',
      },
    },
    js: {},
  },
  about4: {
    html: {
      code: new URL('../Components/about4.html', import.meta.url),
      properties: {
        selector: 'about-4',
      },
    },
    js: {},
  },
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
