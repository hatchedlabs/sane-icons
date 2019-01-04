const { icons: featherIcons } = require('feather-icons');

module.exports = customIcons =>
  new Promise(resolve => {
    customIcons.forEach(icon => {
      featherIcons[icon.name] = {
        ...(featherIcons[icon.name] || {}),
        ...icon
      };
    });
    return resolve(featherIcons);
  });
