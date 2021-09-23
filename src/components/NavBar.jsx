import React from 'react'
import { Link } from 'react-router-dom'
const NavBar = () => {
  return (
    <div className="nav">
      <ul className="nav">
        <li className="nav-item">
          <Link className="nav-link active" to="/">
            Main
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/users">
            Users
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default NavBar
