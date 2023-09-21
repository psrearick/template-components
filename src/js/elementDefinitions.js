import fs from "fs";
import path from "path";

export const sectionNames = {
  'headers': new URL('../Sections/headers.html', import.meta.url),
  'hero': new URL('../Sections/hero.html', import.meta.url),
  'text': new URL('../Sections/text.html', import.meta.url),
  'services': new URL('../Sections/services.html', import.meta.url),
  'contact': new URL('../Sections/contact.html', import.meta.url),
};

export const componentNames = {
  'header1': new URL('../Components/header1.html', import.meta.url),
  'header2': new URL('../Components/header2.html', import.meta.url),
  'header3': new URL('../Components/header3.html', import.meta.url),
  'hero1': new URL('../Components/hero1.html', import.meta.url),
  'text1': new URL('../Components/text1.html', import.meta.url),
  'text2': new URL('../Components/text2.html', import.meta.url),
  'services1': new URL('../Components/services1.html', import.meta.url),
  'contact1': new URL('../Components/contact1.html', import.meta.url),
};

export const componentJS = {
  'header1': fs.readFileSync(path.join(__dirname, '/Components/header1.js'), "utf8"),
  'header2': fs.readFileSync(path.join(__dirname, '/Components/header2.js'), "utf8"),
  'header3': fs.readFileSync(path.join(__dirname, '/Components/header3.js'), "utf8"),
};
