module.exports = {
  siteMetadata: {
    title: 'Timeline of Terror',
    author: 'Alex Shaw',
    description: 'A complete guide to all the events of 9/11',
    repo: 'Symbitic/timeline-of-terror'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/pages`,
        name: 'blog'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/timelines`,
        name: 'timelines'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/assets`,
        name: 'assets'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-attr',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590
            }
          },
          'gatsby-remark-autolink-headers',
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-external-links',
          'gatsby-remark-smartypants'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-141262938-1'
      }
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography'
      }
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-purgecss',
    // 'gatsby-plugin-polyfill-io',
    'gatsby-plugin-nprogress',
    'gatsby-plugin-fastclick',
    // 'gatsby-plugin-brotli',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'The Terror Timeline',
        short_name: 'terror',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'standalone',
        icon: 'assets/favicon.png',
        crossOrigin: 'use-credentials'
      }
    },
    // 'gatsby-plugin-offline'
    'gatsby-plugin-remove-serviceworker'
  ]
}
