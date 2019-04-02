import React from "react"
import { graphql } from "gatsby"

const NoteTemplate = ({ data }) => {
  const { markdownRemark } = data
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

export default NoteTemplate

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
