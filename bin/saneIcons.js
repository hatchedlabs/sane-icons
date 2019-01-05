const fs = require('fs-extra');
const path = require('path');

const mergeIcons = require('../lib/mergeIcons.js');
const filterIcons = require('../lib/filterIcons.js');

const test = require('../test/saneIcons.spec.js');

const targets = {
  reactComponent: require('../lib/reactComponent'),
  reactComponents: require('../lib/reactComponents')
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
          .then(icons => targets[target](icons))
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
