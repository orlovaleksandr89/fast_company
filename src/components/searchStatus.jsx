import React from 'react'
import { renderPhrase, spanClass } from '../utilits/helpers'
import PropTypes from 'prop-types'

const SearchStatus = ({ users }) => {
  return (
    <span
      style={{ fontSize: '20px', margin: '20px' }}
      className={spanClass(users.length)}
    >
      {renderPhrase(users.length)}
    </span>
  )
}
SearchStatus.propTypes = {
  users: PropTypes.array.isRequired
}
export default SearchStatus
