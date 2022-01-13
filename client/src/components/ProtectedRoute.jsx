import React from 'react'
import { Redirect, Route } from 'react-router-dom'

import { LOGIN_ROUTE } from '../utilits/constants'
import PropTypes from 'prop-types'
import { getUserIsLoggedIn } from '../store/users'
import { useSelector } from 'react-redux'

function ProtectedRoute({ component: Component, children, ...rest }) {
  const isLoggedIn = useSelector(getUserIsLoggedIn())
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn) {
          return (
            <Redirect
              to={{
                pathname: LOGIN_ROUTE,
                state: {
                  from: props.location
                }
              }}
            />
          )
        }
        return Component ? <Component {...props} /> : children
      }}
    />
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  location: PropTypes.object
}

export default ProtectedRoute
