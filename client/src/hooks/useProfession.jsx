import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import professionService from '../services/profession.service'

const ProfessionContext = React.createContext()
export const useProfessions = () => {
  return useContext(ProfessionContext)
}

const ProfessionProvider = ({ children }) => {
  const [professions, setProfessions] = useState([])
  const [profLoading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    getProfessions()
  }, [])

  useEffect(() => {
    if (error !== null) {
      toast.error(error)
      setError(null)
    }
  }, [error])

  async function getProfessions() {
    try {
      setLoading(true)
      const { content } = await professionService.get()
      setProfessions(content)
      setLoading(false)
    } catch (error) {
      errorCatcher(error)
    }
  }
  function getProfessionById(id) {
    return professions.find((x) => x._id === id)
  }
  function errorCatcher(error) {
    const { message } = error.response.data
    setError(message)
    setLoading(false)
  }

  return (
    <ProfessionContext.Provider
      value={{ professions, profLoading, getProfessionById }}
    >
      {children}
    </ProfessionContext.Provider>
  )
}
ProfessionProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
export default ProfessionProvider
