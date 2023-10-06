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

  // let previousContainerScroll = 0;
  let container = navbar.closest('.component-container');

  let scrollY = container
    ? container.getBoundingClientRect().top - navbar.getBoundingClientRect().top
    : window.scrollY;
  //
  let previousScroll = scrollY;
  let directionDown = true;
  let directionChangeScroll = scrollY;

  document.querySelectorAll('*').forEach((el) =>
    el.addEventListener('scroll', () => {
      // navbar.addEventListener('scroll', () => {
      let scroll = window.scrollY;

      const previousDirectionDown = directionDown;
      if (container) {
        scroll =
          container.getBoundingClientRect().top -
          navbar.getBoundingClientRect().top;
      }

      directionDown = scroll - previousScroll > 0;

      console.log(scroll);

      if (scroll < 100) {
        navbar.setAttribute('data-scroll', 'top');

        previousScroll = scroll;

        return;
      }

      if (scroll < 200 && directionDown) {
        previousScroll = scroll;

        return;
      }

      if (directionDown !== previousDirectionDown) {
        directionChangeScroll = scroll;
      }

      const changeInScroll = scroll - directionChangeScroll;

      console.log(changeInScroll);

      if (changeInScroll > 60) {
        navbar.setAttribute('data-scroll', 'down');

        previousScroll = scroll;

        return;
      }

      if (changeInScroll < -60) {
        navbar.setAttribute('data-scroll', 'up');

        previousScroll = scroll;

        return;
      }

      navbar.setAttribute('data-scroll', 'none');

      previousScroll = scroll;
    }),
  );
})();
