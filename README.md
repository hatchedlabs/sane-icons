# Sane icons

This is a useful layer between the feather-icons library and your implementation.

It aims to achieve three goals that feather-icons does not:
  - **Extensibility**
    - Can add custom icons
    - Can overwrite default icons with custom ones
  - **Convenient implementation for various front ends**
    - a directory of SVGs (for serving on a static server)
    - a directory of PNGs (for serving on a static server)
    - a TTF icon font (for use as a custom font on iOS and Android)
    - a WOFF2/WOFF icon font (for use as a web font)
    - a React icon component
  - **No per-icon custom attributes**
    - This restriction makes the whole icon set tiny
      (less than 10KB gzipped, for reference ReactDOM is 32KB gzipped)
    - Helps design uniformity

It uses feather-icons as a dependency, so you won't miss out on the latest
icons added to the original project.

## Usage

This package is available either as this Git repo, or as the npm repo "sane-icons".

```bash
yarn add sane-icons
```

To add custom icons, ...

To generate assets, ...

## Motivations

### Extensibility

Different projects and teams have different needs.

There is rarely a way to use custom icons in a developer friendly way, which
brings me to...

### Convenient implementation for various front ends

Pre-made implementations designed to give a simple development experience.

- `reactComponent`
  - a single react component that contains all the icons
  - very efficient, provided you remove all (or at least most) of the unused icons
    in the build options
  - uses PureComponent by default, to avoid unnecessary rerendering
  - example usage: `<Icon alert-circle />`
  - [See example on JSFiddle](https://jsfiddle.net/amn7x6L0)
- `reactComponents`
  - a react component for every icon (generally, use `reactComponent` instead)
  - takes longer to build as it runs prettier on every generated file
  - massively less efficient per icon than `reactComponent` (10x the gzip'd bundle size),
    more so when using PureComponent
  - guarantees no unused icons in webpack builds
  - example usage:
    - `import AlertCircleIcon from "../icons/AlertCircleIcon"`
    - `<AlertCircleIcon />`

### No per-icon custom attributes

In the original feather icons library, they did well to keep to their
default svg attributes across all of their icons.

This is the SVG code for the alert-triangle icon:

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden="true"
>
  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
  <line x1="12" y1="9" x2="12" y2="13"></line>
  <line x1="12" y1="17" x2="12" y2="17"></line>
</svg>
```

The majority of the code is contained in the `<svg ...>` tag, but these are the same for
every icon, which means we can strip this and generate it on the client.

Here's a plain old JS example:

```html
<script>
  function makeIcon (svgBody) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + svgBody + '</svg>';
  }

  var icons = {
    'alert-triangle': '<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line>',
    'arrow-right-circle': '<circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line>',
    // ...
  };

  document.write(makeIcon(icons['alert-triangle']));
  document.write(makeIcon(icons['arrow-right-circle']));
</script>
```

[See result on JSFiddle](https://jsfiddle.net/vhesjmLg/)
