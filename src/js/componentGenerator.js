import * as elementDefinitions from './elementDefinitions';

import {
  createElement,
  ElementGenerator,
  encodeHTMLEntities,
  makeId,
  ucFirst,
} from './utilities';
import Section from './section';
import Component from './component';

export default class ComponentGenerator {
  sections = {};
  components = {};
  componentCode = {};

  constructor(app, definitions = elementDefinitions) {
    this.app = app;
    this.componentDefinitions = definitions.components;
    this.sectionDefinitions = definitions.sections;
  }

  addSectionsToDom = async (containerSelector = '#component-sections') => {
    Object.keys(this.sections).forEach((sectionName) => {
      const section = this.sections[sectionName];
      document.querySelector(containerSelector).append(section.element);
      this.app.eventBus.publish('sectionAddedToDom', {
        section,
      });
    });
  };

  addComponentsToDom = async (componentList = [], section = null) => {
    const parent = section
      ? section.querySelector('.section-container')
      : document.querySelector('.section-container');

    componentList.forEach((componentName) => {
      const componentCode = this.componentCode[componentName];
      const component = this.components[componentName];
      const componentElement = component.element;

      parent.append(componentElement);
      component.setElement(componentElement);

      this.app.eventBus.publish('componentAddedToDom', {
        component,
      });

      if (!componentCode.js.hasJS) {
        return;
      }

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

      const definition = this.componentDefinitions[componentName];
      const containerProps = definition.html.containerProperties || {};
      const bodyDefinition = definition.html.bodyDefinition || {};

      for (const propertyName of Object.keys(containerProps)) {
        componentContainer = componentContainer.replaceAll(
          '{' + propertyName + '}',
          containerProps[propertyName],
        );
      }

      const containerEl = createElement(componentContainer);

      const frame = containerEl.querySelector('#' + componentName + '-frame');

      let doc = document.implementation.createHTMLDocument(componentName);

      const componentData = componentListData[componentName];
      new ElementGenerator('div', doc)
        .setContent(componentData.html.code)
        .append('body');

      const links = document.querySelectorAll('link');
      Array.from(links).forEach((link) =>
        new ElementGenerator('link', doc)
          .setAttributes({ href: link.href, rel: link.rel })
          .append('head'),
      );

      const styles = document.querySelectorAll('style');
      Array.from(styles).forEach((style) =>
        new ElementGenerator('style', doc)
          .setContent(style.innerHTML)
          .append('head'),
      );

      const styleString = `
        .font-sans {
          font-family: Inter, Nunito, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
        }

        .font-serif {
          font-family: Montserrat, Georgia, Cambria, "Times New Roman", Times, serif;
        }
      `;

      new ElementGenerator('style', doc).setContent(styleString).append('head');

      new ElementGenerator('meta', doc)
        .setAttributes({
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        })
        .appendToSelector('head');

      frame.onload = () => {
        let dest = frame.contentDocument;

        let newNode = dest.importNode(doc.documentElement, true);
        dest.replaceChild(newNode, dest.documentElement);

        new ElementGenerator('script', doc)
          .setContent(componentData.js.code)
          .appendToElement(frame.contentDocument.body);

        console.log(bodyDefinition);
        if (bodyDefinition?.hasBody) {
          const classes = bodyDefinition.bodyClasses || [];
          createElement(
            '',
            true,
            'div',
            frame.contentDocument,
            'body',
            {},
            classes,
          );
        }
      };

      const component = new Component(this.app, componentName);

      component.setElement(containerEl);

      this.components[componentName] = component;

      this.app.eventBus.publish('componentCreated', { component });

      this.componentCode[componentName] = componentData;
    }
  };

  createSections = async (
    sectionList = Object.keys(this.sectionDefinitions),
  ) => {
    for (const sectionName of sectionList) {
      const section = new Section(this.app, sectionName);

      this.app.eventBus.publish('sectionCreated', { section });

      const resp = await fetch(section.path);

      section.setElement(
        createElement(
          this.replaceProps(
            await resp.text(),
            this.sectionDefinitions[sectionName].properties,
          ),
        ),
      );

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
        `{{${propKey}|u}}`,
        props[propKey].toUpperCase(),
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
