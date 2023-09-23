import { handleResizeEvent } from './addEventListeners';
import {
  bodyScroll,
  createElement,
  ElementGenerator,
  makeId,
} from './utilities';

export default class PageBuilder {
  pageCode = {
    pageHTML: [],
    displayHTML: [],
    pageJS: [],
    displayJS: [],
  };

  constructor(generator) {
    this.generator = generator;
  }

  getBuildList = () => {
    const listElement = document.querySelector('#build-list');
    const entryElements = listElement.querySelectorAll('[data-component]');

    return Array.from(entryElements).map((element) =>
      element.getAttribute('data-component'),
    );
  };

  setPreviewWindowHTML = async () => {
    if (this.previewWindowHTML) {
      return;
    }

    this.previewWindowHTML = await this.generator.fetchCode(
      new URL('../Templates/PreviewWindow.html', import.meta.url),
    );
  };

  registerClosePreview = () =>
    document
      .querySelector('#close-preview-button')
      .addEventListener('click', () => {
        bodyScroll(false);
        document.querySelector('#preview-panel-window')?.remove();
      });

  registerDownload = () => {
    document
      .querySelector('#download-page-button')
      .addEventListener('click', () => {
        const file = new File(
          [this.frame.contentDocument.documentElement.innerHTML],
          'page.html',
          { type: 'text/plain' },
        );
        const url = URL.createObjectURL(file);

        const link = new ElementGenerator('a')
          .setAttributes({ href: url, download: file.name })
          .appendToSelector('body')
          .get();

        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      });
  };

  registerListeners = async () => {
    this.registerPreview();
  };

  registerPreview = () =>
    document
      .querySelector('#preview-build')
      .addEventListener('click', async () => {
        await this.previewBuild();
      });

  registerResize = () =>
    document
      .querySelectorAll('#preview-panel .responsive-button')
      .forEach((button) => {
        button.addEventListener('click', (event) =>
          handleResizeEvent(event, button),
        );
      });

  registerLoadedListeners = () => {
    this.registerResize();
    this.registerClosePreview();
    this.registerDownload();
  };

  getHTMLForComponent = (name) => {
    const html = {
      pageHTML: '',
      displayHTML: '',
    };

    const component = this.generator.componentCode[name];
    if (!component.html.hasHTML) {
      return html;
    }

    const props = {};

    if (Object.keys(component.html.props).length > 0) {
      Object.keys(component.html.props).forEach((key) => {
        props[key] = component.html.props[key] + makeId(5);
      });
    }

    const replacedCode = this.generator.replaceProps(
      component.html.original,
      props,
    );
    html.pageHTML = replacedCode;
    html.displayHTML = this.generator.getHTMLDisplayCode(replacedCode);

    return html;
  };

  getJSForComponent = (name) => {
    const js = {
      pageJS: '',
      displayJS: '',
    };

    const component = this.generator.componentCode[name];
    if (!component.js.hasJS) {
      return js;
    }

    const props = {};
    if (Object.keys(component.js.props).length > 0) {
      Object.keys(component.js.props).forEach((key) => {
        props[key] = component.js.props[key] + makeId(5);
      });
    }

    const replacedCode = this.generator.replaceProps(
      component.js.original,
      props,
    );
    js.pageHTML = replacedCode;
    js.displayJS = replacedCode;

    return js;
  };

  constructDocument = () => {
    createElement(this.previewWindowHTML, true);
    this.frame = document.querySelector('#preview-panel-frame');

    let doc = document.implementation.createHTMLDocument('Preview Page');
    new ElementGenerator('div', doc)
      .setContent(this.pageCode.pageHTML.join(''))
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

    let dest = this.frame.contentDocument;
    let newNode = dest.importNode(doc.documentElement, true);
    dest.replaceChild(newNode, dest.documentElement);

    this.frame.contentDocument
      .querySelectorAll('script')
      .forEach((el) => el.remove());

    const jsString = this.pageCode.pageJS.join('');
    new ElementGenerator('script', doc)
      .setContent(jsString)
      .appendToElement(this.frame.contentDocument.body);
  };

  previewBuild = async () => {
    document.querySelector('#preview-panel')?.remove();

    await this.setPreviewWindowHTML();

    const list = this.getBuildList();

    bodyScroll();

    Object.keys(this.generator.componentCode)
      .filter((componentName) => list.indexOf(componentName) > -1)
      .forEach((componentName) => {
        const html = this.getHTMLForComponent(componentName);
        this.pageCode.pageHTML.push(html.pageHTML);
        this.pageCode.displayHTML.push(html.displayHTML);

        const js = this.getJSForComponent(componentName);
        this.pageCode.pageJS.push(js.pageJS);
        this.pageCode.displayJS.push(js.displayJS);
      });

    this.constructDocument();

    this.registerLoadedListeners();
  };
}
