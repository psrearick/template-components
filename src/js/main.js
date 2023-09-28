// import PageBuilder from './pageBuilder';
import App from './app';
import loadFonts from './loadFonts';
import { addContainerQueries } from './addContainerQueries';
import PageBuilder from './pageBuilder';

export const run = async (definitions) => {
  const app = new App({ definitions });

  const pageBuilder = new PageBuilder(app.generator);
  await app.generator.createSections();
  await app.generator.addSectionsToDom();
  await addContainerQueries();

  await pageBuilder.registerListeners();
  await loadFonts(document);

  return app;
};
