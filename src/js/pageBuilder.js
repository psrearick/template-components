import {
  bodyScroll,
  createElement,
  ElementGenerator,
  makeId,
} from './utilities';
import WindowResizer from './windowResizer';
const acorn = require('acorn');
const walk = require('acorn-walk');

export default class PageBuilder {
  pageCode = {
    pageHTML: [],
    displayHTML: [],
    pageJS: [],
    displayJS: [],
  };

  constructor(generator) {
    this.generator = generator;
    this.resizer = new WindowResizer();
  }

  getBuildList = () => {
    const listElement = document.querySelector('#build-list');
    const entryElements = listElement.querySelectorAll('[data-component]');

    return Array.from(entryElements).map((element, index) => ({
      id: index,
      name: element.getAttribute('data-component'),
    }));
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

        this.pageCode = {
          pageHTML: [],
          displayHTML: [],
          pageJS: [],
          displayJS: [],
        };
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
    document.querySelector('#preview-build').addEventListener('click', () => {
      (async () => this.previewBuild())();
    });

  registerResize = () => {
    document
      .querySelectorAll('#preview-panel .responsive-button')
      .forEach((button) => {
        button.addEventListener('click', (event) => {
          this.resizer.handleResizeEvent(event, button);
          this.hideScreenSizePanel();
        });
      });

    document
      .querySelector('#preview-screen-size-toggle')
      .addEventListener('click', () => {
        if (
          document
            .querySelector('#preview-screen-size-toggle')
            .getAttribute('data-open')
        ) {
          this.hideScreenSizePanel();

          return;
        }

        this.showScreenSizePanel();
      });
  };

  hideScreenSizePanel = () => {
    const toggle = document.querySelector('#preview-screen-size-toggle');
    document
      .querySelector('#preview-screen-size-buttons')
      .classList.remove('grid');
    document
      .querySelector('#preview-screen-size-buttons')
      .classList.add('hidden');
    toggle.removeAttribute('data-open');
    toggle.querySelector('span').innerHTML = 'Change Screen Size';
    document.querySelector('#preview-screen-size').classList.remove('h-full');
    document.querySelector('#preview-screen-size').classList.add('h-16');
    document
      .querySelector('#preview-panel .component-container')
      .classList.add('absolute');
  };

  showScreenSizePanel = () => {
    const toggle = document.querySelector('#preview-screen-size-toggle');
    document
      .querySelector('#preview-screen-size-buttons')
      .classList.remove('hidden');
    document
      .querySelector('#preview-screen-size-buttons')
      .classList.add('grid');
    toggle.setAttribute('data-open', 'true');
    toggle.querySelector('span').innerHTML = 'Cancel';
    document.querySelector('#preview-screen-size').classList.add('h-full');
    document.querySelector('#preview-screen-size').classList.remove('h-16');
    document
      .querySelector('#preview-panel .component-container')
      .classList.remove('absolute');
  };

  registerLoadedListeners = () => {
    this.registerResize();
    this.registerClosePreview();
    this.registerDownload();
  };

  getHTMLForComponent = (name, id = '') => {
    const html = {
      pageHTML: '',
      displayHTML: '',
    };

    const component = this.generator.componentCode[name];
    if (!component.html.hasHTML) {
      return html;
    }

    const replacedCode = this.generator.replaceProps(
      component.html.original,
      component.html.props,
      id,
    );
    html.pageHTML = replacedCode;
    html.displayHTML = this.generator.getHTMLDisplayCode(replacedCode);

    return html;
  };

  getJSForComponent = (name, id = '') => {
    const js = {
      pageJS: '',
      displayJS: '',
    };

    const component = this.generator.componentCode[name];
    if (!component.js.hasJS) {
      return js;
    }

    let replacedCode = this.generator.replaceProps(
      component.js.original,
      component.js.props,
      id,
    );

    const declarations = [];
    const identifiers = [];
    walk.full(acorn.parse(replacedCode, { ecmaVersion: 'latest' }), (node) => {
      if (node.type === 'Identifier') {
        identifiers.push(node);
      }
      if (node.type === 'VariableDeclaration') {
        declarations.push(node.declarations[0].id.name);
      }
    });

    replacedCode = identifiers.reduce((accumulator, currentValue, index) => {
      const startPosition = index === 0 ? 0 : identifiers[index - 1].end;
      const toEnd = index === identifiers.length - 1;
      const wasDeclared = declarations.indexOf(currentValue.name) > -1;
      accumulator += replacedCode.substring(startPosition, currentValue.end);

      if (wasDeclared) {
        accumulator += id;
      }

      if (toEnd) {
        accumulator += replacedCode.substring(currentValue.end);
      }

      return accumulator;
    }, '');

    js.pageJS = replacedCode;
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

    this.pageCode.pageJS.forEach((jsString) => {
      new ElementGenerator('script', doc)
        .setContent(jsString)
        .appendToElement(this.frame.contentDocument.body);
    });
  };

  previewBuild = async () => {
    document.querySelector('#preview-panel')?.remove();

    await this.setPreviewWindowHTML();

    const list = this.getBuildList();
    const componentNames = list.map((listItem) => listItem.name);

    bodyScroll(true, true);

    componentNames.forEach((componentName) => {
      const id = makeId(5);
      const html = this.getHTMLForComponent(componentName, id);
      this.pageCode.pageHTML.push(html.pageHTML);
      this.pageCode.displayHTML.push(html.displayHTML);

      const js = this.getJSForComponent(componentName, id);
      this.pageCode.pageJS.push(js.pageJS);
      this.pageCode.displayJS.push(js.displayJS);
    });

    this.constructDocument();

    this.registerLoadedListeners();
  };
}
