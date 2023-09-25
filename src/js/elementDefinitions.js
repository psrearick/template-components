import fs from 'fs';
import path from 'path';

export const sections = {
  playground: {
    path: new URL('../Sections/playground.html', import.meta.url),
    properties: {
      section: 'playground',
    },
  },
  headers: {
    path: new URL('../Sections/headers.html', import.meta.url),
    properties: {
      section: 'headers',
    },
  },
  hero: {
    path: new URL('../Sections/hero.html', import.meta.url),
    properties: {
      section: 'hero',
    },
  },
  about: {
    path: new URL('../Sections/about.html', import.meta.url),
    properties: {
      section: 'about',
    },
  },
  text: {
    path: new URL('../Sections/text.html', import.meta.url),
    properties: {
      section: 'text',
    },
  },
  services: {
    path: new URL('../Sections/services.html', import.meta.url),
    properties: {
      section: 'services',
    },
  },
  process: {
    path: new URL('../Sections/process.html', import.meta.url),
    properties: {
      section: 'process',
    },
  },
  contact: {
    path: new URL('../Sections/contact.html', import.meta.url),
    properties: {
      section: 'contact',
    },
  },
  faq: {
    path: new URL('../Sections/faq.html', import.meta.url),
    properties: {
      section: 'faq',
    },
  },
  footers: {
    path: new URL('../Sections/footers.html', import.meta.url),
    properties: {
      section: 'footers',
    },
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
};
