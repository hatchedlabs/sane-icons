module.exports = [
  {
    name: 'smartphone',
    contents: '<rect x="6" y="2" width="12" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12" y2="18"></line>',
    tags: ['phone', 'mobile', 'cell']
  },
  {
    name: 'loading',
    contents: '<path d="M 12 2 a 10 10 0 1 0 6 2"></path>',
    tags: ['loading', 'load', 'loader'],
    attrs: {
      xmlns: 'http://www.w3.org/2000/svg',
      width: 24,
      height: 24,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': 2,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
      class: 'feather feather-loading'
    }
  }
];
