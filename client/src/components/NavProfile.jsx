import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LOGOUT_ROUTE, USERS_ROUTE } from '../utilits/constants'

function NavProfile() {
  const { currentUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState)
  }

  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-3">{currentUser.name}</div>
        <img
          src={currentUser.image}
          alt="user image"
          height="40"
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={`w-100 dropdown-menu ${isOpen ? 'show' : ''}`}>
        <Link
          to={`${USERS_ROUTE}/${currentUser._id}`}
          className="dropdown-item"
        >
          Profile
        </Link>
        <Link to={LOGOUT_ROUTE} className="dropdown-item">
          Log Out
        </Link>
      </div>
    </div>
  )
}

export default NavProfile
