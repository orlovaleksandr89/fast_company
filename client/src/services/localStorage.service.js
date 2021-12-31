const TOKEN_KEY = 'jwt_token'
const REFRESH_KEY = 'jwt_refresh_token'
const EXPIRES_KEY = 'jwt_expires'
const USERID_KEY = 'user-local-id'

export const setToken = ({
  refreshToken,
  idToken,
  localId,
  expiresIn = 3600
}) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(TOKEN_KEY, idToken)
  localStorage.setItem(USERID_KEY, localId)
  localStorage.setItem(REFRESH_KEY, refreshToken)
  localStorage.setItem(EXPIRES_KEY, expiresDate)
}

export const getAccessToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_KEY)
}
export const getExpiresIn = () => {
  return localStorage.getItem(EXPIRES_KEY)
}
export const getUserId = () => {
  return localStorage.getItem(USERID_KEY)
}
export const removeAuthData = () => {
  localStorage.removeItem(USERID_KEY)
  localStorage.removeItem(EXPIRES_KEY)
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

const localStorageService = {
  setToken,
  getAccessToken,
  getRefreshToken,
  getExpiresIn,
  getUserId,
  removeAuthData
}
export default localStorageService
