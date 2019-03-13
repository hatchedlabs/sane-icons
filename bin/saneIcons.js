const fs = require('fs-extra');
const path = require('path');

const mergeIcons = require('../lib/mergeIcons.js');
const applyOptionsToIcons = require('../lib/applyOptionsToIcons.js');
const filterIcons = require('../lib/filterIcons.js');

const test = require('../test/saneIcons.spec.js');

const targets = {
  svg: require('../lib/svg'),
  reactComponent: require('../lib/reactComponent'),
  reactComponents: require('../lib/reactComponents'),
  html: require('../lib/html')
};

const generate = (target, options = {}, customIcons = [], dir = path.join(__dirname, '../dist', target)) =>
  new Promise((resolve, reject) => {
    if (targets[target]) {
      resolve(
        fs.remove(dir)
          .then(() => mergeIcons(customIcons))
          .then(icons => applyOptionsToIcons(icons, options))
          .then(filterIcons)
          .then(icons => (targets[target](icons, dir)))
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

generate.allTargets = Object.keys(targets);

module.exports = generate;
