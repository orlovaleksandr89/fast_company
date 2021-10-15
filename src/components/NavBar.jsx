import React from 'react'
import { Link } from 'react-router-dom'
import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  NEW_USER_ROUTE,
  USERS_ROUTE
} from '../utilits/constants'

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link " to={MAIN_ROUTE}>
                Main
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={LOGIN_ROUTE}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={USERS_ROUTE}>
                Users
              </Link>
            </li>
            <li className="nav-item text-dark">
              <Link className="nav-link" to={NEW_USER_ROUTE}>
                Карточка юзера из урока 9
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
