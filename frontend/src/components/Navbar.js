import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Navbar = (props) => {

  const token = localStorage.getItem('token')

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/')
    location.reload()
  }

  return <>
    <nav className="navbar is-fixed-top">
      <div className="navbar-menu">
        <div className="navbar-end">
          <div className="buttons">
            <Link className="button is-black" to="/">Home</Link>
            {token && <Link className="button is-black" to="/beers">Beers</Link>}
            {token && <Link className="button is-black" to="/newsale">New Sale</Link>}
            {!token && <Link className="button is-black" to="/login">Login</Link>}
            {token && <Link className="button is-black" to="/" onClick={handleLogout}>Logout</Link>}
          </div>
        </div>
      </div>
    </nav>
  </>

}

export default withRouter(Navbar)