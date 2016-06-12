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
        const source = assets['bundle.js'].source()
        const pages = eval(source)

        for (let route in pages) {
          if (pages.hasOwnProperty(route)) {
            const Page = pages[route]

            const layoutProps = Page.layoutProps || {}
            const Layout = layoutProps.layout

            let page = React.createElement(Page)
            let doctype = '<!doctype html>'

            if (Layout) {
              page = React.createElement(Layout, Page.layoutProps, page)
              if (Layout.doctype) {
                doctype = Layout.doctype
              }
            }

            const content = doctype + ReactDOMServer.renderToString(page)

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
