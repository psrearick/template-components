import fs from 'fs';
import path from 'path';
import { bodyScroll, ElementGenerator } from './utilities';

let generator;

const loadNavbar = () => {
  const navbarSelector = 'template-components-header';
  let navBarJS = fs.readFileSync(
    path.join(__dirname, '/Components/header.js'),
    'utf8',
  );
  navBarJS = navBarJS.replaceAll('{{selector}}', navbarSelector);
  navBarJS = navBarJS.replaceAll('{{selector|r}}', navbarSelector);
  window.eval(navBarJS);
};

const hideBuildPanelListener = () => {
  document
    .querySelector('#hide-build-panel')
    .addEventListener('click', function () {
      hideBuildPanel();
    });
};

const toggleBuildPanel = () => {
  if (document.querySelector('#build-panel').classList.contains('hidden')) {
    showBuildPanel();

    return;
  }

  hideBuildPanel();
};

const toggleBuildPanelListener = () => {
  document
    .querySelector('#show-build-panel')
    .addEventListener('click', toggleBuildPanel);
};

const cancelBuild = () => {
  document.querySelectorAll('.add-component-button').forEach((element) => {
    element.closest('button').classList.add('hidden');
  });

  clearBuildList();

  hideBuildPanel();
};

const cancelButtonListener = () => {
  document
    .querySelector('#cancel-build')
    .addEventListener('click', cancelBuild);
};

const showBuildPanel = () => {
  bodyScroll(true);
  document.querySelector('#build-panel').classList.remove('hidden');
  document.querySelectorAll('.add-component-button').forEach((element) => {
    element.closest('button').classList.remove('hidden');
  });
};

const hideBuildPanel = () => {
  bodyScroll(false);
  document.querySelector('#build-panel').classList.add('hidden');
};

const clearBuildList = () => {
  document.querySelector('#build-list').innerHTML = null;
};

const addComponentListener = async () => {
  document.querySelectorAll('.add-component-button').forEach((element) => {
    element.addEventListener('click', (event) => {
      (async () => {
        const component = event.target
          .closest('button')
          .getAttribute('id')
          .replace('add-', '');

        const list = document.querySelector('#build-list');
        const entries = list.querySelectorAll('[data-component]');
        const numberOfEntries = entries.length;

        let html = await generator.fetchCode(
          new URL('../Templates/componentBuilderEntry.html', import.meta.url),
        );
        html = html.replaceAll(`{{component}}`, component);

        const element = new ElementGenerator()
          .setContent(html)
          .setAttributes({
            'data-component': component,
            'data-build-list-order': numberOfEntries.toString(),
          })
          .setClasses(['build-list-entry'])
          .append('#build-list')
          .get();

        addListItemListeners(element);
      })();
    });
  });
};

const reorderBuildListByOrder = () => {
  const buildList = document.querySelector('#build-list');
  const items = Array.from(buildList.children)
    .filter((item) => item.getAttribute('data-build-list-order') > -1)
    .sort((a, b) =>
      a.getAttribute('data-build-list-order') >
      b.getAttribute('data-build-list-order')
        ? 1
        : -1,
    );

  const elements = document.createDocumentFragment();

  items.forEach((item) => {
    const clone = item.cloneNode(true);
    addListItemListeners(clone);
    elements.append(clone);
  });

  buildList.innerHTML = null;
  buildList.append(elements);
};

const addListItemListeners = (element) => {
  moveComponentUpListener(element);
  moveComponentDownListener(element);
  removeComponentListener(element);
};

const moveComponentUpListener = (element) => {
  element
    .querySelector('[data-action="move-up"]')
    .addEventListener('click', () => {
      const parentElement = element.closest('[data-build-list-order]');
      const currentOrder = parseInt(
        parentElement.getAttribute('data-build-list-order'),
      );
      const previousOrder = currentOrder - 1;

      if (currentOrder === 0) {
        return;
      }

      const previousElement = document.querySelector(
        '[data-build-list-order="' + previousOrder + '"]',
      );
      previousElement.setAttribute(
        'data-build-list-order',
        currentOrder.toString(),
      );
      parentElement.setAttribute(
        'data-build-list-order',
        previousOrder.toString(),
      );

      reorderBuildListByOrder();
    });
};

const moveComponentDownListener = (element) => {
  element
    .querySelector('[data-action="move-down"]')
    .addEventListener('click', () => {
      const parentElement = element.closest('[data-build-list-order]');
      const currentOrder = parseInt(
        parentElement.getAttribute('data-build-list-order'),
      );
      const listItemCount =
        document.querySelector('#build-list').children.length;
      const nextOrder = currentOrder + 1;

      if (nextOrder === listItemCount) {
        return;
      }

      const nextElement = document.querySelector(
        '[data-build-list-order="' + nextOrder + '"]',
      );
      nextElement.setAttribute(
        'data-build-list-order',
        currentOrder.toString(),
      );
      parentElement.setAttribute('data-build-list-order', nextOrder.toString());

      reorderBuildListByOrder();
    });
};

const removeComponentListener = (element) => {
  element
    .querySelector('[data-action="remove"]')
    .addEventListener('click', () => {
      const parentElement = element.closest('[data-build-list-order]');
      parentElement.setAttribute('data-build-list-order', -1);
      reorderBuildListByOrder();
    });
};

export const loadSiteJS = async (currentGenerator) => {
  generator = currentGenerator;
  loadNavbar();
  hideBuildPanelListener();
  toggleBuildPanelListener();
  cancelButtonListener();
  await addComponentListener();
};
