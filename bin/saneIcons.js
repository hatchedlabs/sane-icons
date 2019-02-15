const fs = require('fs-extra');
const path = require('path');

const mergeIcons = require('../lib/mergeIcons.js');
const filterIcons = require('../lib/filterIcons.js');

const test = require('../test/saneIcons.spec.js');

const targets = {
  svg: [require('../lib/svg')],
  reactComponent: [require('../lib/reactComponent')],
  reactComponents: [require('../lib/reactComponents')],
  html: [require('../lib/html')],
  // ttf: ['svg', require('../lib/ttf')]
  // (doesn't work as glyphs dont support stroke width and even odd)
};

const generate = (target, options = {}, customIcons = []) =>
  new Promise((resolve, reject) => {
    if (targets[target]) {
      options = {
        strokeWidth: 2,
        ...options
      };

      resolve(
        fs.remove(path.join(__dirname, 'dist', target))
          .then(() => mergeIcons(customIcons))
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
