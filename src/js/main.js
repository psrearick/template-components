// import { loadSiteJS } from './loadSiteJS';
// import loadFonts from './loadFonts';
// import ComponentGenerator from './componentGenerator';
// import PageBuilder from './pageBuilder';


import App from './app';
import { addContainerQueries } from './addContainerQueries';

export const run = async (definitions) => {
  const app = new App({definitions});



  // const pageBuilder = new PageBuilder(generator);

  await app.generator.createSections();
  await app.generator.addSectionsToDom();
  await addContainerQueries();

  //   .then(async () => await loadSiteJS(generator))
  //   .then(async () => await pageBuilder.registerListeners())
  //   .then(async () => await loadFonts());
};
