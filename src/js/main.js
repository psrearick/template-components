import { addEventListeners } from './addEventListeners';
import { updateResponsiveClasses } from './updateResponsiveClasses';
import { addContainerQueries } from './addContainerQueries';
import { loadSiteJS } from './loadSiteJS';
import loadFonts from './loadFonts';
import ComponentGenerator from './componentGenerator';
import PageBuilder from './pageBuilder';

export const run = (definitions) => {
  const generator = new ComponentGenerator(definitions);
  const pageBuilder = new PageBuilder(generator);

  Promise.all([generator.createSections(), generator.createComponents()])
    .then(async () => await generator.addElementsToDom())
    .then(async () => addEventListeners(generator))
    .then(async () => updateResponsiveClasses())
    .then(async () => await addContainerQueries())
    .then(async () => await loadSiteJS(generator))
    .then(async () => await pageBuilder.registerListeners())
    .then(async () => await loadFonts());
};
