import React from 'react'
import Navbar from './navbar'

export default function Layout ({ children, title }) {
  return (
    <React.Fragment>
      <Navbar title={title} />
      <main>{children}</main>
      <footer className="has-text-centered" style={{ paddingTop: '15px' }}>
        {/*
        <p>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/Symbitic/timeline-of-terror" aria-label="View the source code">Source code</a> is licensed under <a target="_blank" rel="noopener noreferrer" href="https://opensource.org/licenses/mit-license.php" aria-label="View the MIT license">MIT</a>
        </p>
        */}
        <p>Content is licensed under <a target="_blank" rel="noopener noreferrer" href="https://creativecommons.org/licenses/by-nc-sa/4.0/" aria-label="View the CC license">CC BY-NC-SA</a></p>
      </footer>
    </React.Fragment>
  )
}
