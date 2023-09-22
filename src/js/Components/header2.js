  const navbarSelector = "#header-2";
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
