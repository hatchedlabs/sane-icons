module.exports = (icons, options) => {
  options = {
    thickness: 2,
    color: 'currentcolor',
    size: '1em',
    ...options
  };

  Object.values(icons)
    .forEach(icon => {
      icon['stroke-width'] = options.thickness;
      icon['stroke'] = options.color;
      icon['width'] = options.size;
      icon['height'] = options.size;
    });
  return Promise.resolve(icons);
};
