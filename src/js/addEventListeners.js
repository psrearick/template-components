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

const selectScreenSize = (screen, element) => {

  const targetScreenSize = sizes[screen];
  const frameWidth = element.getBoundingClientRect().width;

  if (frameWidth !== targetScreenSize.width) {
    element.style.width = targetScreenSize.width + 'px';
    element.style.height = targetScreenSize.height + 'px';

    return;
  }

  element.style.height = targetScreenSize.width + 'px';
  element.style.width = targetScreenSize.height + 'px';
};

const addResizeListener = () => {
  document.querySelectorAll(".responsive-button").forEach((button) => {
    button
      .addEventListener("click", (event) => {
        let buttonElement = event.target;

        if (!event.target.hasAttribute('data-button-id')) {
          buttonElement = event.target.closest('[data-button-id]');
        }

        const dataButtonId = buttonElement.getAttribute('data-button-id');
        const componentElement = button.closest('.component');
        const componentName = componentElement.getAttribute('id');
        const frameElement = componentElement.querySelector('#' + componentName + '-frame');
        const targetScreenSizeName = dataButtonId.replace(componentName + '-', '');

        selectScreenSize(targetScreenSizeName, frameElement);
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
