const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  // Create blog posts and notes
  const BlogPostTemplate = path.resolve("src/templates/BlogPostTemplate.js")
  const NoteTemplate = path.resolve("src/templates/NoteTemplate.js")
  const ProjectTemplate = path.resolve("src/templates/ProjectTemplate.js")

  const { data: media } = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { type: { ne: "faq" } } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            frontmatter {
              type
              slug
              category
              title
            }
          }
        }
      }
    }
  `)
  media.allMarkdownRemark.edges.forEach(({ node }) => {
    const { frontmatter: fm } = node
    let template = null
    let mediaPath = null
    switch (fm.type) {
      case "blog":
        template = BlogPostTemplate
        mediaPath = `/blog/${fm.slug}`
        break
      case "note":
        template = NoteTemplate
        mediaPath = `/notes/${fm.category}/${fm.title
          .replace(/\s/g, "_")
          .toLowerCase()}`
        break
      case "project":
        template = ProjectTemplate
        mediaPath = `/projects/${fm.slug}`
        break
      default:
        throw new Error(`Unknown media type: ${fm.type}`)
    }
    return createPage({
      path: mediaPath,
      component: template,
      context: {
        slug: fm.slug,
        title: fm.title,
      },
    })
  })
}
