import {componentJS, componentNames, sectionNames} from "./elementDefinitions";
import {encodeHTMLEntities, ucFirst} from "./utilities";
import FontFaceObserver from "fontfaceobserver";

const sections = {};
let components = {};

export const addElementsToDom = async () => {
  Object.keys(sections).forEach(sectionName => {
    const parents = document.querySelectorAll('.header-section[data-import = ' + sectionName + ']');

    parents.forEach(parent => parent.appendChild(sections[sectionName]));
  });

  Object.keys(components).forEach(componentName => {
    const component = components[componentName];
    const parents = document.querySelectorAll('.component-section[data-import = ' + componentName +']');

    parents.forEach(parent => parent.appendChild(component.element));

    if (component.js) {
      eval(component.js);

      const JSCodeElement = component.element.querySelector('#' + componentName + '-js-code');
      const JSCodeToggleElement = component.element.querySelector('#' + componentName + '-js-show-code');
      if (JSCodeElement) {
        JSCodeToggleElement.classList.remove('hidden');
      }
    }
  });

  return {
    sections: sections,
    components: components,
  };
};

export const createSections = async () => {
  for (const sectionName of Object.keys(sectionNames)) {
    const resp = await fetch(sectionNames[sectionName]);
    const el = document.createElement('div');

    el.innerHTML = await resp.text();

    sections[sectionName] = el;
  }
};


export const createComponents = async () => {
  const componentTemplateResponse = await fetch(new URL('../Templates/SectionComponent.html', import.meta.url));
  const componentTemplate = await componentTemplateResponse.text();

  for (const importName of Object.keys(componentNames)) {
    let component = componentTemplate;

    component = component.replaceAll('{component}', importName);
    component = component.replaceAll('{Component}', ucFirst(importName));

    const el = document.createElement('div');
    el.innerHTML = component;

    const frame = el.querySelector("#" + importName + "-frame");

    const resp = await fetch(componentNames[importName]);
    const html = await resp.text();
    frame.innerHTML = html;

    components[importName] = {
      html: html,
      js: Object.keys(componentJS).indexOf(importName) > -1 ? componentJS[importName] : null,
      element: el,
    };
  }
};

export const createCodeElement = (code) => {
  let htmlRoot = document.createElement("div");
  htmlRoot.innerHTML = code;
  htmlRoot.querySelectorAll('script').forEach(el => el.remove());

  return encodeHTMLEntities(htmlRoot.innerHTML);
};

export const loadFonts = () => {
  const MontserratObserver = new FontFaceObserver('Montserrat');
  const InterObserver = new FontFaceObserver('Inter');

  Promise.all([
    MontserratObserver.load(),
    InterObserver.load(),
  ]).then(() => {
    document.querySelectorAll('.font-sans').forEach(el => el.classList.add('fonts-loaded'));
    document.querySelectorAll('.font-serif').forEach(el => el.classList.add('fonts-loaded'));
  });
};

