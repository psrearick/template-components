import {componentNames, componentJS} from "./elementDefinitions";

export const loadSiteJS = async () => {
  const navbarSelector = "#template-components-header";
  const navbar = document.querySelector(navbarSelector);
  const checkbox = document.querySelector(navbarSelector + " input[type=checkbox]");

  checkbox.addEventListener('change', function () {
    if (this.checked) {
      navbar.setAttribute('data-checked', '');
    } else {
      navbar.removeAttribute('data-checked');
    }
  });

  navbar.querySelectorAll('li, button').forEach(element => {
    element.addEventListener('click', (event) => {
      checkbox.checked = false;
      const evt = new Event('change');
      checkbox.dispatchEvent(evt);
    });
  });

  document.querySelector('#hide-build-panel').addEventListener('click', function () {
    document.querySelector('#build-panel').classList.add('hidden');
    document.querySelectorAll('.add-component-button').forEach((element) => {
      element.closest('button').classList.add('hidden');
    });
  });
  document.querySelector('#show-build-panel').addEventListener('click', function () {
    document.querySelector('#build-panel').classList.remove('hidden');
    document.querySelectorAll('.add-component-button').forEach((element) => {
      element.closest('button').classList.remove('hidden');
    });
  });

  document.querySelectorAll('.add-component-button').forEach(element => {
    element.addEventListener('click', (event) => {
      const component = event.target.closest('button').getAttribute('id').replace('add-', '');

      const list = document.querySelector('#build-list');
      const entries = list.querySelectorAll('[data-component]');
      const numberOfEntries = entries.length;

      const newEntry = document.createElement('div');
      newEntry.setAttribute('data-component', component);
      newEntry.setAttribute('build-list-order', numberOfEntries.toString());
      newEntry.innerHTML = `
            <div class="flex justify-between py-2 px-2">
                <div class="cursor-pointer flex flex-col justify-center"><p>${component}</p></div>
                <button class="cursor-pointer btn-md btn-hollow">up</button>
                <button class="cursor-pointer btn-md btn-hollow">down</button>
                <div class="cursor-pointer flex flex-col justify-center text-red-500 text-xs py-2"><p>remove</p></div>
            </div>`;
      newEntry.classList.add('build-list-entry');
      list.appendChild(newEntry);
    });
  });



  document.querySelector('#preview-build').addEventListener('click', async () => {
    const listElement = document.querySelector('#build-list');
    const entryElements = listElement.querySelectorAll('[data-component]');

    const list = [];

    entryElements.forEach(element => list.push(element.getAttribute('data-component')));

    document.querySelector('#preview-panel')?.remove();

    const previewPanel = document.createElement('div');
    previewPanel.innerHTML = `
        <div id="preview-panel" class="fixed z-30 top-0 left-0 bottom-0 right-0 bg-white">
          <div class="h-full w-full flex flex-col">
            <div class="flex-1 bg-gray-300 flex flex-col">
              <div class="py-2">
                <div class="max-w-7xl mx-auto">
                  <p class="text-2xl font-bold">Page Preview</p>
                </div>
              </div>
              <div class="flex-1 py-2">
                <iframe id="build-preview" class="border border-primary-500 bg-white max-w-7xl w-full h-full mx-auto"></iframe>
              </div>
            </div>
            <div class="py-6 bg-white">
              <div class="flex justify-end gap-4 max-w-7xl">
                  <button id="close-preview-button" class="btn-md btn-secondary">Close Preview</button>
                  <button class="btn btn-md">Download</button>
              </div>
            </div>
          </div>
        </div>`;
    document.body.appendChild(previewPanel);

    document.querySelector('#close-preview-button').addEventListener('click', () => {
      document.querySelector('#preview-panel')?.remove();
    });

    const frame = document.querySelector('#build-preview');

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

    const viewport = doc.createElement("meta");
    viewport.name = "viewport";
    viewport.content = "width=device-width, initial-scale=1.0";
    doc.head.appendChild(viewport);

    let dest = frame.contentDocument;
    let newNode = dest.importNode(doc.documentElement, true);
    dest.replaceChild(newNode, dest.documentElement);

    const jsString = pageJs.join('');
    const script = doc.createElement('script');
    script.innerHTML = jsString;

    frame.contentDocument.body.appendChild(script);
    pageJs.forEach((js) => {
      frame.contentWindow.eval(js);
    });
  });
}
