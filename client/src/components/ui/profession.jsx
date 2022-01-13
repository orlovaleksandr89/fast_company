import PropTypes from 'prop-types'
import React from 'react'
import { getProfessionsById } from '../../store/professions'
import { useSelector } from 'react-redux'

function Profession({ id }) {
  const profession = useSelector(getProfessionsById(id))

  return <div>{profession && profession.name}</div>
}
Profession.propTypes = {
  id: PropTypes.string
}
export default Profession
