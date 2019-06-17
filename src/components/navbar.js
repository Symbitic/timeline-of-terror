import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { graphql, Link, useStaticQuery } from 'gatsby'
import cx from 'classnames'
import styles from './navbar.module.css'

export default function Navbar ({ title }) {
  const [ active, setActive ] = useState(false)

  const toggle = ([ classes ]) => active ? `${classes} is-active` : classes
  
  const onClick = e => {
    e.preventDefault()
    setActive(!active)
  }
  
  const {
    icon: {
      childImageSharp: {
        resize: { src: img }
      }
    }
  } = useStaticQuery(
    graphql`
      query {
        icon: file(relativePath: { eq: "navbar.png" }) {
          childImageSharp {
            resize(width: 512, quality: 100) {
              src
            }
          }
        }
      }
    `
  )
  
  return (
		<nav className="navbar is-black" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <img className={styles.img} src={img} alt="" />
        </div>
        <Link className={cx('navbar-item', styles.link)} to="/" aria-label="Navigate to home">
          <strong>{title}</strong>
        </Link>

        <div role="button" className={toggle`navbar-burger burger`} aria-label="menu" aria-expanded="false" data-target="navbar" onClick={onClick}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>
    
      <div id="navbar" className={cx('navbar-menu', styles.menu, active && 'is-active')}>
        <div className="navbar-end">
          <Link className={cx('navbar-item', styles.link)} to="/about" aria-label="Read about the Timeline of Terror project">
            About
          </Link>
          <Link className={cx('navbar-item', styles.link)} to="/timelines" aria-label="View the list of timelines">
            Timelines
          </Link>
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  title: PropTypes.string
}

Navbar.defaultProps = {
  title: ''
}
