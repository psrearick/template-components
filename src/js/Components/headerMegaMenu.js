const navbarSelector = '#{{selector|r}}';
const navbar = document.querySelector(navbarSelector);
const checkbox = document.querySelector(
  navbarSelector + ' input[type=checkbox]',
);

checkbox.addEventListener('change', function () {
  if (this.checked) {
    navbar.setAttribute('data-checked', '');
  } else {
    navbar.removeAttribute('data-checked');
  }
});

navbar.querySelectorAll('li, button').forEach((element) => {
  element.addEventListener('click', (event) => {
    if (event.target.closest('.noclick')) {
      return;
    }

    checkbox.checked = false;
    const evt = new Event('change');
    checkbox.dispatchEvent(evt);
  });
});

navbar.querySelectorAll('li.menu').forEach((title) => {
  title.addEventListener('click', (event) => {
    const listItem = event.target.closest('li');
    const isActive = listItem.classList.contains('active');
    const hiddenIcon = listItem.querySelector('svg.hidden');
    const regularIcon = listItem.querySelector('svg:not(.hidden)');

    const dataMenuItems = Array.from(
      navbar.querySelectorAll('[data-menu-content]'),
    );

    if (dataMenuItems.length > 0 && !isActive) {
      navbar.setAttribute('data-active', '');
    }

    listItem.querySelectorAll('[data-menu-content]').forEach((content) => {
      const id = content.getAttribute('data-menu-content');
      const container = content.closest('[data-menu-container="' + id + '"]');

      if (container && isActive) {
        container.innerHTML = '';
        return;
      }

      navbar
        .querySelectorAll('[data-menu-container="' + id + '"]')
        .forEach((container) => {
          if (!isActive && container.innerHTML === '') {
            container.append(content.cloneNode(true));
            const child = container.lastChild;
            child.classList.remove('hidden');
            child.classList.add(child.getAttribute('data-active-display'));
          }

          const contentContainer = container.closest(
            '.hidden-content-container',
          );

          if (!contentContainer) {
            return;
          }

          if (isActive) {
            contentContainer.classList.remove('active');

            return;
          }

          contentContainer.classList.add('active');
        });
    });

    if (dataMenuItems.length > 0 && isActive) {
      setTimeout(() => navbar.removeAttribute('data-active'), 300);
    }

    regularIcon.classList.add('hidden');
    hiddenIcon.classList.remove('hidden');

    if (isActive) {
      listItem.classList.remove('active');
    } else {
      listItem.classList.add('active');
    }
  });
});
