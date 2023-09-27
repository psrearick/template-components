export default class Section {
  listeners = [];
  element;
  body;

  constructor(name, definition, page) {
    this.name = name;
    this.definition = definition;
    this.page = page;
    this.path = definition.path || new URL('../Templates/Section.html', import.meta.url);
  }

  addListener = (listener, target, all = false, type = 'click') => {
    const targets = all
      ? this.element.querySelectorAll(target)
      : [this.element.querySelector(target)];

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
    this.addListener(this.toggleSection, '[id$="-section-header"]');
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

    this.element.classList.add('populated')

    return this.page.generator.createComponents(this.definition.components)
      .then(() => this.page.generator
        .addComponentsToDom(this.definition.components, this.element)
      );
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

  setElement = (element) => {
    this.element = element;
    this.body = this.element.querySelector('.section-container');
    this.element.addEventListener('');
  };

  toggleSection = () => {
    if (this.isHidden()) {
      this.expandSection();

      return;
    }

    this.collapseSection();
  };
}
