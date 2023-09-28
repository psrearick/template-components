import EventBus from './eventBus';

export default class EventHandler {
  eventBus;
  element;

  constructor() {
    this.listeners = [];

    if (this.eventBus === undefined) {
      this.eventBus = new EventBus();
    }
  }

  getElement = () => (this.element !== undefined ? this.element : document);

  getEventBus = () => this.eventBus;

  addListener = (listener, target, all = false, type = 'click') => {
    const targets = all
      ? this.getElement().querySelectorAll(target)
      : [this.getElement().querySelector(target)];

    targets.forEach((targetElement) => {
      targetElement.addEventListener(type, listener);
      this.listeners.push({
        element: targetElement,
        type: type,
        value: listener,
      });
    });
  };

  addListeners = () => {};

  registerListeners = () => {
    this.removeListeners();
    this.addListeners();
  };

  removeListeners = () => {
    this.listeners.forEach((listener) => {
      listener.element.removeEventListener(listener.type, listener.value);
    });
  };

  setElement = (element) => (this.element = element);
}
