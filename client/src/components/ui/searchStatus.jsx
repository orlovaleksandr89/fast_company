import React from 'react'
import { renderPhrase, spanClass } from '../../utilits/helpers'
import PropTypes from 'prop-types'

const SearchStatus = ({ userLength }) => {
  return (
    <div className="d-flex justify-content-center ">
      <span
        style={{ fontSize: '20px', margin: '20px' }}
        className={spanClass(userLength)}
      >
        {renderPhrase(userLength)}
      </span>
    </div>
  )
}
SearchStatus.propTypes = {
  userLength: PropTypes.number.isRequired
}
export default SearchStatus
