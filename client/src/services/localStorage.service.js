const TOKEN_KEY = 'jwt_token'
const REFRESH_KEY = 'jwt_refresh_token'
const EXPIRES_KEY = 'jwt_expires'

export const setToken = ({ refreshToken, idToken, expiresIn = 3600 }) => {
  const expiresDate = new Date().getTime() + expiresIn * 1000
  localStorage.setItem(TOKEN_KEY, idToken)
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

const localStorageService = {
  setToken,
  getAccessToken,
  getRefreshToken,
  getExpiresIn
}
export default localStorageService
