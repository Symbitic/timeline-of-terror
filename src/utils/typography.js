import Typography from 'typography'
import gray from 'gray-percentage'
import { MOBILE_MEDIA_QUERY } from 'typography-breakpoint-constants'

const typography = new Typography({
  baseFontSize: '19px',
  baseLineHeight: 1.45,
  blockMarginBottom: 0.8,
  bodyColor: 'white',
  bodyFontFamily: [ 'Open Sans', 'sans-serif' ],
  bodyWeight: 400,
  boldWeight: 700,
  headerColor: 'white',
  headerFontFamily: [ 'Roboto', 'serif' ],
  headerWeight: 700,
  includeNormalize: false,
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    'h1': {
      fontSize: '4.2rem',
      fontWeight: 900
    },
    'h2': {
      fontSize: '2.6rem',
      fontWeight: 900
    },
    'h3': {
      fontSize: '1.6rem',
      marginBottom: '0.74rem'
    },
    a: {
      color: '#007bff',
      textDecoration: 'none',
      textShadow: 'none',
    },
    'a.gatsby-resp-image-link': {
      boxShadow: 'none',
    },
    'h1,h2,h3,h4,h5,h6': {
      marginTop: rhythm(2),
      lineHeight: 1.1
    },
    'li>ol,li>ul': {
      marginLeft: '20px',
      marginBottom: 0,
    },
    blockquote: {
      ...scale(1 / 5),
      borderLeft: `${rhythm(3 / 16)} solid ${gray(10)}`,
      color: gray(41),
      paddingLeft: rhythm(13 / 16),
      fontStyle: 'italic',
      marginLeft: 0,
      marginRight: 0,
    },
    'blockquote > :last-child': {
      marginBottom: 0,
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      color: options.bodyColor,
      fontStyle: 'normal',
      fontWeight: options.bodyWeight,
    },
    'blockquote cite:before': {
      content: '"— "',
    },
    [MOBILE_MEDIA_QUERY]: {
      html: {
        fontSize: `${(16 / 16) * 100}%`,
      },
      blockquote: {
        borderLeft: `${rhythm(3 / 16)} solid ${gray(10)}`,
        color: gray(41),
        paddingLeft: rhythm(9 / 16),
        fontStyle: 'italic',
        marginLeft: rhythm(-3 / 4),
        marginRight: 0,
      },
    },
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export const rhythm = typography.rhythm
export const scale = typography.scale
export default typography
