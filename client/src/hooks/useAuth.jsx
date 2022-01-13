// import React, { useContext, useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
// import axios from 'axios'
// import { useHistory } from 'react-router-dom'
// import userService from '../services/user.service'
// import { toast } from 'react-toastify'
// import localStorageService, { setToken } from '../services/localStorage.service'
// import Loader from '../components/ui/loader'
// import { MAIN_ROUTE } from '../utilits/constants'

// const AuthContext = React.createContext()

// export const httpAuth = axios.create({
//   baseURL: 'https://identitytoolkit.googleapis.com/v1/',
//   params: {
//     key: process.env.REACT_APP_FIREBASE_KEY
//   }
// })
// export const useAuth = () => {
//   return useContext(AuthContext)
// }

// const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(undefined)
//   const [error, setError] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const history = useHistory()

//   useEffect(() => {
//     if (error !== null) {
//       toast.error(error)
//       setError(null)
//     }
//   }, [error])

//   const getUserData = async () => {
//     try {
//       const { content } = await userService.getCurrentUser()
//       setCurrentUser(content)
//     } catch (error) {
//       errorCatcher(error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (localStorageService.getAccessToken()) {
//       getUserData()
//     } else {
//       setIsLoading(false)
//     }
//   }, [])

//   const randomInt = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1) + min)
//   }

//   async function signUp({ email, password, ...rest }) {
//     const url = `accounts:signUp`
//     try {
//       const { data } = await httpAuth.post(url, {
//         email,
//         password,
//         returnSecureToken: true
//       })
//       setToken(data)

//       await createUser({
//         _id: data.localId,
//         email,
//         rate: randomInt(1, 5),
//         completedMeetings: randomInt(0, 100),
//         image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
//           .toString(36)
//           .substring(7)}.svg`,
//         ...rest
//       })
//     } catch (error) {
//       errorCatcher(error)
//       const { code, message } = error.response.data.error
//       if (code === 400) {
//         if (message === 'EMAIL_EXISTS') {
//           const errorObj = {
//             email: 'User with this email already exist'
//           }
//           throw errorObj
//         }
//       }
//     }
//   }
//   async function createUser(data) {
//     try {
//       const { content } = await userService.create(data)
//       setCurrentUser(content)
//     } catch (error) {
//       errorCatcher(error)
//     }
//   }
//   function errorCatcher(error) {
//     const { message } = error.response.data
//     setError(message)
//   }

//   async function login({ email, password }) {
//     const url = `accounts:signInWithPassword`
//     try {
//       const { data } = await httpAuth.post(url, {
//         email,
//         password,
//         returnSecureToken: true
//       })
//       setToken(data)
//       await getUserData()
//     } catch (error) {
//       errorCatcher(error)
//       const { code, message } = error.response.data.error
//       if (code === 400) {
//         let errorObj = {}
//         if (message === 'EMAIL_NOT_FOUND') {
//           errorObj = { ...errorObj, email: 'Please check your email' }
//           throw errorObj
//         }
//         if (message === 'INVALID_PASSWORD') {
//           errorObj = { ...errorObj, password: 'Please check your password' }
//           throw errorObj
//         }
//       }
//       console.log(code, message)
//     }
//   }
//   async function updateUser(formData) {
//     try {
//       const { content } = await userService.updateUser(formData)
//       setCurrentUser(content)
//       return content
//     } catch (error) {
//       errorCatcher(error)
//     }
//   }

//   function logOut() {
//     localStorageService.removeAuthData()
//     setCurrentUser(null)
//     history.push(MAIN_ROUTE)
//   }

//   return (
//     <AuthContext.Provider
//       value={{ signUp, currentUser, login, logOut, updateUser }}
//     >
//       {!isLoading ? children : <Loader />}
//     </AuthContext.Provider>
//   )
// }

// AuthProvider.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node
//   ])
// }

// export default AuthProvider
