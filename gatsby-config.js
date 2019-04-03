module.exports = {
  plugins: [
    // CMS
    "gatsby-plugin-netlify-cms",

    // SEO
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Leander Rodrigues",
        short_name: "leander.xxyz",
        start_url: "/",
        background_color: "#0F0F0F",
        theme_color: "#4DCCB0",
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
