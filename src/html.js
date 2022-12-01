import React from "react"
import PropTypes from "prop-types"

export default class HTML extends React.Component {
  render() {
    const {
      htmlAttributes,
      headComponents,
      preBodyComponents,
      bodyAttributes,
      body,
      postBodyComponents,
    } = this.props
    return (
      <html {...htmlAttributes} style={{ background: "#0F0F0F" }} lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="author" content="Leander Rodrigues" />
          <meta name="robots" content="index, follow" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta
            name="google-site-verification"
            content="iQUwI23P8VDioDG1W0VTsUDZVoj-CSgRu7aPvbUIQsU"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Rubik:300,400,500,700,900"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&display=swap"
            rel="stylesheet"
          ></link>
          {headComponents}
        </head>
        <body {...bodyAttributes}>
          {preBodyComponents}
          <div
            key="body"
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          {postBodyComponents}
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
