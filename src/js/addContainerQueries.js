export const addContainerQueries = async () => {
  let rules = {};
  const querySheet = new CSSStyleSheet();
  const sheets = Array.from(document.styleSheets);
  document.adoptedStyleSheets = [querySheet];

  sheets.forEach((sheet) => {
    const sheetRules = Array.from(sheet.cssRules);

    sheetRules.forEach((sheetRule) => {
      if (sheetRule.media && sheetRule.cssText.indexOf('@media print') === -1) {
        const condition = sheetRule.conditionText;

        if (Object.keys(rules).indexOf(condition) === -1) {
          rules[condition] = [];
        }

        Array.from(sheetRule.cssRules).forEach((rule) => {
          const selector = rule.selectorText.replace('.', '.\\@');
          const ruleText = rule.cssText.replace(rule.selectorText, selector);
          rules[condition].push(ruleText);
        });
      }
    });
  });

  const rulesText = [];

  Object.keys(rules).forEach((condition) => {
    rulesText.push('@container ');
    rulesText.push(condition);
    rulesText.push(' {');
    rules[condition].forEach((rule) => {
      rulesText.push(rule);
    });
    rulesText.push(' }');
  });

  rulesText.push('}');

  const joinedText = rulesText.join('');

  await querySheet.replaceSync(joinedText);
};
