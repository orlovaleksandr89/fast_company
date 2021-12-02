import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import { setToken } from '../services/localStorage.service'

const AuthContext = React.createContext()
const httpAuth = axios.create()
export const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  async function signUp({ email, password, ...rest }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })
      setToken(data)

      await createUser({ _id: data.localId, email, ...rest })
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        if (message === 'EMAIL_EXISTS') {
          const errorObj = {
            email: 'User with this email already exist'
          }
          throw errorObj
        }
      }
    }
  }
  async function createUser(data) {
    try {
      const { content } = await userService.create(data)
      setCurrentUser(content)
    } catch (error) {
      errorCatcher(error)
    }
  }
  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
  }

  async function login({ email, password }) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`
    try {
      const { data } = await httpAuth.post(url, {
        email,
        password,
        returnSecureToken: true
      })
      setToken(data)
    } catch (error) {
      errorCatcher(error)
      const { code, message } = error.response.data.error
      if (code === 400) {
        let errorObj = {}
        if (message === 'EMAIL_NOT_FOUND') {
          errorObj = { ...errorObj, email: 'Please check your email' }
          throw errorObj
        }
        if (message === 'INVALID_PASSWORD') {
          errorObj = { ...errorObj, password: 'Please check your password' }
          throw errorObj
        }
      }
      console.log(code, message)
    }
  }
  return (
    <AuthContext.Provider value={{ signUp, currentUser, login }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default AuthProvider
