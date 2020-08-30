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
    `gatsby-plugin-offline`,
  ],
}
