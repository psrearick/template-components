import ComponentGenerator from './componentGenerator';
import WindowResizer from './windowResizer';
import fs from 'fs';
import path from 'path';
import EventHandler from './eventHandler';
import BuildPanel from './buildPanel';
import { createElement } from './utilities';

export default class App {
  constructor(config) {
    this.generator = new ComponentGenerator(this, config.definitions);
    this.resizer = new WindowResizer();
    this.eventHandler = new EventHandler();
    this.eventBus = this.eventHandler.getEventBus();

    this.loadNavbar()
      .then(() => (this.buildPanel = new BuildPanel(this)))
      .then(() => this.addListeners());
  }

  addListeners = () => {
    this.eventHandler.addListener(
      this.toggleAllSections,
      '#toggle-sections-button',
    );
  };

  loadNavbar = async () => {
    const navbarSelector = 'template-components-header';
    let navBarJS = fs.readFileSync(
      path.join(__dirname, '/Components/header.js'),
      'utf8',
    );

    navBarJS = navBarJS.replaceAll('{{selector}}', navbarSelector);
    navBarJS = navBarJS.replaceAll('{{selector|r}}', navbarSelector);

    const navBarMenuItemPath = new URL(
      '../Templates/NavigationMenuItem.html',
      import.meta.url,
    );

    const menuItem = await fetch(navBarMenuItemPath);
    const menuItemHTML = await menuItem.text();

    const sections = Object.keys(this.generator.sectionDefinitions);

    for (const sectionName of sections) {
      const section = this.generator.sectionDefinitions[sectionName];
      const html = this.generator.replaceProps(
        menuItemHTML,
        section.properties,
      );
      createElement(
        html,
        true,
        'li',
        document,
        '#' + navbarSelector + ' .section-navigation',
      );
    }

    window.eval(navBarJS);
  };

  toggleAllSections = () => {
    const sections = Object.keys(this.generator.sections).map(
      (sectionName) => this.generator.sections[sectionName],
    );

    if (sections.length <= 1) {
      sections.forEach((section) => section.expandSection());

      return;
    }

    const closedSections = sections.filter((section) => section.isHidden());

    if (closedSections.length === sections.length) {
      sections.forEach((section) => section.expandSection());
      document.querySelector('#toggle-sections-button').innerHTML =
        'Hide All Sections';

      return;
    }

    sections.forEach((section) => section.collapseSection());
    document.querySelector('#toggle-sections-button').innerHTML =
      'Show All Sections';
  };
}
