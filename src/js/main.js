import fs from "fs";
import path from "path";

(async function () {
  const sectionNames = {
    'headers': new URL('../Sections/headers.html', import.meta.url),
  };

  const componentNames = {
    'header-1': new URL('../Components/header-1.html', import.meta.url),
    'header2': new URL('../Components/header2.html', import.meta.url),
  };

  const componentJS = {
    'header2': fs.readFileSync(path.join(__dirname, '/Components/header2.js'), "utf8"),
  };

  const sections = {};
  const components = {};

  for (const type of [
    {html: sections, urls: sectionNames},
    {html: components, urls: componentNames}
  ]) {
    for (const el of document.querySelectorAll('[data-import]')) {
      const importName = el.getAttribute('data-import');
      if (Object.keys(type.html).indexOf(importName) > -1) {
        el.outerHTML = components[importName];

        if (typeof window[importName] === "function") {
          window[importName]();
        }

        continue;
      }

      const resp = await fetch(type.urls[importName]);
      const html = await resp.text();

      components[importName] = html;
      el.outerHTML = html;

      if (Object.keys(componentJS).indexOf(importName) > -1) {
        eval(componentJS[importName]);
      }
    }
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
    const codeElement = document.querySelector("#" + id.replace('-show-code', '-code'));
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
