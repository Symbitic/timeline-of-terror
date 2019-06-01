import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

export default function Header ({ title }) {
  return (
    <header
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '1rem 1rem',
      }}
    >
      <h1 className="title">
        <Link
          to="/"
          style={{
            boxShadow: 'none',
            color: 'white',
            textDecoration: 'none'
          }}
        >
          {title}
        </Link>
      </h1>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string
}

Header.defaultProps = {
  title: ''
}
