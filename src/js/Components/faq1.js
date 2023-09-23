const faqSelector = '#faq-1';

document
  .querySelectorAll(faqSelector + ' .accordion > li > .accordion-title')
  .forEach((title) => {
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
