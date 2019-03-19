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
              path
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
    let path = null
    switch (fm.type) {
      case "blog":
        template = blogTemplate
        path = `${fm.path}`
        break
      case "note":
        template = noteTemplate
        path = `/notes/${fm.category}/${fm.title
          .replace(/\s/g, "_")
          .toLowerCase()}`
        break
    }
    return createPage({
      path,
      component: template,
      context: {
        title: fm.title,
      }, // additional data can be passed via context
    })
  })
}
