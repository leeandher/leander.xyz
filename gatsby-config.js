module.exports = {
  plugins: [
    // CMS
    `gatsby-plugin-netlify-cms`,

    // Styling,
    `gatsby-plugin-styled-components`,

    // Blog
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: "Markdown-Posts"
      }
    }
  ]
};
