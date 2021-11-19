import PropTypes from 'prop-types'
import React from 'react'
import { useProfessions } from '../../hooks/useProfession'

function Profession({ id }) {
  const { loading, getProfessionById } = useProfessions()

  const profession = getProfessionById(id)

  return <div>{!loading ? profession.name : 'loading'}</div>
}
Profession.propTypes = {
  id: PropTypes.string
}
export default Profession
