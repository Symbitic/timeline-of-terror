import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { graphql, Link } from 'gatsby'
import kebab from 'lodash/kebabCase'

const FIRST = 'Key Events of 9/11'
const sorter = (a, b) => (a.fieldValue === FIRST ? -1 : b.fieldValue === FIRST ? 1 : 0)

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

export default function Index ({
  data: {
    allMarkdownRemark: { group, totalCount },
    site: {
      siteMetadata: { title }
    }
  }
}) {
  return (
    <Layout title={title}>
      <SEO />
      <div className="has-text-centered">
        <h1 className="title">The Timeline of Terror</h1>
        <h2 className="subtitle">A Complete Guide to the Events of 9/11</h2>
      </div>
      <div className="content is-size-6">
        <div className="container">
          <p>On September 11th, 2001, the entire world changed forever.</p>
          <p>19 hijackers affiliated with al-Qaeda flew two planes into the World Trade Center, another into the Pentagon, and attempted to fly a fourth into the US Capitol Building.</p>
          <p>The final death toll: 2996</p>
          <p>This project is dedicated to everyone whose life was taken or changed by the events of September 11, 2001.</p>

          <h3 className="is-size-4">Timelines</h3>
          
          <Link to={`/timeline/`} aria-label="Read the complete timeline">Complete Timeline ({totalCount})</Link>
          <ul>
            {group.sort(sorter).map(timeline => (
              <li key={timeline.fieldValue}>
                <Link to={`/timelines/${kebab(timeline.fieldValue)}/`} aria-label={`Read the ${timeline.fieldValue} timeline`}>
                  {timeline.fieldValue} ({timeline.totalCount})
                </Link>
              </li>
            ))}
          </ul>

          <article className="message is-danger">
            <div className="message-body">
              <p>If you are affiliated with the Terror Timeline project by History Commons, or know how they may be contacted, please email me at alex.shaw.as@gmail.com</p>
              <p>The terms of use state that this website may not use more than 200 entries from the Terror Timeline without permission first.</p>
            </div>
          </article>
          
          <article className="message is-black">
            <div className="message-body">
              This project is just getting started. While edits to existing entries are welcomed and encouraged, we ask that contributors please refrain from adding new ones at this time, until we have established guidelines for editors to follow.
            </div>
          </article>

        </div>
      </div>
    </Layout>
  )
}

Index.propTypes = {
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
