module.exports = {
  plugins: [
    // CMS
    "gatsby-plugin-netlify-cms",

    // SEO
    "gatsby-plugin-react-helmet",

    // Styling
    "gatsby-plugin-styled-components",

    // Blog
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/src/pages/blog`,
      },
    },
  ],
}
