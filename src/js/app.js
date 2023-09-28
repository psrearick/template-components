import ComponentGenerator from './componentGenerator';
import WindowResizer from './windowResizer';
import fs from 'fs';
import path from 'path';
import EventHandler from './eventHandler';
import BuildPanel from './buildPanel';

export default class App {

  constructor(config) {
    this.generator = new ComponentGenerator(this, config.definitions);
    this.resizer = new WindowResizer();
    this.eventHandler = new EventHandler();
    this.eventBus = this.eventHandler.getEventBus();

    this.loadNavbar();
    new BuildPanel();

    this.addListeners();
  }

  addListeners = () => {
    this.eventHandler.addListener(this.toggleAllSections, '#toggle-sections-button');
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

  toggleAllSections = () => {
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
