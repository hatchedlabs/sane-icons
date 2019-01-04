const fs = require('fs-extra');
const path = require('path');

const mergeIcons = require('../lib/mergeIcons.js');
const filterIcons = require('../lib/filterIcons.js');

const reactComponent = require('../lib/reactComponent');

const test = require('../test/saneIcons.spec.js');

const targets = { reactComponent };

const generate = (target, options = {}, customIcons = []) =>
  fs.remove(path.join(__dirname, 'dist'))
    .then(() => {
      if (targets[target]) {
        options = {
          strokeWidth: 2,
          ...options
        };

        return mergeIcons(customIcons)
          .then(filterIcons)
          .then(icons => targets[target](icons));
      } else {
        throw new Error(
          `invalid target. must be one of {"${Object.keys(targets).join('", "')}"}
        `);
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
