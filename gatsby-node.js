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
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              type
              path
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
        mediaPath = fm.path
        break
      case "note":
        template = NoteTemplate
        mediaPath = `/notes/${fm.category}/${fm.title
          .replace(/\s/g, "_")
          .toLowerCase()}`
        break
      case "project":
        template = ProjectTemplate
        mediaPath = fm.path
        break
      default:
        throw new Error(`Unknown media type: ${fm.type}`)
    }
    return createPage({
      path: mediaPath,
      component: template,
      // used for notes template query
      context: { title: fm.title },
    })
  })
}
