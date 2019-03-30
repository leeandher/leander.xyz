const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  // Create blog posts and notes
  const blogTemplate = path.resolve("src/templates/blogTemplate.js")
  const noteTemplate = path.resolve("src/templates/noteTemplate.js")
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
        template = blogTemplate
        mediaPath = `${fm.path}`
        break
      case "note":
        template = noteTemplate
        mediaPath = `/notes/${fm.category}/${fm.title
          .replace(/\s/g, "_")
          .toLowerCase()}`
        break
      default:
        throw new Error(`Unknown media type: ${fm.type}`)
    }
    return createPage({
      path: mediaPath,
      component: template,
      context: { ...fm },
    })
  })
}
