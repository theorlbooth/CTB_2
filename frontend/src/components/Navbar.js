import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Navbar = () => {
  return <>
    <nav className="navbar is-fixed-top">
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="buttons">
            <Link className="button is-black" to="/">Home</Link>
            <Link className="button is-black" to="/beers">Beers</Link>
            <Link className="button is-black" to="/login">Login / Register</Link>
          </div>
        </div>
      </div>
    </nav>
  </>

}

export default withRouter(Navbar)