export const loadSectionComponentScript = () => {
  const sizes = {
    mobile: {
      width: 375,
      height: 667,
    },
    tablet: {
      width: 768,
      height: 1024,
    },
    desktop: {
      width: 1366,
      height: 768,
    },
  };

  document.querySelectorAll(".responsive-button").forEach((button) => {
    button
      .addEventListener("click", (event) => {
        let buttonElement = event.target;

        if (!event.target.hasAttribute('data-button-id')) {
          buttonElement = event.target.closest('[data-button-id]');
        }

        const dataButtonId = buttonElement.getAttribute('data-button-id');
        const componentElement = button.closest('.component');
        const componentName = componentElement.getAttribute('id');
        const frameElement = componentElement.querySelector('#' + componentName + '-frame');
        const targetScreenSizeName = dataButtonId.replace(componentName + '-', '');

        selectScreenSize(targetScreenSizeName, frameElement);
      });
  });

  const selectScreenSize = (screen, element) => {

    const targetScreenSize = sizes[screen];
    const frameWidth = element.getBoundingClientRect().width;

    if (frameWidth !== targetScreenSize.width) {
      element.style.width = targetScreenSize.width + 'px';
      element.style.height = targetScreenSize.height + 'px';

      return;
    }

    element.style.height = targetScreenSize.width + 'px';
    element.style.width = targetScreenSize.height + 'px';
  };
};

