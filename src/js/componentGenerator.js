import {components as componentDefinitions, sections as sectionDefinitions} from "./elementDefinitions";
import {createElement, encodeHTMLEntities, ucFirst} from "./utilities";

export default class ComponentGenerator {
  sections = {};
  components = {};
  componentCode = {};

  addSectionsToDom = async () => {
    Object.keys(this.sections).forEach(sectionName => {
      const parents = document.querySelectorAll('.header-section[data-import = ' + sectionName + ']');

      parents.forEach(parent => parent.appendChild(this.sections[sectionName]));
    });
  };

  runJS = async (code, destination = window) => {
    destination.eval(code);
  };

  addComponentsToDom = async () => {
    Object.keys(this.components).forEach(componentName => {
      const component = this.componentCode[componentName];
      const componentElement = this.components[componentName];
      const parents = document.querySelectorAll('.component-section[data-import = ' + componentName +']');

      parents.forEach(parent => parent.appendChild(componentElement));

      if (!component.js.hasJS) {
        return;
      }

      this.runJS(component.js.code);

      componentElement.querySelector('#' + componentName + '-js-show-code').classList.remove('hidden');
    });
  };

  addElementsToDom = async () => {
    await this.addSectionsToDom();
    await this.addComponentsToDom();

    return {
      sections: this.sections,
      components: this.components,
      componentCode: this.componentCode,
    };
  };

  createSections = async () => {
    for (const sectionName of Object.keys(sectionDefinitions)) {
      const resp = await fetch(sectionDefinitions[sectionName]);
      this.sections[sectionName] = createElement(await resp.text());
    }
  };

  fetchCode = async (path) => {
    const resp = await fetch(path);
    return await resp.text();
  };

  replaceProps = (code, props) => {
    let replacedCode = code;

    Object.keys(props).forEach((propKey) => {
      replacedCode = replacedCode.replaceAll(`{{${propKey}}}`, props[propKey]);
    });

    return replacedCode;
  };

  generateHTMLForComponent = async (name) => {
    const html = componentDefinitions[name].html;
    const htmlCode = await this.fetchCode(html.code);
    const htmlProps = html.properties;

    let replacedHTML = htmlCode;
    if (htmlProps && Object.keys(htmlProps).length > 0) {
      replacedHTML = this.replaceProps(replacedHTML, htmlProps);
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

  generateJSForComponent = async (name) => {
    const response = {
      code: '',
      original: '',
      display: '',
      name: name,
      props: {},
      hasJS: false,
    };

    const js = componentDefinitions[name].js;

    if (!js || !js.code) {
      return response;
    }

    response.hasJS = true;

    const jsCode = js.code;
    const jsProps = js.properties;
    response.original = jsCode;
    response.code = jsCode;

    if (jsProps && Object.keys(jsProps).length > 0) {
      response.code = this.replaceProps(jsCode, jsProps);
      response.props = jsProps;
    }

    response.display = response.code;

    return response;
  };

  generateDataForComponents = async (componentList) => {
    const componentData = {};

    for (const componentName of componentList) {
      componentData[componentName] = {
        html: await this.generateHTMLForComponent(componentName),
        js: await this.generateJSForComponent(componentName),
      };
    }

    return componentData;
  };

  createComponents = async () => {
    const componentTemplateResponse = await fetch(new URL('../Templates/SectionComponent.html', import.meta.url));
    const componentTemplate = await componentTemplateResponse.text();
    const componentList = Object.keys(componentDefinitions);
    const componentListData = await this.generateDataForComponents(componentList);

    for (const componentName of componentList) {
      let componentContainer = componentTemplate;
      componentContainer = componentContainer.replaceAll('{component}', componentName);
      componentContainer = componentContainer.replaceAll('{Component}', ucFirst(componentName));

      const containerEl = createElement(componentContainer);

      const frame = containerEl.querySelector("#" + componentName + "-frame");

      const componentData = componentListData[componentName];
      frame.innerHTML = componentData.html.code;
      this.components[componentName] = containerEl;
      this.componentCode[componentName] = componentData;
    }
  };

  getHTMLDisplayCode = (code) => {
    let htmlRoot = createElement(code)

    htmlRoot.querySelectorAll('script').forEach(el => el.remove());

    return encodeHTMLEntities(htmlRoot.innerHTML);
  };
};



