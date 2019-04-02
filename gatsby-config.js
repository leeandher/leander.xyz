module.exports = {
  plugins: [
    // CMS
    "gatsby-plugin-netlify-cms",

    // SEO
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Leander Rodrigues",
        short_name: "Leander",
        start_url: "/",
        background_color: "#0F0F0F",
        theme_color: "#0F0F0F",
        display: "standalone",
        // icon: "src/assets/images/icon.png", // This path is relative to the root of the site.
      },
    },
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",

    // Styling
    "gatsby-plugin-nprogress",
    "gatsby-plugin-styled-components",

    // Data
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/src/pages/blog`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "notes",
        path: `${__dirname}/src/pages/notes`,
        ignore: [`*.js`],
      },
    },
  ],
}
