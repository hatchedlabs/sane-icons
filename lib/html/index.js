const fs = require('fs-extra');
const path = require('path');

const makeSvg = (attrs, contents) => {
  const openingTag = `<svg${Object.keys(attrs).map(k => ` ${k}="${`${attrs[k]}`}"`).join('')}>`
  return `${openingTag}${contents || ''}</svg>`;
};

module.exports = ([icons, attrs]) => {
  Object.values(icons)
    .forEach(icon => {
      const tags = [...new Set([icon.name, ...(icon.tags || [])])].map(t => `~${t}`).join('');
      console.log(
        tags,
        makeSvg(
          {
            ...JSON.parse(attrs),
            class: `icon icon-${icon.name}`,
            'data-tags': tags
          },
          icon.contents
        )
      )
    });
};
