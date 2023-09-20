import hljs from "./vendor/highlight.min.js";
import {createCodeElement} from "./createElements";

export const addEventListeners = async (componentCode) => {
  addEventListener("click", async (event) => {
    const id = event.target.id;
    const parentId = event.target.parentElement.id;

    if (!id && !parentId) {
      return;
    }

    let sectionId = "";

    if (id.indexOf('-section-header') > -1) {
      sectionId = id;
    }

    if (sectionId === "" && parentId.indexOf('-section-header') > -1) {
      sectionId = parentId;
    }

    if (sectionId !== "") {
      const section = document.querySelector("#" + sectionId.replace('-section-header', ''));

      if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
        section.classList.add('block');
      } else {
        section.classList.remove('block');
        section.classList.add('hidden');
      }
    }

    if (id.indexOf('-show-code') > -1) {
      const componentNameWithType = id.replace('-show-code', '');
      const exploded = componentNameWithType.split('-');
      const componentType = exploded.pop();
      const componentName = exploded.join("");
      const codeElement = document.querySelector("#" + id.replace('-show-code', '-code'));
      let code = componentCode.components[componentName][componentType];

      if (componentType === 'html') {
        code = createCodeElement(code);
      }

      codeElement.innerHTML = code;

      hljs.highlightElement(codeElement);

      const pre = codeElement.parentElement;
      const visible = pre.classList.contains('block');

      if (visible) {
        pre.classList.remove('block');
        pre.classList.add('hidden');
      } else {
        pre.classList.remove('hidden');
        pre.classList.add('block');
      }
    }
  });
};
