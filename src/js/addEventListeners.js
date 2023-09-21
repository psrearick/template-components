import hljs from "./vendor/highlight.min.js";
import {createCodeElement} from "./createElements";

const toggleCodeSection = (componentCode) => {
  document.querySelectorAll('[id$="-show-code"]').forEach((element) => {
    element.addEventListener("click", async (event) => {
      const componentNameWithType = element.getAttribute('id').replace('-show-code', '');
      const exploded = componentNameWithType.split('-');
      const componentType = exploded.pop();
      const componentName = exploded.join("");
      const codeElement = document.querySelector("#" + componentNameWithType + '-code');
      let code = componentCode.components[componentName][componentType];

      if (componentType === 'html') {
        code = createCodeElement(code);
      }

      codeElement.innerHTML = code;

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
    element.addEventListener("click", async (event) => {
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

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const el = entry.target;
    const width = el.getBoundingClientRect().width;
    const height = el.getBoundingClientRect().height;
    const screen = el.getAttribute('data-exact-size');

    if (Object.keys(sizes).indexOf(screen) === -1) {
      entry.target.setAttribute('data-exact-size', 'false');

      return;
    }

    if (width !== sizes[screen].width) {
      entry.target.setAttribute('data-exact-size', 'false');

      return;
    }

    if (height !== sizes[screen].height) {
      entry.target.setAttribute('data-exact-size', 'false');

      return;
    }

    entry.target.setAttribute('data-exact-size', screen);
  }
});

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

const resizeScreenSize = (screen, element) => {
  if (Object.keys(sizes).indexOf(screen) === -1) {
    resetScreenSize(element);
    element.removeAttribute('data-exact-size');

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
  let scale = 0.8 / currentScale;
  const scaledWidth = frameWidth * scale;

  if (scaledWidth > componentWidth) {
    scale = componentWidth / frameWidth;
  }

  element.style.transform = "scale(" + Math.min(scale, 1).toFixed(2) + ")";
  element.style.resize = "none";

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

const addResizeListener = () => {
  document.querySelectorAll(".responsive-button").forEach((button) => {
    button.addEventListener("click", (event) => {
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
    });
  });
}

const toggleAllSections = () => {
  document.querySelector('#toggle-sections-button').addEventListener('click', () => {
    document.querySelectorAll('[id$="-section-header"]').forEach((element) => {
      toggleSectionByElement(element);
    });
  });
};

const toggleSectionByElement = (element) => {
  const section = document.querySelector("#" + element.getAttribute('id').replace('-section-header', ''));
  const hidden = section.classList.contains('hidden');

  section.classList.remove(hidden ? 'hidden' : 'block');
  section.classList.add(hidden ? 'block' : 'hidden');
};

export const addEventListeners = (componentCode) => {
  toggleSection();
  toggleAllSections();
  toggleCodeSection(componentCode);
  addResizeListener();
};