import React from 'react'
import PropTypes from 'prop-types'

function SearchBar({ searchValue, getSearchValueHandler }) {
  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      value={searchValue}
      onChange={getSearchValueHandler}
    />
  )
}

SearchBar.propTypes = {
  getSearchValueHandler: PropTypes.func,
  searchValue: PropTypes.string
}

export default SearchBar
