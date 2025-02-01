require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `atk5dpdvrx61`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
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
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/skioutlet.png",
      },
    },
    `gatsby-plugin-image`,
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-recaptcha`,
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
        }
      `,
        resolveSiteUrl: ({ site }) => {
          return site.siteMetadata.siteUrl;
        },
        serialize: ({ path }) => {
          return {
            url: path,
          };
        },
      },
    },
  ],
  siteMetadata: {
    title: `Skioutlet`,
    description: `1027 Bp. Margit krt. 46.`,
    image: `/src/assets/skioutlet.png`,
    siteUrl: `https://www.skioutlet.hu`,
  },
};
