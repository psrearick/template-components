import * as elementDefinitions from './elementDefinitions';

import {
  createElement,
  encodeHTMLEntities,
  makeId,
  ucFirst,
} from './utilities';
import { resizeScreenSize } from './addEventListeners';

export default class ComponentGenerator {
  sections = {};
  components = {};
  componentCode = {};

  constructor(definitions = elementDefinitions) {
    this.componentDefinitions = definitions.components;
    this.sectionDefinitions = definitions.sections;
  }

  addSectionsToDom = async () => {
    Object.keys(this.sections).forEach((sectionName) => {
      const parents = document.querySelectorAll(
        '.header-section[data-import = ' + sectionName + ']',
      );

      parents.forEach((parent) => parent.append(this.sections[sectionName]));
    });
  };

  runJS = async (code, destination = window) => {
    destination.eval(code);
  };

  addComponentsToDom = async (componentList = []) => {
    componentList.forEach((componentName) => {
      const component = this.componentCode[componentName];
      const componentElement = this.components[componentName];
      const parents = document.querySelectorAll(
        '.component-section[data-import = ' + componentName + ']',
      );

      parents.forEach((parent) => {
        const child = parent.appendChild(componentElement);
        resizeScreenSize('reset', child.querySelector('.frame'));
      });

      if (!component.js.hasJS) {
        return;
      }

      this.runJS(component.js.code);

      componentElement
        .querySelector('#' + componentName + '-js-show-code')
        .classList.remove('hidden');
    });
  };

  addElementsToDom = async (components = []) => {
    await this.addSectionsToDom();
    await this.addComponentsToDom(components);

    return {
      sections: this.sections,
      components: this.components,
      componentCode: this.componentCode,
    };
  };

  createSections = async () => {
    for (const sectionName of Object.keys(this.sectionDefinitions)) {
      const resp = await fetch(this.sectionDefinitions[sectionName].path);
      this.sections[sectionName] = createElement(
        this.replaceProps(
          await resp.text(),
          this.sectionDefinitions[sectionName].properties,
        ),
      );
    }
  };

  fetchCode = async (path) => {
    const resp = await fetch(path);
    return await resp.text();
  };

  replaceProps = (code, props, id = '') => {
    let replacedCode = code;

    props = props || {};

    Object.keys(props).forEach((propKey) => {
      replacedCode = replacedCode.replaceAll(`{{${propKey}}}`, props[propKey]);
      replacedCode = replacedCode.replaceAll(
        `{{${propKey}|c}}`,
        ucFirst(props[propKey]),
      );
      replacedCode = replacedCode.replaceAll(
        `{{${propKey}|r}}`,
        props[propKey] + id,
      );
    });

    return replacedCode;
  };

  generateHTMLForComponent = async (name, id) => {
    const html = this.componentDefinitions[name].html;
    const htmlCode = await this.fetchCode(html.code);
    const htmlProps = html.properties;

    let replacedHTML = htmlCode;
    if (htmlProps && Object.keys(htmlProps).length > 0) {
      replacedHTML = this.replaceProps(replacedHTML, htmlProps, id);
    }

    return {
      code: replacedHTML,
      original: htmlCode,
      display: this.getHTMLDisplayCode(replacedHTML),
      name: name,
      props: htmlProps,
      hasHTML: true,
    };
  };

  generateJSForComponent = async (name, id) => {
    const response = {
      code: '',
      original: '',
      display: '',
      name: name,
      props: {},
      hasJS: false,
    };

    const js = this.componentDefinitions[name].js;

    if (!js || !js.code) {
      return response;
    }

    response.hasJS = true;

    const jsCode = js.code;
    const jsProps = js.properties;
    response.original = jsCode;
    response.code = jsCode;

    if (jsProps && Object.keys(jsProps).length > 0) {
      response.code = this.replaceProps(jsCode, jsProps, id);
      response.props = jsProps;
    }

    response.display = response.code;

    return response;
  };

  generateDataForComponents = async (componentList) => {
    const componentData = {};

    for (const componentName of componentList) {
      const id = makeId(5);
      componentData[componentName] = {
        html: await this.generateHTMLForComponent(componentName, id),
        js: await this.generateJSForComponent(componentName, id),
      };
    }

    return componentData;
  };

  createComponents = async (componentList = []) => {
    const componentTemplateResponse = await fetch(
      new URL('../Templates/SectionComponent.html', import.meta.url),
    );
    const componentTemplate = await componentTemplateResponse.text();

    if (!componentList || componentList.length === 0) {
      componentList = Object.keys(this.componentDefinitions);
    }

    const componentListData =
      await this.generateDataForComponents(componentList);

    for (const componentName of componentList) {
      let componentContainer = componentTemplate;
      componentContainer = componentContainer.replaceAll(
        '{component}',
        componentName,
      );
      componentContainer = componentContainer.replaceAll(
        '{Component}',
        ucFirst(componentName),
      );

      const containerEl = createElement(componentContainer);

      const frame = containerEl.querySelector('#' + componentName + '-frame');

      const componentData = componentListData[componentName];
      frame.innerHTML = componentData.html.code;
      this.components[componentName] = containerEl;
      this.componentCode[componentName] = componentData;
    }
  };

  getHTMLDisplayCode = (code) => {
    let htmlRoot = createElement(code);

    htmlRoot.querySelectorAll('script').forEach((el) => el.remove());

    return encodeHTMLEntities(htmlRoot.innerHTML);
  };
}
