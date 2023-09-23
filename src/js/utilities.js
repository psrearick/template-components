export const ucFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export const bodyScroll = (prevent = true) => {
  if (prevent) {
    document.body.classList.add('overflow-hidden');
    document.body.classList.remove('lg:overflow-auto');

    return;
  }

  document.body.classList.add('lg:overflow-auto');
  document.body.classList.remove('overflow-hidden');
};

export const makeId = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export const encodeHTMLEntities = (text) => {
  let textArea = createElement(text, false, 'textarea')
  textArea.innerText = text;
  let encodedOutput = textArea.innerHTML;
  let arr = encodedOutput.split('<br>');
  encodedOutput = arr.join('\n');
  textArea.remove();
  return encodedOutput;
}

export class ElementGenerator {
  constructor(tag = 'div', destination = document) {
    this.element = destination.createElement(tag);
    this.destination = destination;
  }

  append = (destinationElement = 'body', all = false) => {
    if (typeof destinationElement === 'string') {
      return this.appendToSelector(destinationElement, all);
    }

    return this.appendToElement(destinationElement);
  };

  appendToSelector = (selector = 'body', all = false) => {

    if (all) {
      this.destination.querySelectorAll(selector)
        .forEach(element => element.appendChild(this.element));

      return this;
    }

    this.destination.querySelector(selector).appendChild(this.element);

    return this;
  };

  appendToElement = (destinationElement) => {
    destinationElement.appendChild(this.element);

    return this;
  };

  get = () => this.element;

  setAttributes = (attributes) => {
    Object.keys(attributes)
      .forEach(name => this.element.setAttribute(name, attributes[name]));

    return this;
  };

  setClasses = (classes) => {
    classes.forEach(name => this.element.classList.add(name));

    return this;
  }

  setContent = (content) => {
    this.element.innerHTML = content;

    return this;
  };
}

export const createElement = (
  content = '',
  append = false,
  tag = 'div',
  destination = document,
  destinationElement = 'body',
  attributes = {},
  classes = [],
  createForAll = false
) => {
  const element = new ElementGenerator(tag, destination);

  if (append) {
    element.append(destinationElement, createForAll);
  }

  if (Object.keys(attributes).length > 0) {
    element.setAttributes(attributes);
  }

  if (classes.length > 0) {
    element.setClasses(classes);
  }

  if (content.length > 0) {
    element.setContent(content);
  }

  return element.get();
};
