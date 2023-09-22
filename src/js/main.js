import {addElementsToDom, createComponents, createSections, loadFonts} from "./createElements";
import {addEventListeners} from "./addEventListeners";
import {updateResponsiveClasses} from "./updateResponsiveClasses";
import {addContainerQueries} from "./addContainerQueries";
import {loadSiteJS} from "./loadSiteJS";

Promise.all([
  createSections(),
  createComponents(),
])
  .then(async () => await addElementsToDom())
  .then(async (componentCode) => addEventListeners(componentCode))
  .then(async () => updateResponsiveClasses())
  .then(async () => await addContainerQueries())
  .then(async () => await loadSiteJS())
  .then(async () => await loadFonts());





