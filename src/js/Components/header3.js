const navbarSelector = "#header-3";
const navbar = document.querySelector(navbarSelector);
const checkbox = document.querySelector(navbarSelector + " input[type=checkbox]");

checkbox.addEventListener('change', function () {
  if (this.checked) {
    navbar.setAttribute('data-checked', '');
  } else {
    navbar.removeAttribute('data-checked');
  }
});
