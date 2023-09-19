import fs from "fs";
import path from "path";
import hljs from "./vendor/highlight.min.js";

const sectionNames = {
  'headers': new URL('../Sections/headers.html', import.meta.url),
  'hero': new URL('../Sections/hero.html', import.meta.url),
  'text': new URL('../Sections/text.html', import.meta.url),
  'services': new URL('../Sections/services.html', import.meta.url),
};

const componentNames = {
  'header1': new URL('../Components/header1.html', import.meta.url),
  'header2': new URL('../Components/header2.html', import.meta.url),
  'header3': new URL('../Components/header3.html', import.meta.url),
  'hero1': new URL('../Components/hero1.html', import.meta.url),
  'text1': new URL('../Components/text1.html', import.meta.url),
  'text2': new URL('../Components/text2.html', import.meta.url),
  'services1': new URL('../Components/services1.html', import.meta.url),
};

const componentJS = {
  'header1': fs.readFileSync(path.join(__dirname, '/Components/header1.js'), "utf8"),
  'header2': fs.readFileSync(path.join(__dirname, '/Components/header2.js'), "utf8"),
  'header3': fs.readFileSync(path.join(__dirname, '/Components/header3.js'), "utf8"),
};

const componentCode = {};

const ucFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);

(async function () {
  const sections = {};
  const components = {};
  const componentTemplateResponse = await fetch(new URL('../Templates/SectionComponent.html', import.meta.url));
  const componentTemplate = await componentTemplateResponse.text();

  for (const el of document.querySelectorAll('.header-section[data-import]')) {
    const importName = el.getAttribute('data-import');
    if (Object.keys(sections).indexOf(importName) > -1) {
      el.outerHTML = components[importName];

      continue;
    }

    const resp = await fetch(sectionNames[importName]);
    const html = await resp.text();

    components[importName] = html;
    el.outerHTML = html;
  }

  for (const el of document.querySelectorAll('.component-section[data-import]')) {
    const importName = el.getAttribute('data-import');

    let component = componentTemplate;

    component = component.replaceAll('{component}', importName);
    component = component.replaceAll('{Component}', ucFirst(importName));
    el.outerHTML = component;

    const frame = document.querySelector("#" + importName + "-frame");
    let doc = document.implementation.createHTMLDocument(importName + " Document");
    let root = doc.createElement("div");

    let html = null;
    let js = null;

    const storedHTML = Object.keys(components).indexOf(importName) > -1;
    const hasJS = Object.keys(componentJS).indexOf(importName) > -1;

    if (storedHTML) {
      html = components[importName];
    } else {
      const resp = await fetch(componentNames[importName]);
      html = await resp.text();
      components[importName] = html;
    }

    root.innerHTML = html;
    root.firstChild.classList.add(importName + "-frame-el");
    doc.body.appendChild(root);

    const links = document.querySelectorAll('link');
    Array.from(links).forEach(link => {
      let linkEl = doc.createElement("link");
      linkEl.href = link.href;
      linkEl.rel = link.rel;
      doc.head.appendChild(linkEl);
    });

    const viewport = doc.createElement("meta");
    viewport.name = "viewport";
    viewport.content = "width=device-width, initial-scale=1.0";
    doc.head.appendChild(viewport);

    let dest = frame.contentDocument;
    let newNode = dest.importNode(doc.documentElement, true);
    dest.replaceChild(newNode, dest.documentElement);

    if (hasJS) {
      js = componentJS[importName];

      frame.contentWindow.eval(js);
    }

    const nodeFrame = document.querySelector('#' + importName + " iframe");
    const frameDoc = nodeFrame.contentWindow.document;
    const frameEl = frameDoc.querySelector('.' + importName + '-frame-el');
    const scrollHeight = frameEl.getAttribute('data-height');

    if (scrollHeight) {
      nodeFrame.style.height = scrollHeight + 'px';
    }

    const codeConfig = {
      html: {
        element: document.querySelector('#' + importName + '-html-code'),
        code: html,
      },
    };

    if (hasJS) {
      codeConfig.js = {
        element: document.querySelector('#' + importName + '-js-code'),
        code: js,
      }

      const JSCodeElement = document.querySelector('#' + importName + '-js-code');
      const JSCodeToggleElement = document.querySelector('#' + importName + '-js-show-code');
      if (JSCodeElement) {
        JSCodeToggleElement.classList.remove('hidden');
      }
    }

    componentCode[importName] = codeConfig;
  }
})();

function encodeHTMLEntities(text) {
  let textArea = document.createElement('textarea');
  textArea.innerText = text;
  let encodedOutput = textArea.innerHTML;
  let arr = encodedOutput.split('<br>');
  encodedOutput = arr.join('\n');
  return encodedOutput;
}

const codeElements = document.querySelectorAll(".component-code");

codeElements.forEach((codeElement) => {
  const element = document.querySelector("#" + codeElement.getAttribute('id').replace('-code', ''));

  codeElement.innerHTML = encodeHTMLEntities(element.outerHTML);
});

addEventListener("click", (event) => {
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
    let code = componentCode[componentName][componentType].code;

    if (componentType === 'html') {
      let htmlRoot = document.createElement("div");
      htmlRoot.innerHTML = code;
      htmlRoot.querySelectorAll('script').forEach(el => el.remove());
      code = encodeHTMLEntities(htmlRoot.innerHTML);
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
