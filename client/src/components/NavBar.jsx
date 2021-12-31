import React from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_ROUTE, MAIN_ROUTE, USERS_ROUTE } from '../utilits/constants'
import { useAuth } from '../hooks/useAuth'
import NavProfile from './NavProfile'

const NavBar = () => {
  const { currentUser } = useAuth()
  console.log(currentUser)
  return (
    <nav className="navbar bg-light mb-3 ">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link " to={MAIN_ROUTE}>
              Main
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              <Link className="nav-link" to={USERS_ROUTE}>
                Users
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex align-items-center justify-content-center">
          {currentUser && <NavProfile />}

          {!currentUser && (
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
