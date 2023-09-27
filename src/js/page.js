import ComponentGenerator from './componentGenerator';
import WindowResizer from './windowResizer';
import fs from 'fs';
import path from 'path';
import { loadBuildPanel } from './buildPanel';

export default class Page {
  listeners = [];

  constructor(config) {
    this.generator = new ComponentGenerator(this, config.definitions);
    this.resizer = new WindowResizer();
    this.eventBus = config.eventBus;

    this.loadNavbar();
    loadBuildPanel();
    this.registerListeners();
  }

  addListener = (listener, target, all = false, type = 'click') => {
    const targets = all
      ? document.querySelectorAll(target)
      : [document.querySelector(target)];

    targets.forEach((targetElement) => {
      targetElement.addEventListener(type, listener);
      this.listeners.push({
        element: targetElement,
        type: type,
        value: listener,
      });
    });
  };

  addListeners = () => {
    this.addListener(this.toggleAllSections, '#toggle-sections-button');
  };

  loadNavbar = () => {
    const navbarSelector = 'template-components-header';
    let navBarJS = fs.readFileSync(
      path.join(__dirname, '/Components/header.js'),
      'utf8',
    );

    navBarJS = navBarJS.replaceAll('{{selector}}', navbarSelector);
    navBarJS = navBarJS.replaceAll('{{selector|r}}', navbarSelector);
    window.eval(navBarJS);
  };

  registerListeners = () => {
    this.removeListeners();
    this.addListeners();
  };

  removeListeners = () => {
    this.listeners.forEach((listener) => {
      listener.element.removeEventListener(listener.type, listener.value);
    });
  };

  toggleAllSections = async () => {
    const sections = Object.keys(this.generator.sections).map(
      (sectionName) => this.generator.sections[sectionName]
    );

    const closedSections = sections.filter((section) => section.isHidden());

    if (closedSections.length === sections.length) {
      sections.forEach((section) => section.expandSection());

      return;
    }

    sections.forEach((section) => section.collapseSection());
  };
}
