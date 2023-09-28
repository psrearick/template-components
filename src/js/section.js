import EventHandler from './eventHandler';
import loadFonts from './loadFonts';

export default class Section {
  element;
  body;

  constructor(app, name) {
    this.app = app;
    this.name = name;
    this.eventHandler = new EventHandler();

    this.definition = this.app.generator.sectionDefinitions[name];
    this.path =
      this.definition.path ||
      new URL('../Templates/Section.html', import.meta.url);

    this.registerAddToDomHandler();
  }

  onAddedToDom = (event) => {
    if (event.section !== this) {
      return;
    }

    this.eventHandler.setElement(this.element);
    this.eventHandler.addListener(
      this.toggleSection,
      '[id$="-section-header"]',
    );

    loadFonts(this.element);
  };

  collapseSection = () => {
    this.body.classList.add('hidden');
  };

  expandSection = () => {
    this.body.classList.remove('hidden');
    this.populateComponents();
  };

  isHidden = () => this.body.classList.contains('hidden');

  isPopulated = () => this.element.classList.contains('populated');

  populateComponents = () => {
    if (this.isPopulated()) {
      return;
    }

    this.element.classList.add('populated');

    return this.app.generator
      .createComponents(this.definition.components)
      .then(() =>
        this.app.generator.addComponentsToDom(
          this.definition.components,
          this.element,
        ),
      );
  };

  registerAddToDomHandler = () => {
    this.app.eventBus.subscribe('sectionAddedToDom', this.onAddedToDom);
  };

  setElement = (element) => {
    this.element = element;
    this.body = this.element.querySelector('.section-container');
  };

  toggleSection = () => {
    if (this.isHidden()) {
      this.expandSection();

      return;
    }

    this.collapseSection();
  };
}
