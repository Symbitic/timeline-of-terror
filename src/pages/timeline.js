import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import cx from 'classnames'
import styles from '../templates/timeline.module.css'
import { FaEdit } from 'react-icons/fa'

export const pageQuery = graphql`
  query Timeline {
    site {
      siteMetadata {
        title
        repo
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___time], order: ASC }
      filter: { frontmatter: { timelines: { ne: null } } }
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
            id
            date: time(formatString: "MMMM DD, YYYY")
            startTime: time(formatString: "h:mm a")
            endTime(formatString: "h:mm a")
          }
        }
      }
    }
  }
`

const prose = (repo, file) => `//prose.io/#${repo}/edit/master/${file}`

export default function CompleteTimeline ({
  data: {
    allMarkdownRemark: { edges, totalCount },
    site: {
      siteMetadata: { title, repo }
    }
  }
}) {
  return (
    <Layout title={title}>
      <SEO title="Complete Timeline" />
      <div className="has-text-centered">
        <h1 className={cx('title', styles.title)}>Complete Timeline ({totalCount})</h1>
      </div>
      <div className={cx('content', 'is-size-6', styles.content)}>
        <div className={cx('container', styles.container)}>
          {edges.map(({ node }) => (
            <div key={node.fields.slug}>
              <h5 className="is-size-5" id={node.frontmatter.id}>
                ({
                  node.frontmatter.endTime
                    ? `${node.frontmatter.startTime} - ${node.frontmatter.endTime}`
                    : node.frontmatter.startTime
                }) {node.frontmatter.date}: {node.frontmatter.title}
                
                <a target="_blank" rel="noopener noreferrer" href={prose(repo, node.fields.path)}>
                  <FaEdit className="is-pulled-right" />
                </a>
              </h5>
              <div dangerouslySetInnerHTML={{ __html: node.html }} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

CompleteTimeline.propTypes = {
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      })
    }),
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            html: PropTypes.string.isRequired,
            frontmatter: PropTypes.shape({
              id: PropTypes.string.isRequired,
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
