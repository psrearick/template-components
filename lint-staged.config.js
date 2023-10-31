/* eslint-env node */
const eslintCommand = 'eslint --fix src --ext .js';
const formatCommand = 'prettier src --write';
const stylelintCommand =
  'stylelint --allow-empty-input --fix "src/**/*.{css,scss}"';
module.exports = {
  '*.{js,jsx,ts,tsx}': [formatCommand, eslintCommand],
  '*.{css,scss}': [formatCommand, stylelintCommand],
  '!*.{js,jsx,ts,tsx,css,scss}': [formatCommand],
};
