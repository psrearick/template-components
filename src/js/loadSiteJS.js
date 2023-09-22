import {componentNames, componentJS} from "./elementDefinitions";
import {loadFonts} from "./createElements";
import {resizeScreenSize} from "./addEventListeners";

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
    document.body.classList.remove('overflow-hidden');
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
            <div class="py-4 px-2 gap-2 grid grid-cols-2 lg:grid-cols-3 shadow">
                <div class="cursor-pointer flex flex-col justify-center text-center col-span-2 lg:col-span-3"><p>${component}</p></div>
                <button class="cursor-pointer btn-md btn-hollow">up</button>
                <button class="cursor-pointer btn-md btn-hollow">down</button>
                <div class="cursor-pointer flex flex-col text-center justify-center text-red-500 text-xs py-2 col-span-2 lg:col-span-1"><p>remove</p></div>
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
        <div id="preview-panel-window" class="fixed flex flex-col z-30 top-0 left-0 bottom-0 right-0 bg-gray-300">
<!--          <div class="h-full w-full flex">-->
            <p class="text-2xl font-bold">Page Preview</p>
            <div id="preview-panel" class="max-w-7xl w-full mx-auto component relative flex-1">
              <div class="h-16">
                <div class="grid grid-cols-4 py-4 gap-4">
                  <button
                    class="btn-secondary-hollow btn-md col-span-4 lg:col-span-1 hover:shadow-md responsive-button"
                    data-button-id="preview-panel-mobile"
                  >
                    <span class="block">Mobile</span>
                  </button>
                  <button
                    class="btn-secondary-hollow btn-md col-span-4 lg:col-span-1 hover:shadow-md responsive-button"
                    data-button-id="preview-panel-tablet"
                  >
                    <span class="block">Tablet</span>
                  </button>
                  <button
                    class="btn-secondary-hollow btn-md col-span-4 lg:col-span-1 hover:shadow-md responsive-button"
                    data-button-id="preview-panel-desktop"
                  >
                    <span class="block">Desktop</span>
                  </button>
                  <button
                    class="btn-secondary-hollow btn-md col-span-4 lg:col-span-1 hover:shadow-md responsive-button"
                    data-button-id="preview-panel-reset"
                  >
                    <span class="block">Reset</span>
                  </button>
                </div>
              </div>
              <div class="py-2 component-container absolute top-16 bottom-0 left-0 right-0">
                <div class="relative w-full h-full flex flex-col justify-center">
                    <div class="wrapper h-full w-full overflow-hidden relative max-w-7xl mx-auto">
                        <iframe id="preview-panel-frame" class="border border-primary-500 bg-white absolute w-full h-full origin-top-left"></iframe>
                    </div>
                </div>
              </div>
            </div>
            <div class="py-6 bg-white">
              <div class="flex justify-end gap-4 max-w-7xl">
                  <button id="close-preview-button" class="btn-md btn-secondary">Close Preview</button>
                  <button id="download-page-button" class="btn btn-md">Download</button>
              </div>
            </div>
<!--          </div>-->
        </div>`;
    document.body.appendChild(previewPanel);
    document.body.classList.add('overflow-hidden');

    document.querySelectorAll("#preview-panel .responsive-button").forEach((button) => {
      button.addEventListener("click", (event) => {
        let buttonElement = event.target;

        if (!event.target.hasAttribute('data-button-id')) {
          buttonElement = event.target.closest('[data-button-id]');
        }

        const dataButtonId = buttonElement.getAttribute('data-button-id');
        const componentElement = button.closest('.component');
        const componentName = componentElement.getAttribute('id');
        const frameElement = componentElement.querySelector('#' + componentName + '-frame');
        const targetScreenSizeName = dataButtonId.replace(componentName + '-', '');

        console.log(frameElement);

        resizeScreenSize(targetScreenSizeName, frameElement, 0.6);
      });
    });

    document.querySelector('#close-preview-button').addEventListener('click', () => {
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
}
