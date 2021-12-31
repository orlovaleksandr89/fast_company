import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { LOGIN_ROUTE } from '../utilits/constants'
import PropTypes from 'prop-types'

function ProtectedRoute({ component: Component, children, ...rest }) {
  const { currentUser } = useAuth()
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
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