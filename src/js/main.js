import {addElementsToDom, createComponents, createSections, loadFonts} from "./createElements";
import {addEventListeners} from "./addEventListeners";

Promise.all([
  createSections(),
  createComponents(),
])
  .then(addElementsToDom)
  .then(async (componentCode) => await addEventListeners(componentCode))
  .then(loadFonts);
