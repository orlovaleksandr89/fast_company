import React from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_ROUTE, MAIN_ROUTE, USERS_ROUTE } from '../utilits/constants'
import NavProfile from './NavProfile'
import { useSelector } from 'react-redux'
import { getUserIsLoggedIn } from '../store/users'

const NavBar = () => {
  const isLoggedIn = useSelector(getUserIsLoggedIn())
  return (
    <nav className="navbar bg-light mb-3 ">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link " to={MAIN_ROUTE}>
              Main
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to={USERS_ROUTE}>
                Users
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex align-items-center justify-content-center">
          {isLoggedIn && <NavProfile />}

          {!isLoggedIn && (
            <Link className="nav-link" to={LOGIN_ROUTE}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
