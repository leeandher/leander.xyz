import React from "react"
import { graphql } from "gatsby"

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  const { date, preview, tags, title } = frontmatter
  return (
    <div
      style={{ background: "white", color: "black" }}
      className="blog-post-container"
    >
      <div>
        <h1>{title}</h1>
        <article style={{ color: "red" }}>{preview}</article>
        <h2>{date}</h2>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
      <ul>
        {tags.forEach(tag => (
          <li>{tag}</li>
        ))}
      </ul>
    </div>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MM DD, YYYY")
        title
        preview
        tags
      }
    }
  }
`
