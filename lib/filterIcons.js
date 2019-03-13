module.exports = icons =>
  new Promise((resolve, reject) => {
    const attrCombos = {};
    let maxAttrCombo = '';
    let maxAttrComboCount = 0;

    // find most common attribute combo
    Object.values(icons).forEach(({ attrs: { 'class': _, ...attrs } }) => {
      const attrCombo = JSON.stringify(attrs);
      attrCombos[attrCombo] = (attrCombos[attrCombo] || 0) + 1;
      if (attrCombos[attrCombo] > maxAttrComboCount) {
        maxAttrCombo = attrCombo;
        maxAttrComboCount = attrCombos[attrCombo];
      }
    });

    if (maxAttrComboCount < 250) {
      return reject(new Error('something weird happened with feather icons. check the versions of both this library and feather icons'));
    }

    // remove any icons that don't use the most common attribute combo
    const filteredIcons = {};
    Object.values(icons).forEach(icon => {
      const { name, attrs: { 'class': _, ...attrs } } = icon;
      if (JSON.stringify(attrs) === maxAttrCombo) filteredIcons[name] = icon;
    });

    // return the rest
    resolve([filteredIcons, maxAttrCombo]);
  });
