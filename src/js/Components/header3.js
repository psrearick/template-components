const navbarSelector = "#header-3";
const body = document.querySelector("body");
const navbar = document.querySelector(navbarSelector);
const checkbox = document.querySelector(navbarSelector + " input[type=checkbox]");

checkbox.addEventListener('change', function () {
  if (this.checked) {
    navbar.setAttribute('data-checked', '');
    body.classList.add('overflow-hidden');
  } else {
    navbar.removeAttribute('data-checked');
    body.classList.remove('overflow-hidden');
  }
});
