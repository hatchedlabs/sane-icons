const fs = require('fs-extra');
const path = require('path');
const { default: svgr } = require('@svgr/core');

let openingTag = null;
const makeSvg = (attrs, contents) => {
  openingTag = openingTag || `<svg${Object.keys(attrs).map(k => ` ${k}="${`${attrs[k]}`}"`).join('')}>`
  return `${openingTag}${contents || ''}</svg>`;
};

const templateOuter = ({ template }, opts, { imports, componentName, props, jsx, exports }) => {
  // render icons[iconName] as the svg el's child
  jsx.openingElement.selfClosing = false;
  jsx.children = [{
    type: 'JSXExpressionContainer',
    expression: {
      type: 'MemberExpression',
      computed: true,
      object: { type: 'Identifier', name: 'icons' },
      property: { type: 'Identifier', name: 'iconName' }
    }
  }];
  jsx.closingElement = {
    type: 'JSXClosingElement',
    name: { type: 'JSXIdentifier', name: 'svg' }
  };

  return template.ast`
    import React, { PureComponent } from "react";

    class Icon extends PureComponent {
      render () {
        const { props } = this;
        const iconName = Object.keys(props).find(k => ((props[k] === true) && icons[k]));
        if (!iconName) throw new Error("Add the icon's name to <Icon />, e.g. <Icon alert-circle />");
        return ${jsx};
      }
    }

    export default Icon;
  `;
};

const templateInner = ({ template }, opts, { imports, componentName, props, jsx, exports }) => {
  // remove attrs from svg to allow for later regex
  jsx.openingElement.attributes = [];

  const numberOfChildren = {
    type: 'NumericLiteral',
    value: `${jsx.children.length}`
  };

  return template.ast`
    import React from "react";
    const N = ${numberOfChildren};
    const C = () => ${jsx};
    export default C;
  `;
};

const svgo = '@svgr/plugin-svgo';
const jsx = '@svgr/plugin-jsx';
const prettier = '@svgr/plugin-prettier';

module.exports = ([icons, attrs], dir) =>
  svgr(makeSvg(JSON.parse(attrs)), { plugins: [svgo, jsx, prettier], template: templateOuter })
    .then(iconJSX =>
      Promise.all(
        Object.values(icons).map(({ name, contents }) =>
          svgr(makeSvg(null, contents), { plugins: [jsx], template: templateInner })
            .then(jsx => ({ name, jsx }))
        )
      ).then(iconsJSX => ({ iconJSX, iconsJSX }))
    )
    .then(({ iconJSX, iconsJSX }) => {
      const iconContentsAsArray = iconsJSX
        .map(({ name, jsx }) => {
          const numberOfChildren = parseInt(jsx.match(/const +N *= *([^; ]+) *;/)[1]);

          const startOfChildren = jsx.indexOf('<svg {...props}>') + 16;
          const endOfChildren = jsx.indexOf('</svg>');

          const contentsJSX = (numberOfChildren === 1)
            ? jsx.substring(startOfChildren, endOfChildren)
            : `<g>${jsx.substring(startOfChildren, endOfChildren)}</g>`;

          return `${JSON.stringify(name)}: ${contentsJSX}`;
        })
        .join(',\n  ');

      return iconJSX.replace(/class Icon/g, `const icons = {\n  ${iconContentsAsArray}\n};\n\nclass Icon`);
    })
    .then(reactComponentFile =>
      fs.mkdirp(dir)
        .then(() =>
          fs.writeFile(path.join(dir, 'reactComponent.jsx'), reactComponentFile)
        )
    );
