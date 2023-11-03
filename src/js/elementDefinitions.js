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
    components: ['hero1', 'hero2', 'hero3', 'hero4', 'hero5', 'hero6', 'hero7'],
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
    components: ['text1', 'text2', 'text3', 'text4', 'text5', 'text6'],
  },
  services: {
    properties: {
      section: 'services',
    },
    components: [
      'services1',
      'services2',
      'services3',
      'services4',
      'services5',
    ],
  },
  pricing: {
    properties: {
      section: 'pricing',
    },
    components: ['pricing1'],
  },
  process: {
    properties: {
      section: 'process',
    },
    components: ['process1', 'process2'],
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
    components: ['footer1', 'footer2'],
  },
  testimonials: {
    properties: {
      section: 'testimonials',
    },
    components: ['testimonials1'],
  },
  uiKit: {
    properties: {
      section: 'ui-kit',
    },
    components: ['buttons'],
  },
};

export const components = {
  // HEADERS
  header1: {
    html: {
      code: new URL('../Components/header1.html', import.meta.url),
      properties: {
        selector: 'header-1',
      },
      bodyDefinition: {
        hasBody: true,
        bodyClasses: [
          'min-h-[2000px]',
          'full',
          'bg-gray-100',
          'bg-stripes',
          'bg-stripes-primary-100',
        ],
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
      bodyDefinition: {
        hasBody: true,
        bodyClasses: [
          'min-h-[2000px]',
          'full',
          'bg-gray-100',
          'bg-stripes',
          'bg-stripes-primary-100',
        ],
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
      bodyDefinition: {
        hasBody: true,
        bodyClasses: [
          'min-h-[2000px]',
          'full',
          'bg-gray-100',
          'bg-stripes',
          'bg-stripes-primary-100',
        ],
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
      bodyDefinition: {
        hasBody: true,
        bodyClasses: [
          'min-h-[2000px]',
          'full',
          'bg-gray-800',
          'bg-stripes',
          'bg-stripes-primary-900',
        ],
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
      containerProperties: {
        minHeight: '768',
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
      bodyDefinition: {
        hasBody: true,
        bodyClasses: [
          'absolute',
          'full',
          'from-primary-200',
          'to-primary-50',
          'to-65%',
          'radial-gradient',
          'min-h-[600px]',
        ],
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
      containerProperties: {
        bgClass: 'bg-gray-700',
      },
      bodyDefinition: {
        hasBody: true,
        bodyClasses: [
          'min-h-[2000px]',
          'full',
          'bg-gray-800',
          'bg-stripes',
          'bg-stripes-primary-900',
        ],
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
  // HERO
  hero1: {
    html: {
      code: new URL('../Components/hero1.html', import.meta.url),
      properties: {
        selector: 'hero-1',
      },
      containerProperties: {
        minHeight: '768',
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
      containerProperties: {
        minHeight: '768',
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
      containerProperties: {
        minHeight: '768',
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
      containerProperties: {
        minHeight: '768',
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
      containerProperties: {
        minHeight: '800',
      },
    },
    js: {},
  },
  hero6: {
    html: {
      code: new URL('../Components/hero6.html', import.meta.url),
      properties: {
        selector: 'hero-6',
      },
      containerProperties: {
        minHeight: '768',
      },
    },
    js: {},
  },
  hero7: {
    html: {
      code: new URL('../Components/hero7.html', import.meta.url),
      properties: {
        selector: 'hero-7',
      },
      containerProperties: {
        minHeight: '768',
        bgClass: 'bg-black',
      },
    },
    js: {},
  },
  // ABOUT
  about1: {
    html: {
      code: new URL('../Components/about1.html', import.meta.url),
      properties: {
        selector: 'about-1',
      },
      containerProperties: {
        minHeight: '800',
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
      containerProperties: {
        minHeight: '1000',
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
      containerProperties: {
        minHeight: '768',
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
      containerProperties: {
        minHeight: '768',
      },
    },
    js: {},
  },
  // TEXT
  text1: {
    html: {
      code: new URL('../Components/text1.html', import.meta.url),
      properties: {
        selector: 'text-1',
      },
      containerProperties: {
        minHeight: '321',
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
      containerProperties: {
        minHeight: '400',
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
      containerProperties: {
        minHeight: '542',
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
      containerProperties: {
        minHeight: '676',
      },
    },
    js: {},
  },
  text5: {
    html: {
      code: new URL('../Components/text5.html', import.meta.url),
      properties: {
        selector: 'text-5',
      },
      containerProperties: {
        minHeight: '756',
      },
    },
    js: {},
  },
  text6: {
    html: {
      code: new URL('../Components/text6.html', import.meta.url),
      properties: {
        selector: 'text-6',
      },
      containerProperties: {
        minHeight: '404',
      },
    },
    js: {},
  },
  // PRICING
  pricing1: {
    html: {
      code: new URL('../Components/pricing1.html', import.meta.url),
      properties: {
        selector: 'pricing-1',
      },
      containerProperties: {
        minHeight: '620',
      },
    },
    js: {},
  },
  // SERVICES
  services1: {
    html: {
      code: new URL('../Components/services1.html', import.meta.url),
      properties: {
        selector: 'services-1',
      },
      containerProperties: {
        minHeight: '768',
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
      containerProperties: {
        minHeight: '768',
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
      containerProperties: {
        minHeight: '768',
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
      containerProperties: {
        minHeight: '768',
      },
    },
    js: {},
  },
  services5: {
    html: {
      code: new URL('../Components/services5.html', import.meta.url),
      properties: {
        selector: 'services-5',
      },
      containerProperties: {
        minHeight: '768',
      },
    },
    js: {},
  },
  // PROCESS
  process1: {
    html: {
      code: new URL('../Components/process1.html', import.meta.url),
      properties: {
        selector: 'process-1',
      },
      containerProperties: {
        minHeight: '768',
      },
    },
    js: {},
  },
  process2: {
    html: {
      code: new URL('../Components/process2.html', import.meta.url),
      properties: {
        selector: 'process-2',
      },
      containerProperties: {
        minHeight: '768',
      },
    },
    js: {},
  },
  // CONTACT
  contact1: {
    html: {
      code: new URL('../Components/contact1.html', import.meta.url),
      properties: {
        selector: 'contact-1',
      },
      containerProperties: {
        minHeight: '524',
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
      containerProperties: {
        minHeight: '492',
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
      containerProperties: {
        minHeight: '788',
      },
    },
    js: {},
  },
  // FAQ
  faq1: {
    html: {
      code: new URL('../Components/faq1.html', import.meta.url),
      properties: {
        selector: 'faq-1',
      },
      containerProperties: {
        minHeight: '768',
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
  // FOOTERS
  footer1: {
    html: {
      code: new URL('../Components/footer1.html', import.meta.url),
      properties: {
        selector: 'footer-1',
      },
      containerProperties: {
        minHeight: '364',
      },
    },
    js: {},
  },
  footer2: {
    html: {
      code: new URL('../Components/footer2.html', import.meta.url),
      properties: {
        selector: 'footer-2',
      },
      containerProperties: {
        minHeight: '406',
      },
    },
    js: {},
  },
  // TESTIMONIALS
  testimonials1: {
    html: {
      code: new URL('../Components/testimonials1.html', import.meta.url),
      properties: {
        selector: 'testimonials-1',
      },
      containerProperties: {
        minHeight: '768',
      },
    },
    js: {},
  },
  // UI Kit
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
