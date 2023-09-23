import hljs from "./vendor/highlight.min.js";

let generator;

const toggleCodeSection = () => {
  document.querySelectorAll('[id$="-show-code"]').forEach((element) => {
    element.addEventListener("click", async () => {
      const componentNameWithType = element.getAttribute('id').replace('-show-code', '');
      const exploded = componentNameWithType.split('-');
      const componentType = exploded.pop();
      const componentName = exploded.join("");
      const codeElement = document.querySelector("#" + componentNameWithType + '-code');

      codeElement.innerHTML = generator.componentCode[componentName][componentType].display;

      hljs.highlightElement(codeElement);

      const pre = codeElement.parentElement;
      const visible = pre.classList.contains('block');

      pre.classList.remove(visible ? 'block' : 'hidden');
      pre.classList.add(visible ? 'hidden' : 'block');
    });
  });
}

const toggleSection = () => {
  document.querySelectorAll('[id$="-section-header"]').forEach((element) => {
    element.addEventListener("click", async () => {
      toggleSectionByElement(element);
    });
  });
};

const sizes = {
  mobile: {
    width: 375,
    height: 667,
  },
  tablet: {
    width: 768,
    height: 1024,
  },
  desktop: {
    width: 1366,
    height: 768,
  },
};

const resetScreenSize = (element) => {
  element.style.width = "";
  element.style.height = "";
  element.style.transform = "";
  element.style.marginTop = "";
  element.style.marginBottom = "";
  element.style.resize = "";
  element.style.marginLeft = "";
  element.style.marginRight = "";
};

export const resizeScreenSize = (screen, element, ratio = 0.8) => {
  const wrapper = element.closest('.wrapper');

  if (Object.keys(sizes).indexOf(screen) === -1) {
    resetScreenSize(element);

    element.removeAttribute('data-exact-size');

    if (wrapper) {
      resetScreenSize(wrapper);
    }

    return;
  }

  let rotate;

  if (!element.hasAttribute('data-exact-size')) {
    element.setAttribute('data-exact-size', screen + "-reset");
  }

  const attribute = element.getAttribute('data-exact-size');

  if (attribute.indexOf('-reset') > -1 || attribute.indexOf('-rotated') > -1) {
    element.setAttribute('data-exact-size', screen);
    rotate = false;
  } else {
    element.setAttribute('data-exact-size', screen + "-rotated");
    rotate = true;
  }

  resetScreenSize(element);

  const component = element.closest('.component-container');
  const componentWidth= component.getBoundingClientRect().width;
  const targetScreenSize = sizes[screen];

  element.style.width = (rotate ? targetScreenSize.height : targetScreenSize.width) + 'px';
  element.style.height = (rotate ? targetScreenSize.width : targetScreenSize.height) + 'px';

  let frameDimensions = element.getBoundingClientRect();
  let frameHeight = frameDimensions.height;
  const frameWidth = frameDimensions.width;
  const windowHeight = window.innerHeight;
  const currentScale = frameHeight / windowHeight;
  let scale = ratio / currentScale;
  const scaledWidth = frameWidth * scale;

  if (scaledWidth > componentWidth) {
    scale = componentWidth / frameWidth;
  }

  element.style.transform = "scale(" + Math.min(scale, 1).toFixed(2) + ")";
  element.style.resize = "none";

  if (wrapper) {
    element.closest('.wrapper').style.height = element.getBoundingClientRect().height.toString() + 'px';
    element.closest('.wrapper').style.width = element.getBoundingClientRect().width.toString() + 'px';

    return;
  }

  frameHeight = element.getBoundingClientRect().height;
  const componentHeight = component.getBoundingClientRect().height;

  const desiredYMargin = 20;
  const heightDifference = componentHeight - frameHeight;
  if ((heightDifference) > desiredYMargin) {
    const marginShift = heightDifference / 2;
    element.style.marginTop = "-" + marginShift + "px";
    element.style.marginBottom = "-" + marginShift + "px";
  }

  element.style.marginLeft = "auto";
  element.style.marginRight = "auto";
};

export const handleResizeEvent = (event, button) => {
  let buttonElement = event.target;

  if (!event.target.hasAttribute('data-button-id')) {
    buttonElement = event.target.closest('[data-button-id]');
  }

  const dataButtonId = buttonElement.getAttribute('data-button-id');
  const componentElement = button.closest('.component');
  const componentName = componentElement.getAttribute('id');
  const frameElement = componentElement.querySelector('#' + componentName + '-frame');
  const targetScreenSizeName = dataButtonId.replace(componentName + '-', '');

  resizeScreenSize(targetScreenSizeName, frameElement);
};

const addResizeListener = () => {
  document.querySelectorAll(".responsive-button").forEach((button) => {
    button.addEventListener("click", (event) => handleResizeEvent(event, button));
  });
}

const toggleAllSections = () => {
  document.querySelector('#toggle-sections-button').addEventListener('click', () => {
    const headers = Array.from(document.querySelectorAll('[id$="-section-header"]'));
    const closedSections = headers.filter(header => {
      const section = document.querySelector("#" + header.getAttribute('id').replace('-section-header', ''));
      return section.classList.contains('hidden')
    }).length;

    headers.forEach((element) => {
      toggleSectionByElement(element, closedSections > 0);
    });
  });
};

const toggleSectionByElement = (element, value = null) => {
  const section = document.querySelector("#" + element.getAttribute('id').replace('-section-header', ''));
  const hidden = section.classList.contains('hidden');

  if (value === null || value === undefined) {
    section.classList.remove(hidden ? 'hidden' : 'block');
    section.classList.add(hidden ? 'block' : 'hidden');

    return;
  }

  if (value && hidden) {
    section.classList.remove('hidden');
  }

  if (value) {
    return;
  }

  section.classList.add('hidden');
};

export const addEventListeners = (currentGenerator) => {
  generator = currentGenerator;
  toggleSection();
  toggleAllSections();
  toggleCodeSection();
  addResizeListener();
};
