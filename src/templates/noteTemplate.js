import React from "react"
import { graphql } from "gatsby"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  return (
    <div style={{ color: "white" }} className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query($title: String!) {
    markdownRemark(
      frontmatter: { title: { eq: $title }, type: { eq: "note" } }
    ) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        category
        title
      }
    }
  }
`
