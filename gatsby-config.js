module.exports = {
  plugins: [
    // CMS
    "gatsby-plugin-netlify-cms",

    // Styling
    "gatsby-plugin-styled-components",

    // Blog
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/blog`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "faqs",
        path: `${__dirname}/faqs`,
      },
    },
  ],
}
