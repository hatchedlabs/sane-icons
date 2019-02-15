const fs = require('fs-extra');
const path = require('path');
const fontify = require('webfonts-generator');

module.exports = ([icons, attrs]) =>
  new Promise((resolve, reject) => {
    fontify({
      files: (
        fs.readdirSync(path.join(__dirname, '../../dist/svg'))
          .map(name => path.join(__dirname, '../../dist/svg', name))
      ),
      dest: path.join(__dirname, '../../dist/ttf')
    }, error => {
      if (error) return reject(error);
      else return resolve();
    });
  });
