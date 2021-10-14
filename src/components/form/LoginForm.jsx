import React from 'react'
import PropTypes from 'prop-types'
import TextField from './TextField'

function LoginForm({ submitHandle, onChangeHandle, errors, data }) {
  return (
    <div className="d-flex   align-items-center justify-content-center ">
      <form onSubmit={submitHandle}>
        <TextField
          name="email"
          value={data.email}
          onChangeHandle={onChangeHandle}
          label="Enter your email"
          error={errors.email}
        />
        <TextField
          name="password"
          value={data.password}
          onChangeHandle={onChangeHandle}
          label="Password"
          type="password"
          error={errors.password}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
LoginForm.propTypes = {
  submitHandle: PropTypes.func,
  onChangeHandle: PropTypes.func,
  errors: PropTypes.object,
  data: PropTypes.object
}
export default LoginForm
