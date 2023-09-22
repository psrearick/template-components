import { handleResizeEvent } from "./addEventListeners";
import fs from "fs";
import path from "path";

let generator;
let previewWindowHTML;

const setPreviewWindowHTML = async () => {
  if (previewWindowHTML) {
    return;
  }

  previewWindowHTML = await generator.fetchCode(new URL('../Templates/PreviewWindow.html', import.meta.url));
};

const loadNavbar = () => {
  const navbarSelector = "#template-components-header";
  let navBarJS = fs.readFileSync(path.join(__dirname, '/Components/header.js'), "utf8");
  navBarJS = navBarJS.replaceAll('{{selector}}', navbarSelector);
  window.eval(navBarJS);
};

const hideBuildPanelListener = () => {
  document.querySelector('#hide-build-panel').addEventListener('click', function () {
    document.querySelector('#build-panel').classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    document.body.classList.remove('lg:overflow-auto');
    document.querySelectorAll('.add-component-button').forEach((element) => {
      element.closest('button').classList.add('hidden');
    });
  });
};

const showBuildPanelListener = () => {
  document.querySelector('#show-build-panel').addEventListener('click', function () {
    document.querySelector('#build-panel').classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    document.body.classList.add('lg:overflow-auto');
    document.querySelectorAll('.add-component-button').forEach((element) => {
      element.closest('button').classList.remove('hidden');
    });
  });
};

const addComponentListener = async () => {
  document.querySelectorAll('.add-component-button').forEach(element => {
    element.addEventListener('click', async (event) => {
      const component = event.target.closest('button').getAttribute('id').replace('add-', '');

      const list = document.querySelector('#build-list');
      const entries = list.querySelectorAll('[data-component]');
      const numberOfEntries = entries.length;

      const newEntry = document.createElement('div');
      newEntry.setAttribute('data-component', component);
      newEntry.setAttribute('build-list-order', numberOfEntries.toString());

      const resp = await fetch(new URL('../Templates/componentBuilderEntry.html', import.meta.url));
      let html = await resp.text();
      html = html.replaceAll(`{{component}}`, component);

      newEntry.innerHTML = html;
      newEntry.classList.add('build-list-entry');
      list.appendChild(newEntry);
    });
  });
};

const previewBuildListener = async () => {
  document.querySelector('#preview-build').addEventListener('click', async () => {
    await setPreviewWindowHTML();
    const listElement = document.querySelector('#build-list');
    const entryElements = listElement.querySelectorAll('[data-component]');

    const list = [];

    entryElements.forEach(element => list.push(element.getAttribute('data-component')));

    document.querySelector('#preview-panel')?.remove();

    const previewPanel = document.createElement('div');
    previewPanel.innerHTML = previewWindowHTML;
    document.body.appendChild(previewPanel);
    document.body.classList.add('overflow-hidden');

    document.querySelectorAll("#preview-panel .responsive-button").forEach((button) => {
      button.addEventListener("click", (event) => handleResizeEvent(event, button));
    });

    document.querySelector('#close-preview-button').addEventListener('click', () => {
      document.body.classList.remove('overflow-hidden');
      document.querySelector('#preview-panel-window')?.remove();
    });

    const frame = document.querySelector('#preview-panel-frame');

    let pageHtml = [];
    let pageJs = [];

    for (const component of list) {
      const resp = await fetch(componentNames[component]);
      const html = await resp.text();
      pageHtml.push(html);

      const hasJS = Object.keys(componentJS).indexOf(component) > -1;

      if (hasJS) {
        pageJs.push(componentJS[component]);
      }
    }

    let doc = document.implementation.createHTMLDocument("Preview Page");
    let root = doc.createElement("div");
    root.innerHTML = pageHtml.join('');
    doc.body.appendChild(root);

    const links = document.querySelectorAll('link');
    Array.from(links).forEach(link => {
      let linkEl = doc.createElement("link");
      linkEl.href = link.href;
      linkEl.rel = link.rel;
      doc.head.appendChild(linkEl);
    });

    const styles = document.querySelectorAll('style');
    Array.from(styles).forEach(style => {
      let styleEl = doc.createElement('style');
      styleEl.innerHTML = style.innerHTML;
      doc.head.appendChild(styleEl);
    });


    const styleString = `
        .font-sans {
          font-family: Inter, Nunito, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
        }

        .font-serif {
          font-family: Montserrat, Georgia, Cambria, "Times New Roman", Times, serif;
        }
      `;

    let styleEl = doc.createElement('style');
    styleEl.innerHTML = styleString;
    doc.head.appendChild(styleEl);

    const viewport = doc.createElement("meta");
    viewport.name = "viewport";
    viewport.content = "width=device-width, initial-scale=1.0";
    doc.head.appendChild(viewport);

    let dest = frame.contentDocument;
    let newNode = dest.importNode(doc.documentElement, true);
    dest.replaceChild(newNode, dest.documentElement);

    frame.contentDocument.querySelectorAll('script').forEach(el => el.remove());

    const jsString = pageJs.join('');
    const script = doc.createElement('script');
    script.innerHTML = jsString;

    console.log(script);

    frame.contentDocument.body.appendChild(script);

    document.querySelector('#download-page-button').addEventListener('click', () => {
      const file = new File([frame.contentDocument.documentElement.innerHTML], 'page.html', {
        type: 'text/plain',
      })

      const link = document.createElement('a')
      const url = URL.createObjectURL(file)

      link.href = url
      link.download = file.name
      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    });
  });
};

export const loadSiteJS = async (currentGenerator) => {
  generator = currentGenerator;
  loadNavbar();
  hideBuildPanelListener();
  showBuildPanelListener();
  await addComponentListener();
  // await previewBuildListener();

}
