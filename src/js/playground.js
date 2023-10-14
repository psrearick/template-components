import { components, sections } from './playgroundElementDefinitions';
import { run } from './main';

(async () => {
  const app = await run({ components, sections });

  app.eventBus.subscribeOnce('componentAddedToDom', ({ component }) => {
    app.resizer.resizeScreenSize(
      'desktop',
      component.element.querySelector('.frame'),
    );
  });

  app.toggleAllSections();
})();
