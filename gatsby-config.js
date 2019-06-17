module.exports = {
  siteMetadata: {
    title: 'Timeline of Terror',
    author: 'Alex Shaw',
    description: 'A complete guide to all the events of 9/11',
    repo: 'Symbitic/timeline-of-terror',
    siteUrl: 'https://timelineofterror.org'
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
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-react-helmet',
    /*
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Roboto',
            variants: [ '100', '100i', '300', '300i', '400', '400i', '500', '500i', '700', '700i', '900', '900i' ],
            
          },
          {
            family: 'Open Sans',
            variants: [ '300', '300i', '400', '400i', '600', '600i', '700', '700i', '800', '800i' ]
          }
        ]
      }
    },
    */

    'gatsby-plugin-nprogress',
    'gatsby-plugin-fastclick',
    'gatsby-plugin-postcss',
    'gatsby-plugin-purgecss',
    // 'gatsby-plugin-polyfill-io',
    // 'gatsby-plugin-brotli',
    'gatsby-plugin-sitemap',
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
    ...process.env.NETLIFY_BUILD_BASE ? [
      {
        resolve: 'gatsby-plugin-react-helmet-canonical-urls',
        options: {
          siteUrl: 'https://timelineofterror.org'
        }
      },
      'gatsby-plugin-offline'
    ] : [ 'gatsby-plugin-remove-serviceworker' ]
  ]
}
