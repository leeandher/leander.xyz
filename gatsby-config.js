module.exports = {
  plugins: [
    // CMS
    "gatsby-plugin-netlify-cms",

    // SEO
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Leander Rodrigues",
        short_name: "leander.xyz",
        start_url: "/",
        background_color: "#0F0F0F",
        theme_color: "#0f0f0f",
        display: "standalone",
        icon: "static/icons/logo.png",
        icons: [
          {
            src: `static/icons/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `static/icons/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
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
        ignore: [`**/*\.js`],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "notes",
        path: `${__dirname}/src/pages/notes`,
        ignore: [`**/*\.js`],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "projects",
        path: `${__dirname}/src/pages/projects`,
        ignore: [`**/*\.js`],
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "faqs",
        path: `${__dirname}/src/data/faqs`,
      },
    },
  ],
}
