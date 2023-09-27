import * as elementDefinitions from './elementDefinitions';

import { createElement, encodeHTMLEntities, makeId, ucFirst } from './utilities';
import Section from './section';
import Component from './component';

export default class ComponentGenerator {
  sections = {};
  components = {};
  componentCode = {};

  constructor(page, definitions = elementDefinitions) {
    this.page = page;
    this.componentDefinitions = definitions.components;
    this.sectionDefinitions = definitions.sections;
  }

  addSectionsToDom = async (containerSelector = '#component-sections') => {
    Object.keys(this.sections).forEach((sectionName) => {
      const section = this.sections[sectionName];
      document.querySelector(containerSelector).append(section.element);
      this.page.eventBus.publish('sectionAddedToDom', {
        section: section.element,
      });
    });
  };

  runJS = async (code, destination = window) => {
    destination.eval(code);
  };

  addComponentsToDom = async (componentList = [], section = null) => {
    const parent = section
      ? section.querySelector('.section-container')
      : document.querySelector('.section-container');

    componentList.forEach((componentName) => {
      const componentCode = this.componentCode[componentName];
      const component = this.components[componentName];
      const componentElement = component.element;
      const child = parent.appendChild(componentElement);

      component.registerListeners();
      this.page.resizer.resizeScreenSize('reset', child.querySelector('.frame'));

      if (!componentCode.js.hasJS) {
        return;
      }

      this.runJS(componentCode.js.code);

      componentElement
        .querySelector('#' + componentName + '-js-show-code')
        .classList.remove('hidden');
    });
  };

  createComponents = async (componentList = []) => {
    if (!componentList || componentList.length === 0) {
      return;
    }

    const componentTemplateResponse = await fetch(
      new URL('../Templates/SectionComponent.html', import.meta.url),
    );
    const componentTemplate = await componentTemplateResponse.text();

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

      this.components[componentName] = new Component(
        componentName,
        containerEl,
        this.page
      );

      this.componentCode[componentName] = componentData;
    }
  };

  createSections = async (sectionList = Object.keys(this.sectionDefinitions)) => {
    for (const sectionName of sectionList) {
      const section = new Section(sectionName, this.sectionDefinitions[sectionName], this.page);
      const resp = await fetch(section.path);

      section.setElement(createElement(
        this.replaceProps(
          await resp.text(),
          this.sectionDefinitions[sectionName].properties,
        ),
      ));

      this.sections[sectionName] = section;
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

  getHTMLDisplayCode = (code) => {
    let htmlRoot = createElement(code);

    htmlRoot.querySelectorAll('script').forEach((el) => el.remove());

    return encodeHTMLEntities(htmlRoot.innerHTML);
  };
}
