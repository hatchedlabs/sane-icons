const testCustomIcons = require('./customIcons.data.js');
const testCustomOptions = require('./customOptions.data.js');

module.exports = generate =>
  new Promise((resolve, reject) => {
    return resolve(
      generate('reactComponent', testCustomOptions, testCustomIcons)
        .then(() => generate('reactComponents', testCustomOptions, testCustomIcons))
        .then(() => generate('svg', testCustomOptions, testCustomIcons))
    );
  });
