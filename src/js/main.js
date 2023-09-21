import {addElementsToDom, createComponents, createSections, loadFonts} from "./createElements";
import {addEventListeners} from "./addEventListeners";
import {updateResponsiveClasses} from "./updateResponsiveClasses";
import {addContainerQueries} from "./addContainerQueries";

Promise.all([
  createSections(),
  createComponents(),
])
  .then(async () => await addElementsToDom())
  .then((componentCode) => addEventListeners(componentCode))
  .then(async () => updateResponsiveClasses())
  .then(async () => await addContainerQueries())
  .then(async () => await loadFonts());


