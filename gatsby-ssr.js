const React = require('react')

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      rel="dns-prefetch"
      key="dns-prefetch-gstatic"
      href="https://fonts.gstatic.com"
    />,
    <link
      rel="dns-prefetch"
      key="dns-prefetch-googleapis"
      href="fonts.googleapis.com"
    />
  ])
}
