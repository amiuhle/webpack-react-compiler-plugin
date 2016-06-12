import React from 'react'

export default (props) => {
  const {
    children,
    title
  } = props
  return (
    <html>
      <head>
        <meta charSet='utf-8'></meta>
        <meta httpEquiv='x-ua-compatible' content='ie=edge'></meta>
        <link rel='stylesheet' href='/styles.css' />
        <title>{title}</title>
      </head>
      <body>
        {children}
        <script src='/bundle.js'></script>
      </body>
    </html>
  )
}
