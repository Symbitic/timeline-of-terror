const path = require('path')
const kebab = require('lodash/kebabCase')
const { createFilePath } = require('gatsby-source-filesystem')
const { paginate } = require('gatsby-awesome-pagination')

const isPage = edge => (
  edge.node.frontmatter &&
  edge.node.frontmatter.type &&
  edge.node.frontmatter.type === 'page'
)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const pageTemplate = path.resolve('./src/templates/page.js')
  const timelineTemplate = path.resolve('./src/templates/timeline.js')

  return graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 2000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                timelines
                title
                type
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const edges = result.data.allMarkdownRemark.edges

    // Create pages
    edges
      .filter(isPage)
      .forEach(edge => {
        createPage({
          path: edge.node.fields.slug,
          component: pageTemplate,
          context: {
            slug: edge.node.fields.slug
          }
        })
      })
    
    // Create timelines
    edges
      // Filter out non-timelines
      .filter(edge => !isPage(edge))
      // Remove all fields except timeline.
      .map(edge => edge.node.frontmatter && edge.node.frontmatter.timelines)
      // Filter out non-timelines
      .filter(Array.isArray)
      // Flatten timeline arrays into a single array of timelines
      .reduce((acc, val) => [ ...acc, ...val ], [])
      // Sort alphabetically
      .sort()
      // Unique
      .filter((item, i, arr) => !i || item != arr[i-1])
      // Create page
      .forEach(timeline => {
        const items = edges
          .filter(edge => !isPage(edge)
            && edge.node.frontmatter 
            && edge.node.frontmatter.timelines
            && edge.node.frontmatter.timelines.includes(timeline)
          )
        paginate({
          createPage,
          items,
          itemsPerPage: 25,
          pathPrefix: `/timelines/${kebab(timeline)}`,
          component: timelineTemplate,
          context: {
            timeline
          }
        })
      })
    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value
    })
    createNodeField({
      name: 'path',
      node,
      value: path.relative(__dirname, node.fileAbsolutePath)
    })
  }
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        assets: path.resolve(__dirname, 'assets')
      }
    }
  })
}
