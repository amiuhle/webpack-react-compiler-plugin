import '../../styles/main.scss'

import React, { Component } from 'react'
import connect, { ClientOnly } from '../../../runtime'

import Layout from '../layouts'

export default class Index extends Component {
  render () {
    return (
      <div>
        <h1>Index</h1>
        <p>
          <a href='/home.html'>Home</a>
        </p>
        <ClientOnly>
          <div>
            I'm on the client!
          </div>
        </ClientOnly>
      </div>
    )
  }
}

Index.layoutProps = {
  layout: Layout,
  title: 'Index'
}

class Home extends Component {
  render () {
    return (
      <div>
        <h1>Home</h1>
        <p>
          <a href='/index.html'>Back</a>
        </p>
      </div>
    )
  }
}

Home.layoutProps = {
  layout: Layout,
  title: 'Home'
}

export {
  Home as home
}

connect(module.exports)
