module.exports = {
  plugins: [
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: "Markdown-Posts"
      }
    },
    `gatsby-transformer-remark`
  ]
};
