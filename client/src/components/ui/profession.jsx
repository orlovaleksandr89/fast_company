import PropTypes from 'prop-types'
import React from 'react'
import { useProfessions } from '../../hooks/useProfession'

function Profession({ id }) {
  const { getProfessionById } = useProfessions()

  const profession = getProfessionById(id)

  return <div>{profession && profession.name}</div>
}
Profession.propTypes = {
  id: PropTypes.string
}
export default Profession
