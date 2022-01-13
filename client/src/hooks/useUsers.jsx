// import React, { useContext, useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
// import userServise from '../services/user.service'
// import { toast } from 'react-toastify'
// import Loader from '../components/ui/loader'
// import { useAuth } from './useAuth'

// const UserContext = React.createContext()

// export const useUsers = () => {
//   return useContext(UserContext)
// }

// const UserProvider = ({ children }) => {
//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const { currentUser } = useAuth()

//   useEffect(() => {
//     getUsers()
//   }, [])

//   useEffect(() => {
//     if (!loading) {
//       const newUsers = [...users]
//       const userIndex = newUsers.findIndex(
//         (user) => user._id === currentUser._id
//       )
//       newUsers[userIndex] = currentUser
//       setUsers(newUsers)
//     }
//   }, [])

//   useEffect(() => {
//     if (error !== null) {
//       toast.error(error)
//       setError(null)
//     }
//   }, [error])

//   async function getUsers() {
//     try {
//       const { content } = await userServise.get()
//       setUsers(content)
//       setLoading(false)
//     } catch (error) {
//       errorCatcher(error)
//     }
//   }
//   function getUserById(id) {
//     return users.find((user) => user._id === id)
//   }

//   function errorCatcher(error) {
//     const { message } = error.response.data
//     setError(message)
//     setLoading(false)
//   }
//   return (
//     <UserContext.Provider value={{ users, getUserById }}>
//       {!loading ? children : <Loader />}
//     </UserContext.Provider>
//   )
// }

// UserProvider.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node
//   ])
// }

// export default UserProvider
