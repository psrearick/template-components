import fs from 'fs';
import path from 'path';
import { ElementGenerator } from './utilities';

let generator;

const loadNavbar = () => {
  const navbarSelector = '#template-components-header';
  let navBarJS = fs.readFileSync(
    path.join(__dirname, '/Components/header.js'),
    'utf8',
  );
  navBarJS = navBarJS.replaceAll('{{selector}}', navbarSelector);
  window.eval(navBarJS);
};

const hideBuildPanelListener = () => {
  document
    .querySelector('#hide-build-panel')
    .addEventListener('click', function () {
      document.querySelector('#build-panel').classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      document.body.classList.remove('lg:overflow-auto');
      document.querySelectorAll('.add-component-button').forEach((element) => {
        element.closest('button').classList.add('hidden');
      });
    });
};

const showBuildPanelListener = () => {
  document
    .querySelector('#show-build-panel')
    .addEventListener('click', function () {
      document.querySelector('#build-panel').classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      document.body.classList.add('lg:overflow-auto');
      document.querySelectorAll('.add-component-button').forEach((element) => {
        element.closest('button').classList.remove('hidden');
      });
    });
};

const addComponentListener = async () => {
  document.querySelectorAll('.add-component-button').forEach((element) => {
    element.addEventListener('click', async (event) => {
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

      new ElementGenerator()
        .setContent(html)
        .setAttributes({
          'data-component': component,
          'build-list-order': numberOfEntries.toString(),
        })
        .setClasses(['build-list-entry'])
        .append('#build-list');
    });
  });
};

export const loadSiteJS = async (currentGenerator) => {
  generator = currentGenerator;
  loadNavbar();
  hideBuildPanelListener();
  showBuildPanelListener();
  await addComponentListener();
};
