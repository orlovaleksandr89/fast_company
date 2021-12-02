import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
const http = axios.create({
  baseURL: configFile.apiEndPoint
})

http.interceptors.request.use(
  function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
function transforData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({ ...data[key] }))
    : data
}
http.interceptors.response.use(
  (response) => {
    if (configFile.isFireBase) {
      response.data = { content: transforData(response.data) }
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
  delete: http.delete
}
export default httpServise
