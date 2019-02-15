const fs = require('fs-extra');
const path = require('path');

const makeSvg = (attrs, contents) => {
  const openingTag = `<svg${Object.keys(attrs).map(k => ` ${k}="${`${attrs[k]}`}"`).join('')}>`
  return `${openingTag}${contents || ''}</svg>`;
};

/* eslint-disable indent */
module.exports = ([icons, attrs]) => {
  const html = `<!doctype html>
<html>
<head>
  <title>Icon Documentation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    #icons {
      display: flex;
      flex-wrap: wrap;
    }
    #search {
      border: 1px solid #000;
      font-size: 18px;
      padding: 4px 8px;
      margin-bottom: 8px;
    }
    .container {
      height: 60px;
      width: 60px;
      padding: 2px;
      text-align: center;
      font-size: 24px;
    }
    [class^="icon-"], [class*=" icon-"] {
      height: 1em;
      width: 1em;
      fill: none;
      stroke: currentcolor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .name {
      font-size: 10px;
      line-height: 1.2;
      font-weight: 600;
      font-family: sans-serif;
    }
  </style>
</head>
<body>
  <input id="search" type="text" placeholder="Search" onkeyup="keyUp(event)">
  <div id="icons">
    ${
      Object.values(icons)
        .map(icon => {
          const tags = [...new Set([icon.name, ...(icon.tags || [])])].map(t => `~${t}`).join('');
          return `
            <div class="container" data-tags="${tags}">
              ${
                makeSvg(
                  {
                    xmlns: 'http://www.w3.org/2000/svg',
                    viewBox: '0 0 24 24',
                    class: `icon-${icon.name}`
                  },
                  icon.contents
                )
              }
              <div class="name">${icon.name}</div>
            </div>
          `;
        })
        .join('')
    }
  </div>
  <script>
    var lastValue = '';
    var icons = [].slice.call(document.getElementById('icons').children, 0);
    window.keyUp = function (event) {
      var value = event.target.value.toLowerCase();
      if (value !== lastValue) {
        lastValue = value;
        icons.forEach(function (el) {
          if (!value) {
            el.style.display = 'block';
            el.style.order = 'initial';
          } else {
            el._tags = el._tags || el.getAttribute('data-tags');
            var match = el._tags.indexOf('~' + value) + 1;
            if (match) {
              el.style.display = 'block';
              el.style.order = match + '';
            } else {
              el.style.display = 'none';
            }
          }
        });
      }
    };
  </script>
</body>
</html>`;

  return fs.mkdirp(path.join(__dirname, '../../dist/html'))
    .then(() =>
      fs.writeFile(
        path.join(__dirname, '../../dist/html/index.html'),
        html
      )
    );
};
