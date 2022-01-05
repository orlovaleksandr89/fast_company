import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import { httpAuth } from '../hooks/useAuth'
import localStorageService from './localStorage.service'
const http = axios.create({
  baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
  async function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
      const expiresDate = localStorageService.getExpiresIn()
      const refreshToken = localStorageService.getRefreshToken()
      if (refreshToken && expiresDate < Date.now()) {
        const { data } = await httpAuth.post(
          `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_KEY}`,
          {
            grant_type: 'refresh_token',
            refresh_token: refreshToken
          }
        )
        localStorageService.setToken({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          localId: data.user_id,
          expiresIn: data.expires_in
        })
      }
      const accessToken = localStorageService.getAccessToken()
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken }
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({ ...data[key] }))
    : data
}
http.interceptors.response.use(
  (response) => {
    if (configFile.isFireBase) {
      response.data = { content: transformData(response.data) }
    }
    return response
  },
  function (error) {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500

    if (!expectedError) {
      toast.info('Something went wrong. Please try again later')
    }
    return Promise.reject(error)
  }
)
const httpServise = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch
}
export default httpServise
