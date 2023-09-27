import hljs from './vendor/highlight.min';

export default class Component {
  listeners = [];
  element;

  constructor(name, el = null, page) {
    this.name = name;
    this.element = el;
    this.page = page;
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
    this.addListener(this.toggleCodeSection, '[id$="-show-code"]', true);
    this.addListener(this.resizeComponentFrame, '.responsive-button', true);
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

  resizeComponentFrame = (event) => {
    this.page.resizer.handleResizeEvent(event, event.target.closest('.responsive-button'));
  };

  toggleCodeSection = (event) => {
    const codeToggle = event.target.closest('[id$="-show-code"]');
    const componentType = codeToggle
      .getAttribute('id')
      .replace('-show-code', '')
      .replace(this.name + '-' , '');

    const codeElement = document.querySelector(
      '#' + codeToggle
        .getAttribute('id')
        .replace('-show', '')
    );

    codeElement.innerHTML =
          this.page.generator.componentCode[this.name][componentType].display;

      hljs.highlightElement(codeElement);

      const pre = codeElement.parentElement;
      const visible = pre.classList.contains('block');

      pre.classList.remove(visible ? 'block' : 'hidden');
      pre.classList.add(visible ? 'hidden' : 'block');
  };
}
