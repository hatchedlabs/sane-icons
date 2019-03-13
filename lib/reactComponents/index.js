const fs = require('fs-extra');
const path = require('path');
const { default: svgr } = require('@svgr/core');

let openingTag = null;
const makeSvg = (attrs, contents) => {
  openingTag = openingTag || `<svg${Object.keys(attrs).map(k => ` ${k}="${`${attrs[k]}`}"`).join('')}>`
  return `${openingTag}${contents || ''}</svg>`;
};

const template = ({ template }, opts, { imports, componentName, props, jsx, exports }) =>
  template.ast`
    import React from "react";

    const ComponentName = props => ${jsx};

    export default ComponentName;
  `;

const jsx = '@svgr/plugin-jsx';
const prettier = '@svgr/plugin-prettier';

module.exports = ([icons, attrs], dir) =>
  Promise.all(
    Object.values(icons).map(({ name, contents }) => {
      const pascalCasedName = name
        .split('-')
        .map(w => (w.length ? `${w[0].toUpperCase()}${w.substring(1)}` : w))
        .join('');
      const componentName = `${pascalCasedName}Icon`;
      return svgr(
        makeSvg(JSON.parse(attrs), contents),
        { plugins: [jsx, prettier], template }
      ).then(jsx => ({
        name: componentName,
        jsx: jsx.replace(/ComponentName/g, componentName)
      }));
    })
  )
    .then(iconsJSX =>
      fs.mkdirp(dir)
        .then(() =>
          Promise.all(
            iconsJSX.map(({ name, jsx }) =>
              fs.writeFile(
                path.join(dir, `${name}.jsx`),
                jsx
              )
            )
          )
        )
    );
