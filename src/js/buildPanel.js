import { bodyScroll, ElementGenerator } from './utilities';

export default class BuildPanel {
  constructor(app, parent = document) {
    this.document = parent;
    this.app = app;

    this.hideBuildPanelListener();
    this.toggleBuildPanelListener();
    this.cancelButtonListener();
    this.app.eventBus.subscribe(
      'componentAddedToBuildPanel',
      this.addComponentListener,
    );
    this.open = false;
  }

  hideBuildPanelListener = () => {
    this.document
      .querySelector('#hide-build-panel')
      ?.addEventListener('click', () => {
        this.hideBuildPanel();
      });
  };

  toggleBuildPanel = () => {
    if (
      this.document.querySelector('#build-panel').classList.contains('hidden')
    ) {
      this.showBuildPanel();

      return;
    }

    this.hideBuildPanel();
  };

  toggleBuildPanelListener = () => {
    this.document
      .querySelector('#show-build-panel')
      ?.addEventListener('click', this.toggleBuildPanel);
  };

  cancelBuild = () => {
    this.open = false;
    this.document
      .querySelectorAll('.add-component-button')
      .forEach((element) => {
        element.closest('button').classList.add('hidden');
      });

    this.clearBuildList();

    this.hideBuildPanel();
  };

  cancelButtonListener = () => {
    this.document
      .querySelector('#cancel-build')
      ?.addEventListener('click', this.cancelBuild);
  };

  showBuildPanel = () => {
    bodyScroll(true);
    this.open = true;
    this.document.querySelector('#build-panel').classList.remove('hidden');
    this.document.querySelector('#show-build-panel').classList.add('hidden');
    this.document
      .querySelectorAll('.add-component-button')
      .forEach((element) => {
        element.closest('button').classList.remove('hidden');
      });
  };

  hideBuildPanel = () => {
    bodyScroll(false);
    this.document.querySelector('#build-panel').classList.add('hidden');
    this.document.querySelector('#show-build-panel').classList.remove('hidden');
  };

  clearBuildList = () => {
    this.document.querySelector('#build-list').innerHTML = null;
  };

  reorderBuildListByOrder = () => {
    const buildList = this.document.querySelector('#build-list');
    const items = Array.from(buildList.children)
      .filter((item) => item.getAttribute('data-build-list-order') > -1)
      .sort((a, b) =>
        a.getAttribute('data-build-list-order') >
        b.getAttribute('data-build-list-order')
          ? 1
          : -1,
      );

    const elements = this.document.createDocumentFragment();

    items.forEach((item) => {
      const clone = item.cloneNode(true);
      this.addListItemListeners(clone);
      elements.append(clone);
    });

    buildList.innerHTML = null;
    buildList.append(elements);
  };

  addListItemListeners = (element) => {
    this.moveComponentUpListener(element);
    this.moveComponentDownListener(element);
    this.removeComponentListener(element);
  };

  moveComponentUpListener = (element) => {
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

        const previousElement = this.document.querySelector(
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

        this.reorderBuildListByOrder();
      });
  };

  moveComponentDownListener = (element) => {
    element
      .querySelector('[data-action="move-down"]')
      .addEventListener('click', () => {
        const parentElement = element.closest('[data-build-list-order]');
        const currentOrder = parseInt(
          parentElement.getAttribute('data-build-list-order'),
        );
        const listItemCount =
          this.document.querySelector('#build-list').children.length;
        const nextOrder = currentOrder + 1;

        if (nextOrder === listItemCount) {
          return;
        }

        const nextElement = this.document.querySelector(
          '[data-build-list-order="' + nextOrder + '"]',
        );
        nextElement.setAttribute(
          'data-build-list-order',
          currentOrder.toString(),
        );
        parentElement.setAttribute(
          'data-build-list-order',
          nextOrder.toString(),
        );

        this.reorderBuildListByOrder();
      });
  };

  addComponentListener = async (event) => {
    const list = document.querySelector('#build-list');
    const entries = list.querySelectorAll('[data-component]');
    const numberOfEntries = entries.length;

    let html = await this.app.generator.fetchCode(
      new URL('../Templates/componentBuilderEntry.html', import.meta.url),
    );
    html = html.replaceAll(`{{component}}`, event.component);

    const element = new ElementGenerator()
      .setContent(html)
      .setAttributes({
        'data-component': event.component,
        'data-build-list-order': numberOfEntries.toString(),
      })
      .setClasses(['build-list-entry'])
      .append('#build-list')
      .get();

    this.app.buildPanel.addListItemListeners(element);
  };

  removeComponentListener = (element) => {
    element
      .querySelector('[data-action="remove"]')
      .addEventListener('click', () => {
        element
          .closest('[data-build-list-order]')
          .setAttribute('data-build-list-order', -1);
        this.reorderBuildListByOrder();
      });
  };
}
