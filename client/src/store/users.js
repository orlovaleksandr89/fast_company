import { createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import userService from '../services/user.service'
import { MAIN_ROUTE, USERS_ROUTE } from '../utilits/constants'
import history from '../utilits/history'
import generateAuthError from '../utilits/generateAuthError'

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false
    }
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested(state) {
      state.isLoading = true
    },
    usersRecieved(state, action) {
      state.entities = action.payload
      state.dataLoaded = true
      state.isLoading = false
    },
    userRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    },
    authRequested(state) {
      state.error = null
    },
    authRequestSuccess(state, action) {
      state.auth = { ...action.payload }
      state.isLoggedIn = true
      state.isLoading = false
    },
    authRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    },
    userCreated(state, action) {
      state.entities.push(action.payload)
    },
    userLoggedOut(state) {
      state.entities = null
      state.isLoggedIn = false
      state.auth = null
      state.dataLoaded = false
    },
    updateUserRequested(state) {
      state.isLoading = true
    },
    userUpdatedSuccess(state, action) {
      state.entities = state.entities.map((user) => {
        if (user._id === action.payload._id) {
          return (user = { ...action.payload })
        }
        return user
      })

      state.isLoading = false
    }
  }
})

const { actions, reducer: userReducer } = usersSlice
const {
  usersRequested,
  usersRecieved,
  userRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userLoggedOut,
  updateUserRequested,
  userUpdatedSuccess,
  authRequested
} = actions

/* Functions to dispatch changes to state */

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const { content } = await userService.get()
    dispatch(usersRecieved(content))
  } catch (error) {
    dispatch(userRequestFailed(error.message))
  }
}

export const logIn =
  ({ data, redirect }) =>
  async (dispatch) => {
    const { email, password } = data
    dispatch(authRequested())
    try {
      const data = await authService.login({ email, password })
      localStorageService.setToken(data)
      dispatch(authRequestSuccess({ userId: data.userId }))
      history.push(redirect)
    } catch (error) {
      const { code, message } = error.response.data.error
      if (code === 400) {
        const errorMessage = generateAuthError(message)
        dispatch(authRequestFailed(errorMessage))
      } else {
        dispatch(authRequestFailed(error.message))
      }
    }
  }

export const signUp = (payload) => async (dispatch) => {
  dispatch(usersRequested())
  try {
    const data = await authService.register(payload)
    localStorageService.setToken(data)
    dispatch(authRequestSuccess({ userId: data.userId }))
    history.push(USERS_ROUTE)
  } catch (error) {
    dispatch(authRequestFailed(error.message))
  }
}

export const updateUser = (payload) => async (dispatch) => {
  dispatch(updateUserRequested())
  try {
    const { content } = await userService.updateUser(payload)

    dispatch(userUpdatedSuccess(content))
  } catch (error) {
    dispatch(authRequestFailed(error.message))
  }
}

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData()
  dispatch(userLoggedOut())
  history.push(MAIN_ROUTE)
}

/* Selectors to return curent state */

export const getUsersList = () => (state) => {
  return state.users.entities
}
export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((user) => user._id === userId)
  }
}
export const getUserIsLoggedIn = () => (state) => {
  return state.users.isLoggedIn
}
export const getDataStatus = () => (state) => {
  return state.users.dataLoaded
}
export const getCurrentUserId = () => (state) => {
  return state.users.auth.userId
}
export const getUsersLoadingStatus = () => (state) => {
  return state.users.isLoading
}
export const getCurrentUserData = () => (state) => {
  if (state.users.entities) {
    return state.users.entities.find(
      (user) => user._id === state.users.auth.userId
    )
  }
  return null
}
export const getAuthError = () => (state) => state.users.error
export default userReducer
