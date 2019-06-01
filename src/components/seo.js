import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

export default function SEO({ desc, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const description = desc || site.siteMetadata.description

  /*
   * TODO:
   * <meta property="og:url" content={siteUrl} />
   * <meta property="og:image" content={`${siteUrl}${gatsbyIcon}`} />
   * <meta property="og:image:width" content="512" />
   * <meta property="og:image:height" content="512" />
   * <meta name="twitter:site" content={twitter} />
   */
  return (
    <Helmet
      defaultTitle={site.siteMetadata.title}
      defer={false}
      htmlAttributes={{ lang: 'en' }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        { name: 'description', content: description },
        { name: 'keywords', content: '9/11, terrorism' },
        { property: 'og:description', content: description },
        { property: 'og:locale', content: 'en' },
        { property: 'og:site_name', content: title },
        { property: 'og:title', content: title },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:creator', content: site.siteMetadata.author },
        { name: 'twitter:description', content: description },
        { name: 'twitter:title', content: title }
      ]}
    />
  )
}

SEO.defaultProps = {
  description: '',
  title: ''
}

SEO.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string
}
