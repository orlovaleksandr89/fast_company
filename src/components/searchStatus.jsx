import React from 'react'
import { renderPhrase, spanClass } from '../utilits/helpers'
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

export default SearchStatus
