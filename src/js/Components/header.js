const navbarSelector = '#{{selector|r}}';
const navbar = document.querySelector(navbarSelector);
const checkbox = document.querySelector(
  navbarSelector + ' input[type=checkbox]',
);

(() => {
  if (!checkbox || !navbar) {
    return;
  }

  checkbox.addEventListener('change', function () {
    if (this.checked) {
      navbar.setAttribute('data-checked', '');
    } else {
      navbar.removeAttribute('data-checked');
    }
  });

  navbar.querySelectorAll('li, button').forEach((element) => {
    element.addEventListener('click', () => {
      checkbox.checked = false;
      const evt = new Event('change');
      checkbox?.dispatchEvent(evt);
    });
  });

  const doc = navbar.ownerDocument;
  const navWindow = doc.defaultView || doc.parentWindow;

  let scroll = () =>
    Math.abs(doc.querySelector('body').getBoundingClientRect().top);

  let previousScroll = scroll();
  let directionDown = true;
  let directionChangeScroll = scroll();

  navWindow.addEventListener('scroll', () => {
    const previousDirectionDown = directionDown;

    directionDown = scroll() - previousScroll > 0;

    if (scroll() < 100) {
      navbar.setAttribute('data-scroll', 'top');

      previousScroll = scroll();

      return;
    }

    if (scroll() < 200 && directionDown) {
      previousScroll = scroll();

      return;
    }

    if (directionDown !== previousDirectionDown) {
      directionChangeScroll = scroll();
    }

    const changeInScroll = scroll() - directionChangeScroll;

    if (changeInScroll > 60) {
      navbar.setAttribute('data-scroll', 'down');

      previousScroll = scroll();

      return;
    }

    if (changeInScroll < -60) {
      navbar.setAttribute('data-scroll', 'up');

      previousScroll = scroll();

      return;
    }

    navbar.setAttribute('data-scroll', 'none');

    previousScroll = scroll();
  });
})();
