import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

function MultiSelectField({ options, name, onChangeHandle, label }) {
  const optionsArr = Object.keys(options).map((option) => ({
    value: option,
    label: options[option].name
  }))
  const handleChange = (target) => {
    onChangeHandle({ name: name, value: target })
  }

  return (
    <div className="mb-4">
      <label className="form-label me-3">{label}</label>
      <Select
        closeMenuOnSelect={false}
        isMulti
        name={name}
        options={optionsArr}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
      />
    </div>
  )
}
MultiSelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeHandle: PropTypes.func
}

export default MultiSelectField
