import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql } from 'gatsby'

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`

export default function PageTemplate ({ data }) {
  const post = data.markdownRemark
  const { title } = data.site.siteMetadata
  
  return (
    <Layout title={title}>
      <SEO title={post.frontmatter.title} />
      <div className="has-text-centered">
        <h1 className="title">{post.frontmatter.title}</h1>
      </div>
      <div className="content is-size-6">
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
    </Layout>
  )
}
