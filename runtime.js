const React = require('react')
const ReactDOM = require('react-dom')

const isClient = typeof document !== 'undefined'

export class ClientOnly extends React.Component {

  constructor () {
    super()
    this.state = {
      isClient: false
    }
  }

  componentDidMount () {
    this.setState({
      // Need to wait until component is mounted, otherwise React will complain
      // about output not being equal to server side output
      isClient: isClient
    })
  }
  render () {
    const { isClient } = this.state
    const { children } = this.props
    if (isClient) {
      return children
    } else {
      return null
    }
  }
}

export default (routes) => {
  if (isClient) {
    // We're on the client
    let route = document.location.pathname.match(/^\/(.*?)(?:\.html)?$/)[1]
    if (route === 'index' || route === '') {
      route = 'default'
    }

    const Page = routes[route]
    const Layout = Page.layoutProps.layout

    let page = React.createElement(Page)

    if (Layout) {
      page = React.createElement(Layout, Page.layoutProps, page)
    }

    ReactDOM.render(page, document)
  }
}
