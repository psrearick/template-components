import { bodyScroll } from './utilities';

export default class BuildPanel {
  constructor(app = document) {
    this.app = app;

    this.hideBuildPanelListener();
    this.toggleBuildPanelListener();
    this.cancelButtonListener();
    this.open = false;
  }

  hideBuildPanelListener = () => {
    this.app
      .querySelector('#hide-build-panel')
      .addEventListener('click', () => {
        this.hideBuildPanel();
      });
  };

  toggleBuildPanel = () => {
    if (this.app.querySelector('#build-panel').classList.contains('hidden')) {
      this.showBuildPanel();

      return;
    }

    this.hideBuildPanel();
  };

  toggleBuildPanelListener = () => {
    this.app
      .querySelector('#show-build-panel')
      .addEventListener('click', this.toggleBuildPanel);
  };

  cancelBuild = () => {
    this.open = false;
    this.app.querySelectorAll('.add-component-button').forEach((element) => {
      element.closest('button').classList.add('hidden');
    });

    this.clearBuildList();

    this.hideBuildPanel();
  };

  cancelButtonListener = () => {
    this.app
      .querySelector('#cancel-build')
      .addEventListener('click', this.cancelBuild);
  };

  showBuildPanel = () => {
    bodyScroll(true);
    this.open = true;
    this.app.querySelector('#build-panel').classList.remove('hidden');
    this.app.querySelectorAll('.add-component-button').forEach((element) => {
      element.closest('button').classList.remove('hidden');
    });
  };

  hideBuildPanel = () => {
    bodyScroll(false);
    this.app.querySelector('#build-panel').classList.add('hidden');
  };

  clearBuildList = () => {
    this.app.querySelector('#build-list').innerHTML = null;
  };

  reorderBuildListByOrder = () => {
    const buildList = this.app.querySelector('#build-list');
    const items = Array.from(buildList.children)
      .filter((item) => item.getAttribute('data-build-list-order') > -1)
      .sort((a, b) =>
        a.getAttribute('data-build-list-order') >
        b.getAttribute('data-build-list-order')
          ? 1
          : -1,
      );

    const elements = this.app.createDocumentFragment();

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

        const previousElement = this.app.querySelector(
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
          this.app.querySelector('#build-list').children.length;
        const nextOrder = currentOrder + 1;

        if (nextOrder === listItemCount) {
          return;
        }

        const nextElement = this.app.querySelector(
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
