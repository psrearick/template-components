import hljs from './vendor/highlight.min';
import EventHandler from './eventHandler';
import { updateResponsiveClasses } from './updateResponsiveClasses';
import loadFonts from './loadFonts';
import { ElementGenerator } from './utilities';

export default class Component {
  element;

  constructor(app, name) {
    this.app = app;
    this.name = name;

    this.eventHandler = new EventHandler();
    this.registerAddToDomHandler();
  }

  onAddedToDom = (event) => {
    if (event.component !== this) {
      return;
    }

    this.eventHandler.setElement(this.element);

    this.eventHandler.addListener(
      this.toggleCodeSection,
      '[id$="-show-code"]',
      true,
    );
    this.eventHandler.addListener(
      this.resizeComponentFrame,
      '.responsive-button',
      true,
    );
    this.eventHandler.addListener(
      this.addComponentToBuildPanel,
      '.add-component-button',
    );

    this.app.resizer.resizeScreenSize(
      'reset',
      this.element.querySelector('.frame'),
    );

    updateResponsiveClasses(this.element);
    loadFonts(this.element);

    if (this.app.buildPanel.open) {
      this.element
        .querySelector('.add-component-button')
        .closest('button')
        .classList.remove('hidden');
    }
  };

  registerAddToDomHandler = () => {
    this.app.eventBus.subscribe('componentAddedToDom', this.onAddedToDom);
  };

  resizeComponentFrame = (event) => {
    this.app.resizer.handleResizeEvent(
      event,
      event.target.closest('.responsive-button'),
    );
  };

  setElement = (element) => (this.element = element);

  toggleCodeSection = (event) => {
    const codeToggle = event.target.closest('[id$="-show-code"]');
    const componentType = codeToggle
      .getAttribute('id')
      .replace('-show-code', '')
      .replace(this.name + '-', '');

    const codeElement = document.querySelector(
      '#' + codeToggle.getAttribute('id').replace('-show', ''),
    );

    codeElement.innerHTML =
      this.app.generator.componentCode[this.name][componentType].display;

    hljs.highlightElement(codeElement);

    const pre = codeElement.parentElement;
    const visible = pre.classList.contains('block');

    pre.classList.remove(visible ? 'block' : 'hidden');
    pre.classList.add(visible ? 'hidden' : 'block');
  };

  addComponentToBuildPanel = (event) => {
    (async () => {
      const component = event.target
        .closest('button')
        .getAttribute('id')
        .replace('add-', '');

      const list = document.querySelector('#build-list');
      const entries = list.querySelectorAll('[data-component]');
      const numberOfEntries = entries.length;

      let html = await this.app.generator.fetchCode(
        new URL('../Templates/componentBuilderEntry.html', import.meta.url),
      );
      html = html.replaceAll(`{{component}}`, component);

      const element = new ElementGenerator()
        .setContent(html)
        .setAttributes({
          'data-component': component,
          'data-build-list-order': numberOfEntries.toString(),
        })
        .setClasses(['build-list-entry'])
        .append('#build-list')
        .get();

      this.app.buildPanel.addListItemListeners(element);
    })();
  };
}
