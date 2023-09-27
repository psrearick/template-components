// import { addEventListeners } from './addEventListeners';
// import { updateResponsiveClasses } from './updateResponsiveClasses';
// import { addContainerQueries } from './addContainerQueries';
// import { loadSiteJS } from './loadSiteJS';
// import loadFonts from './loadFonts';
// import ComponentGenerator from './componentGenerator';
// import PageBuilder from './pageBuilder';

import EventBus from './eventBus';
import Page from './page';

export const run = async (definitions) => {
  // const pageBuilder = new PageBuilder(generator);

  const page = new Page({
    definitions,
    eventBus: new EventBus()
  });

  await page.generator.createSections();
  await page.generator.addSectionsToDom();

  // generator.createSections()
  //   .then(async () => await generator.addElementsToDom(components))
  //   .then(async () => await addEventListeners(generator))
  //   .then(async () => await updateResponsiveClasses())
  //   .then(async () => await addContainerQueries())
  //   .then(async () => await loadSiteJS(generator))
  //   .then(async () => await pageBuilder.registerListeners())
  //   .then(async () => await loadFonts());
};
