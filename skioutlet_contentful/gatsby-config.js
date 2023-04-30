require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `atk5dpdvrx61`,
        accessToken: "evd8wUBI06xEC9_KaF9vBVrRzVl1NOZOf2k7x3u2hVY",
      },
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#ed2123`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/assets/skioutlet.png',
      },
    },
    `gatsby-plugin-image`,
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-recaptcha`,
    `gatsby-plugin-sitemap`,
  ],
  siteMetadata: {
    title: `Skioutlet`,
    description: `1027 Bp. Margit krt. 46.`,
    image: `/src/assets/skioutlet.png`,
    siteUrl: `https://www.skioutlet.hu`,
  },
}
