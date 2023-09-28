const navbarSelector = '#{{selector|r}}';
const navbar = document.querySelector(navbarSelector);
const checkbox = document.querySelector(
  navbarSelector + ' input[type=checkbox]',
);

checkbox.addEventListener('change', function () {
  console.log(this.checked);
  if (this.checked) {
    navbar.setAttribute('data-checked', '');
  } else {
    navbar.removeAttribute('data-checked');
  }
});

navbar.querySelectorAll('li, button').forEach((element) => {
  element.addEventListener('click', (event) => {
    console.log(event.target);
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

    regularIcon.classList.add('hidden');
    hiddenIcon.classList.remove('hidden');

    if (isActive) {
      listItem.classList.remove('active');
    } else {
      listItem.classList.add('active');
    }
  });
});
