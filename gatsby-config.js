module.exports = {
  siteMetadata: {
    title: 'Global Tech Hack',
    author: 'Phumrapee Limpianchop',
    description: 'App for Global Tech Hack',
    siteUrl: 'https://rayriffy.com',
  },
  pathPrefix: '/',
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/contents/database`,
        name: `database`,
        ignore: [`**/.*`],
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/contents/image`,
        name: `image`,
        ignore: [`**/.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
        ignore: [`**/.*`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Global Healthtech`,
        short_name: `Global Healthtech`,
        start_url: `/`,
        background_color: `#f5f5f5`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/img/LOGO-C-min.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: `${__dirname}/src/utils/typography`,
        omitGoogleFont: true,
      },
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-netlify-cache`,
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
  ],
}
