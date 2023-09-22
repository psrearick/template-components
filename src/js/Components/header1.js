const navbarSelector = "#header-1";
const navbar = document.querySelector(navbarSelector);
const checkbox = document.querySelector(navbarSelector + " input[type=checkbox]");

console.log(document);

checkbox.addEventListener('change', function () {
  console.log('change');
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
