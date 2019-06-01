import React from 'react'
import SEO from '../components/seo'
import { graphql } from 'gatsby'

import Layout from '../components/layout'

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default function NotFoundPage ({ data }) {
  const siteTitle = data.site.siteMetadata.title
  
  return (
    <Layout title={siteTitle}>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You tried to access a page that doesn&#39;t exist.</p>
    </Layout>
  )
}
