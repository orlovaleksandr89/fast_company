import React from 'react'
import PropTypes from 'prop-types'

function TextField({ label, name, onChangeHandle, value, type, error }) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        value={value}
        name={name}
        onChange={onChangeHandle}
      />
      {error && <p className="text-danger">{error}</p>}
    </div>
  )
}
TextField.defaultProps = { type: 'text' }
TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChangeHandle: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string
}

export default TextField
