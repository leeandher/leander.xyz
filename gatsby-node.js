const path = require("path")
const slugify = require("slugify")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  // Create Notes and Note category pages
  const NoteTemplate = path.resolve("src/templates/NoteTemplate.js")
  const NoteCategoryTemplate = path.resolve(
    "src/templates/NoteCategoryTemplate.js"
  )

  const { data: noteData } = await graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "notes" } }) {
        edges {
          node {
            name
            relativeDirectory
            absolutePath
          }
        }
      }
    }
  `)
  noteData.allFile.edges.forEach(({ node }) => {
    const { absolutePath, name, relativeDirectory } = node
    const isCategory = name === "README"
    const title = isCategory ? "" : `/${slugify(name, { lower: true })}`
    const category = slugify(relativeDirectory, { lower: true })
    const notePath = `/notes/${category}${title}`
    return createPage({
      path: notePath,
      component: isCategory ? NoteCategoryTemplate : NoteTemplate,
      context: {
        absolutePath,
        relativeDirectory,
      },
    })
  })

  // Create Blog posts and Project pages
  const BlogPostTemplate = path.resolve("src/templates/BlogPostTemplate.js")
  const ProjectTemplate = path.resolve("src/templates/ProjectTemplate.js")

  const { data: media } = await graphql(`
    {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/src.pages.(blog|projects)/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            frontmatter {
              type
              slug
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
      case "projects":
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
      },
    })
  })
}
