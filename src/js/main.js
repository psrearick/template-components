import {addElementsToDom, createComponents, createSections} from "./createElements";
import {addEventListeners} from "./addEventListeners";

Promise.all([
  createSections(),
  createComponents(),
])
  .then(addElementsToDom)
  .then(async (componentCode) => await addEventListeners(componentCode));
