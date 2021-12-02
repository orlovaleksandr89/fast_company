import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import userServise from '../services/user.service'
import { toast } from 'react-toastify'
import Loader from '../components/ui/loader'

const UserContext = React.createContext()

export const useUsers = () => {
  return useContext(UserContext)
}

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  async function getUser() {
    try {
      const { content } = await userServise.get()

      setUsers(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }
  function getUserById(id) {
    return users.find((u) => u._id === id)
  }

  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }
  return (
    <UserContext.Provider value={{ users, getUserById }}>
      {!loading ? children : <Loader />}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default UserProvider
