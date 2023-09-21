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
};

const resizeScreenSize = (screen, element) => {
  if (Object.keys(sizes).indexOf(screen) === -1) {
    resetScreenSize(element);

    element.removeAttribute('data-exact-size');

    return;
  }
  const component = element.closest('.component');
  const componentWidth= component.getBoundingClientRect().width;
  const componentHeight= component.getBoundingClientRect().height;
  const targetScreenSize = sizes[screen];

  let frameWidth = element.getBoundingClientRect().width;

  let rotate = false;
  if (element.hasAttribute('data-exact-size')) {
    const attribute = element.getAttribute('data-exact-size');

    if (attribute.indexOf('-rotated') > -1) {
      element.setAttribute('data-exact-size', screen);
      rotate = false;
    } else {
      element.setAttribute('data-exact-size', screen + "-rotated");
      rotate = true;
    }
  } else {
    element.setAttribute('data-exact-size', screen);
    rotate = false;
  }

  resetScreenSize(element);

  element.style.width = (rotate ? targetScreenSize.height : targetScreenSize.width) + 'px';
  element.style.height = (rotate ? targetScreenSize.width : targetScreenSize.height) + 'px';

  const frameDimensions = element.getBoundingClientRect();
  frameWidth = frameDimensions.width;
  const frameHeight = frameDimensions.height;
  const windowHeight = window.innerHeight;
  const currentScale = frameHeight / windowHeight;
  let scale = 0.8 / currentScale;
  const scaledWidth = frameWidth * scale;

  if (scaledWidth > componentWidth) {
    scale = component / frameWidth;
  }

  const scaledHeight = scale * frameHeight;
  const heightDifference = frameHeight - scaledHeight;

  element.style.transform = "scale(" + scale.toFixed(2) + ")";
  element.style.marginTop = "-" + heightDifference/3 + "px";
  element.style.marginBottom = "-" + heightDifference/3 + "px";
  element.style.resize = "none";
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
