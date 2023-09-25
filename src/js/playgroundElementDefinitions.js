export const sections = {
  playground: {
    path: new URL('../Sections/playground.html', import.meta.url),
    properties: {
      section: 'playground',
    },
  },
};

export const components = {
  process1: {
    html: {
      code: new URL('../Components/process1.html', import.meta.url),
      properties: {
        selector: 'process-1',
      },
    },
    js: {},
  },
};
