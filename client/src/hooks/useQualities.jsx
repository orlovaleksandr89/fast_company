import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import qualityService from '../services/quality.service'

const qualityContext = React.createContext()
export const useQualities = () => {
  return useContext(qualityContext)
}

const QualityProvider = ({ children }) => {
  const [qualities, setQualities] = useState([])
  const [qualitiesLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    getQualities()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  async function getQualities() {
    try {
      const { content } = await qualityService.get()
      setQualities(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }
  // function getqualityById(id) {
  //   return qualitys.find((x) => x._id === id)
  // }
  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }

  return (
    <qualityContext.Provider value={{ qualities, qualitiesLoading }}>
      {children}
    </qualityContext.Provider>
  )
}
QualityProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
export default QualityProvider
