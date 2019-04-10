const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  /**
   * Create Note category pages
   */
  const NoteTemplate = path.resolve("src/templates/NoteTemplate.js")

  const { data: noteData } = await graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "notes" } }) {
        edges {
          node {
            name
            relativeDirectory
          }
        }
      }
    }
  `)
  noteData.allFile.edges.forEach(({ node }) => {
    const { name, relativeDirectory } = node
    // return createPage(
    //   {
    //     path: `/notes/${}`
    //   }
    // )
  })

  /**
   * Create Blog posts, Notes, and Project pages
   */
  const BlogPostTemplate = path.resolve("src/templates/BlogPostTemplate.js")
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
