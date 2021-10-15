import React from 'react'
import PropTypes from 'prop-types'
import TextField from './TextField'

function LoginForm({ submitHandle, onChangeHandle, errors, data }) {
  const isValid = Object.keys(errors).length === 0
  return (
    <div className="container mt-4">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 ">
          <form
            onSubmit={submitHandle}
            className="d-flex flex-column shadow p-4"
          >
            <h3 className="mb-4">Login</h3>
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
            <button
              type="submit"
              className="mt-3 align-self-end btn btn-primary"
              disabled={!isValid}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
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
