import {addElementsToDom, createComponents, createSections, loadFonts} from "./createElements";
import {addEventListeners} from "./addEventListeners";
import {updateResponsiveClasses} from "./updateResponsiveClasses";
import {addContainerQueries} from "./addContainerQueries";
import {loadSectionComponentScript} from "./sectionComponent";

Promise.all([
  createSections(),
  createComponents(),
])
  .then(async () => await addElementsToDom())
  .then(async (componentCode) => await addEventListeners(componentCode))
  .then(async () => updateResponsiveClasses())
  .then(async () => await addContainerQueries())
  .then(async () => await loadFonts())
  .then(loadSectionComponentScript);


