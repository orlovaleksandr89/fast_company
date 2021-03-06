import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

function MultiSelectField({
  options,
  name,
  onChangeHandle,
  label,
  defaultValue,
  error
}) {
  const optionsArr =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((option) => ({
          value: options[option]._id,
          label: options[option].name
        }))
      : options
  const handleChange = (value) => {
    onChangeHandle({ name: name, value })
  }
  // const defaultValueToArray =
  //   defaultValue.map((item) => ({
  //     value: item._id,
  //     label: item.name
  //   })) || []
  const getInputClasses = () => {
    return `${error ? 'is-invalid' : ''} `
  }

  return (
    <div className="mb-4">
      <label className="form-label me-3">{label}</label>
      <Select
        closeMenuOnSelect={true}
        isMulti
        name={name}
        options={optionsArr}
        classNamePrefix="select"
        onChange={handleChange}
        defaultValue={defaultValue}
        className={getInputClasses()}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}
MultiSelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  defaultValue: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeHandle: PropTypes.func,
  error: PropTypes.string
}

export default MultiSelectField
