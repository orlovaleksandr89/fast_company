import React from 'react'
import PropTypes from 'prop-types'

const Quality = ({ name, color }) => {
  return (
    <span
      style={{ margin: '3px 3px', fontSize: '14px' }}
      className={`badge bg-${color}`}
    >
      {name}
    </span>
  )
}
Quality.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}
export default Quality
