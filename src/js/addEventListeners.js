import hljs from "./vendor/highlight.min.js";
import {createCodeElement} from "./createElements";

const toggleCodeSection = (componentCode) => {
  document.querySelectorAll('[id$="-show-code"]').forEach((element) => {
    element.addEventListener("click", async (event) => {
      // const id = event.target.id;
      // const parentId = event.target.parentElement.id;
      //
      // if (!id && !parentId) {
      //   return;
      // }
      //
      // if (id.indexOf('-show-code') === -1) {
      //   return;
      // }

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

      // if (visible) {
        pre.classList.remove(visible ? 'block' : 'hidden');
        pre.classList.add(visible ? 'hidden' : 'block');
      // } else {
      //   pre.classList.remove('hidden');
      //   pre.classList.add('block');
      // }
    });
  });
}

const toggleSection = () => {
  document.querySelectorAll('[id$="-section-header"]').forEach((element) => {
    element.addEventListener("click", async (event) => {
      const section = document.querySelector("#" + element.getAttribute('id').replace('-section-header', ''));

      if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
        section.classList.add('block');
      } else {
        section.classList.remove('block');
        section.classList.add('hidden');
      }
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
};

export const addEventListeners = (componentCode) => {
  toggleSection();
  toggleAllSections();
  toggleCodeSection(componentCode);
  addResizeListener();
};
