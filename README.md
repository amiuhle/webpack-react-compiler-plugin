React webpack compiler plugin for webpack
=========================================

:exclamation:  *This package is currently under active development. Please give feedback by creating an  [Issue](https://github.com/amiuhle/webpack-react-compiler-plugin/issues/new) or a [Pull Request](https://github.com/amiuhle/webpack-react-compiler-plugin/compare)!*

Create isomorphic static sites using webpack and React.

Installation
------------

```bash
npm install webpack-react-compiler-plugin --save-dev
```

Usage
-----

Add `ReactCompilerPlugin` to your `webpack.config.js`.

```js
const ReactCompilerPlugin = require('webpack-react-compiler-plugin')

module.exports = {
  // other config options

  plugins: [
    new ReactCompilerPlugin()
  ]
}
```

In your main entry source file, export the routes to render and call `connect` to hook up to the pre-rendered HTML pages on the client. Add a static `layoutProps` to every page to tell `ReactCompilerPlugin` which component to use as the layout template.

```js
import React, { Component } from 'react'
import connect, { ClientOnly } from 'webpack-react-compiler-plugin/runtime'
import Layout from '../layouts'

class Index extends Component {
  render () {
    // Use `ClientOnly` whenever you're doing client-specific stuff like
    // accessing `window` or `document`
  }
}

// Tell `ReactCompilerPlugin` which component to use as a layout template
Index.layoutProps = {
  layout: Layout,
  title: 'Index'
}

const routes = {
  index: Index,
  home: require('./home')
}
// export pages to render
module.exports = routes
// connect to the prerendered components on the client
connect(routes)
```

Also have a look at [example](example) for a minimal setup.



Caveats
-------

* If you want to have styles, you currently have to create a CSS file using [`extract-text-webpack-plugin`](https://github.com/webpack/extract-text-webpack-plugin)
