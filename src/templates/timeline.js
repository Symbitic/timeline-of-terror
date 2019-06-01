import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql, Link } from 'gatsby'
import cx from 'classnames'
import styles from './timeline.module.css'

const prose = (repo, file) => `//prose.io/#${repo}/edit/master/${file}`

export const pageQuery = graphql`
  query($timeline: String, $skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        repo
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___time], order: ASC }
      skip: $skip
      limit: $limit
      filter: { frontmatter: { timelines: { in: [$timeline] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            path
          }
          html
          frontmatter {
            title
            date: time(formatString: "MMMM DD, YYYY")
            startTime: time(formatString: "h:mm a")
            endTime(formatString: "h:mm a")
          }
        }
      }
    }
  }
`

export default function Timeline ({ data, pageContext }) {
  const {
    timeline,
    previousPagePath,
    nextPagePath,
    humanPageNumber
  } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const title = data.site.siteMetadata.title
  const repo = data.site.siteMetadata.repo

  return (
    <Layout title={title}>
      <SEO title={timeline} />
      <div className="has-text-centered">
        <h1 className={cx('title', styles.title)}>
          {timeline} ({totalCount})
          {humanPageNumber !== 1 && ` - Page ${humanPageNumber}`}
        </h1>
      </div>
      <div className={cx('content', 'is-size-6', styles.content)}>
        <div className={cx('container', styles.container)}>
          {edges.map(({ node }) => (
            <div key={node.fields.slug}>
              <h5 className="is-size-5">
                ({
                  node.frontmatter.endTime
                    ? `${node.frontmatter.startTime} - ${node.frontmatter.endTime}`
                    : node.frontmatter.startTime
                }) {node.frontmatter.date}: {node.frontmatter.title}
                
                <a target="_blank" rel="noopener noreferrer" href={prose(repo, node.fields.path)} style={{textDecoration:'none'}} aria-label={`Edit ${node.fields.path}`}>
                  <span className="icon is-large">
                    <span class="fas fa-edit"></span>
                  </span>
                </a>
              </h5>
              <div dangerouslySetInnerHTML={{ __html: node.html }} />
            </div>
          ))}
          <nav className={cx('level', 'is-mobile', styles.footer)}>
            <div className="level-left">
              <div className="level-item">
                {previousPagePath && (
                  <Link style={{textDecoration:'none'}} to={previousPagePath} aria-label="Previous page">
                    <span className="icon is-large">
                      <span class="fas fa-arrow-left fa-lg"></span>
                    </span>
                  </Link>
                )}
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                {nextPagePath && (
                  <Link style={{textDecoration:'none'}} to={nextPagePath} aria-label="Next page">
                    <span className="icon is-large">
                      <span class="fas fa-arrow-right fa-lg"></span>
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </Layout>
  )
}

Timeline.propTypes = {
  pageContext: PropTypes.shape({
    timeline: PropTypes.string.isRequired
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            html: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              startTime: PropTypes.string.isRequired,
              endTime: PropTypes.string
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired
            })
          })
        }).isRequired
      )
    })
  })
}
