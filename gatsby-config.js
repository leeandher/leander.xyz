/* eslint-disable no-useless-escape */
module.exports = {
  siteMetadata: {
    title: `leander.xyz`,
    siteUrl: `https://leander.xyz`,
    repository: `https://github.com/leeandher/leander.xyz`,
    description: `The complete portfolio of Leander Rodrigues, a Toronto-based full-stack web developer and undergrad Engineer at the University of Waterloo.`,
  },
  plugins: [
    // CMS
    `gatsby-plugin-netlify-cms`,

    // Styling
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `#FFFFFF`,
        showSpinner: false,
      },
    },
    `gatsby-plugin-styled-components`,

    // Data
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/static/assets`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: `language-`,
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
              noInlineHighlight: true,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/pages/blog`,
        ignore: [`**/*\.js`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `notes`,
        path: `${__dirname}/src/pages/notes`,
        ignore: [`**/*\.js`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/src/pages/projects`,
        ignore: [`**/*\.js`],
      },
    },

    // SEO
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Leander Rodrigues`,
        short_name: `leander.xyz`,
        start_url: `/`,
        background_color: `#0F0F0F`,
        theme_color: `#0f0f0f`,
        display: `standalone`,
        icon: `static/icons/logo.png`,
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-137618883-1",
        head: true,
        exclude: ["/blog/archive/**"],
        name: "leander.xyz_gatsby-plugin-ga",
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "leander.xyz",
      },
    },
    `gatsby-plugin-offline`,
  ],
}
