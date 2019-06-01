module.exports = ({ env }) => ({
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 0
    },
    'postcss-mixins': {},
    'postcss-at-rules-variables': {},
    'postcss-each': {},
    'postcss-for': {},
    'postcss-conditionals': {},
    'postcss-css-variables': {},
    'postcss-custom-properties': {},
    'postcss-nesting': {}
  }
})
