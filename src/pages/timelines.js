import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql, Link } from 'gatsby'
import kebab from 'lodash/kebabCase'

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { timelines: { ne: null } } }
    ) {
      totalCount
      group(field: frontmatter___timelines) {
        fieldValue
        totalCount
      }
    }
  }
`

const FIRST = 'Key Events of 9/11'
const sorter = (a, b) => (a.fieldValue === FIRST ? -1 : b.fieldValue === FIRST ? 1 : 0)

export default function Timelines ({
  data: {
    allMarkdownRemark: { group, totalCount },
    site: {
      siteMetadata: { title }
    }
  }
}) {
  return (
    <Layout title={title}>
      <SEO title="Timelines" />
      <div className="has-text-centered">
        <h1 className="title">Timelines</h1>
      </div>
      <div className="content is-size-6">
        <div className="container">
          <ul>
            <li>
              <Link to={`/timeline/`} aria-label="Read the complete timeline">Complete Timeline ({totalCount})</Link>
            </li>
            {group.sort(sorter).map(timeline => (
              <li key={timeline.fieldValue}>
                <Link to={`/timelines/${kebab(timeline.fieldValue)}/`} aria-label="Read the {timeline.fieldValue} timeline">
                  {timeline.fieldValue} ({timeline.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

Timelines.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired
        }).isRequired
      ),
      totalCount: PropTypes.number.isRequired
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired
      })
    })
  })
}
