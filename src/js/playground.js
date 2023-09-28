import { components, sections } from './playgroundElementDefinitions';
import { run } from './main';

(async () => {
  const app = await run({ components, sections });

  app.toggleAllSections();
})();
