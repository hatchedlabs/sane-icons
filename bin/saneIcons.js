const fs = require('fs-extra');
const path = require('path');

const mergeIcons = require('../lib/mergeIcons.js');
const applyOptionsToIcons = require('../lib/applyOptionsToIcons.js');
const filterIcons = require('../lib/filterIcons.js');

const test = require('../test/saneIcons.spec.js');

const targets = {
  svg: [require('../lib/svg')],
  reactComponent: [require('../lib/reactComponent')],
  reactComponents: [require('../lib/reactComponents')],
  html: [require('../lib/html')]
  // ttf: ['svg', require('../lib/ttf')] (broken atm as glyphs ignore strokes)
  // requires package: "webfonts-generator": "^0.4.0"
};

const generate = (target, options = {}, customIcons = [], dir = path.join(__dirname, 'dist')) =>
  new Promise((resolve, reject) => {
    if (targets[target]) {
      resolve(
        fs.remove(path.join(dir, target))
          .then(() => mergeIcons(customIcons))
          .then(icons => applyOptionsToIcons(icons, options))
          .then(filterIcons)
          .then(icons => {
            const list = targets[target];
            let currentPromise = Promise.resolve();
            let lastPromise = Promise.resolve();
            while (list.length) {
              const el = list.shift();
              if (typeof el === 'function') {
                currentPromise.then(() => {
                  if (list.length) {
                    currentPromise = el(icons);
                  } else {
                    lastPromise = el(icons);
                  }
                });
              } else {
                list.unshift(...targets[el]);
              }
            }
            return lastPromise;
          })
      );
    } else {
      reject(
        new Error(
          `invalid target. must be one of {"${Object.keys(targets).join('", "')}"}
        `)
      );
    }
  });

if (require.main === module) {
  test(generate)
    .then(() => console.log('tests passed.'))
    .catch(err => {
      console.log('tests failed:');
      console.error(err);
    });
}
module.exports = generate;
