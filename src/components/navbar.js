import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import cx from 'classnames'
import img from '../images/icon.png'
import styles from './navbar.module.css'

export default function Navbar ({ title }) {
  const [ active, setActive ] = useState(false)

  const toggle = ([ classes ]) => active ? `${classes} is-active` : classes
  
  const onClick = e => {
    e.preventDefault()
    setActive(!active)
  }
  
  return (
		<nav className="navbar is-black" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <img className={styles.img} src={img} alt="Navbar icon" />
        </div>
        <Link className={cx('navbar-item', styles.link)} to="/">
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
          <Link className={cx('navbar-item', styles.link)} to="/about">
            About
          </Link>
          <Link className={cx('navbar-item', styles.link)} to="/timelines">
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
