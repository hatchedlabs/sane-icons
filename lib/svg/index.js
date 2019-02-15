const fs = require('fs-extra');
const path = require('path');

const makeSvg = (attrs, contents) => {
  const openingTag = `<svg${Object.keys(attrs).map(k => ` ${k}="${`${attrs[k]}`}"`).join('')}>`;
  return `${openingTag}${contents || ''}</svg>`;
};

module.exports = ([icons, attrs]) => {
  return Promise.resolve(
    Object.values(icons)
      .map(icon => ({
        name: icon.name,
        svg: makeSvg(
          JSON.parse(attrs),
          icon.contents
        )
      }))
  )
    .then(svgs =>
      fs.mkdirp(path.join(__dirname, '../../dist/svg'))
        .then(() =>
          Promise.all(
            svgs.map(({ name, svg }) =>
              fs.writeFile(
                path.join(__dirname, `../../dist/svg/${name}.svg`),
                svg
              )
            )
          )
        )
    );
};
