module.exports = (icons, options) => {
  options = {
    thickness: 2,
    color: 'currentcolor',
    size: '1em',
    default: 'include',
    exceptions: [],
    ...options
  };

  const exceptions = options.exceptions.reduce((o, k) => {
    o[k] = true;
    return o;
  }, {});

  Object.keys(icons)
    .forEach(key => {
      const excludeExcluded = options.default === 'exclude' && !exceptions[key];
      const includeExcluded = options.default === 'include' && exceptions[key];
      if (includeExcluded || excludeExcluded) {
        delete icons[key];
      } else {
        const icon = icons[key];
        icon['stroke-width'] = options.thickness;
        icon['stroke'] = options.color;
        icon['width'] = options.size;
        icon['height'] = options.size;
      }
    });

  return Promise.resolve(icons);
};
