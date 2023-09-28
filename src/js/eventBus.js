export default class EventBus {
  constructor() {
    if (EventBus.instance) {
      return EventBus.instance;
    }

    this.eventObject = {};
    this.callbackId = 0;

    EventBus.instance = this;
  }

  publish(eventName, ...args) {
    const callbackObject = this.eventObject[eventName];

    if (!callbackObject) {
      return;
    }

    for (let id in callbackObject) {
      callbackObject[id](...args);

      if (id[0] === 'd') {
        delete callbackObject[id];
      }
    }
  }

  subscribe(eventName, callback) {
    return this.subscribeMarked(eventName, callback);
  }

  subscribeMarked(eventName, callback, marker = '') {
    if (!this.eventObject[eventName]) {
      this.eventObject[eventName] = {};
    }

    const id = marker + this.callbackId++;

    this.eventObject[eventName][id] = callback;

    const unSubscribe = () => {
      delete this.eventObject[eventName][id];

      if (Object.keys(this.eventObject[eventName]).length === 0) {
        delete this.eventObject[eventName];
      }
    };

    return { unSubscribe };
  }

  subscribeOnce(eventName, callback) {
    return this.subscribeMarked(eventName, callback, 'd');
  }

  clear(eventName) {
    if (!eventName) {
      this.eventObject = {};
      return;
    }

    delete this.eventObject[eventName];
  }
}
