/* eslint no-eval: "off" */
const React = require('react')
const ReactDOMServer = require('react-dom/server')

class ReactCompilerPlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    compiler.plugin('emit', (compilation, done) => {
      const assets = compilation.assets

      try {
        const pages = eval(assets['bundle.js'].source())

        for (let route in pages) {
          if (pages.hasOwnProperty(route)) {
            const Page = pages[route]

            const Layout = Page.layoutProps.layout

            let page = React.createElement(Page)

            if (Layout) {
              page = React.createElement(Layout, Page.layoutProps, page)
            }

            const content = ReactDOMServer.renderToString(page)

            if (route === 'default') {
              route = 'index'
            }
            compilation.assets[`${route}.html`] = {
              source: () => content,
              size: () => content.length
            }
          }
        }
      } catch (err) {
        console.error(err)
      }

      done()
    })
  }
}

module.exports = ReactCompilerPlugin
