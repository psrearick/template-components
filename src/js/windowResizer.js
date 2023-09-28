export default class WindowResizer {
  sizes = {
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

  handleResizeEvent = (event, button) => {
    let buttonElement = event.target;

    if (!event.target.hasAttribute('data-button-id')) {
      buttonElement = event.target.closest('[data-button-id]');
    }

    const dataButtonId = buttonElement.getAttribute('data-button-id');
    const componentElement = button.closest('.component');
    const componentName = componentElement.getAttribute('id');
    const frameElement = componentElement.querySelector(
      '#' + componentName + '-frame',
    );
    const targetScreenSizeName = dataButtonId.replace(componentName + '-', '');

    this.resizeScreenSize(targetScreenSizeName, frameElement);
  };

  resetScreenSize = (element) => {
    element.style.width = '';
    element.style.height = '';
    element.style.transform = '';
    element.style.marginTop = '';
    element.style.marginBottom = '';
    element.style.resize = '';
    element.style.marginLeft = '';
    element.style.marginRight = '';
  };

  resizeScreenSize = (screen, element, ratio = 0.8) => {
    const wrapper = element.closest('.wrapper');
    const targetScreenSize = this.sizes[screen] || {};
    this.resizeObserver.unobserve(wrapper);

    this.resetScreenSize(element);
    this.resetScreenSize(wrapper);

    if (Object.keys(this.sizes).indexOf(screen) === -1) {
      element.removeAttribute('data-exact-size');
    }

    const rotate = this.shouldRotateScreen(element, screen);

    const component = element.closest('.component-container');
    const componentWidth = component.getBoundingClientRect().width;

    let targetHeight = targetScreenSize.height;
    let targetWidth = targetScreenSize.width;
    wrapper.style.resize = 'none';

    const reset = !targetHeight || !targetWidth;

    if (reset) {
      let elementDimensions = element.firstChild?.getBoundingClientRect();
      if (element.tagName === 'IFRAME') {
        elementDimensions = component.getBoundingClientRect();
      } else {
        wrapper.style.resize = 'both';
        this.resizeObserver.observe(wrapper);
      }

      targetHeight = Math.min(
        window.innerHeight * ratio,
        elementDimensions.height,
      );
      targetWidth = Math.min(componentWidth, elementDimensions.width);
      element.removeAttribute('data-exact-size');
    }

    element.style.width = (rotate ? targetHeight : targetWidth) + 'px';
    element.style.height = (rotate ? targetWidth : targetHeight) + 'px';

    const originSelector = element.getAttribute('data-origin');
    const originHeight = originSelector
      ? element.closest(originSelector).getBoundingClientRect().height
      : window.innerHeight;

    let frameDimensions = element.getBoundingClientRect();
    let frameHeight = frameDimensions.height;
    const frameWidth = frameDimensions.width;
    const currentScale = frameHeight / originHeight;
    let scale = ratio / currentScale;
    const scaledWidth = frameWidth * scale;

    if (scaledWidth > componentWidth) {
      scale = componentWidth / frameWidth;
    }

    element.style.transform = 'scale(' + Math.min(scale, 1).toFixed(2) + ')';

    wrapper.style.height =
      element.getBoundingClientRect().height.toString() + 'px';
    wrapper.style.width =
      element.getBoundingClientRect().width.toString() + 'px';
  };

  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const frame = entry.target.closest('.wrapper').querySelector('.frame');

      frame.style.height = entry.contentBoxSize[0].blockSize + 'px';
      frame.style.width = entry.contentBoxSize[0].inlineSize + 'px';
    }
  });

  shouldRotateScreen = (element, screen) => {
    let rotate;

    if (!element.hasAttribute('data-exact-size')) {
      element.setAttribute('data-exact-size', screen + '-reset');
    }

    const attribute = element.getAttribute('data-exact-size');

    if (
      attribute.indexOf('-reset') > -1 ||
      attribute.indexOf('-rotated') > -1
    ) {
      element.setAttribute('data-exact-size', screen);
      rotate = false;
    } else {
      element.setAttribute('data-exact-size', screen + '-rotated');
      rotate = true;
    }

    return rotate;
  };
}
