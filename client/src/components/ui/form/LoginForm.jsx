import React, { useEffect, useState } from 'react'
import TextField from '../../common/form/TextField'
import { validator } from '../../../utilits/validator'
import CheckField from '../../common/form/CheckField'
import { MAIN_ROUTE } from '../../../utilits/constants'
import { getAuthError, logIn } from '../../../store/users'
import { useDispatch, useSelector } from 'react-redux'
import history from '../../../utilits/history'
import { toast } from 'react-toastify'

function LoginForm() {
  const dispatch = useDispatch()
  const authError = useSelector(getAuthError())
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const onChangeHandle = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }
  useEffect(() => {
    toast.error(authError)
  }, [authError])

  const submitHandle = (e) => {
    e.preventDefault()
    const isValid = validate()
    if (!isValid) {
      return
    }
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : MAIN_ROUTE
    dispatch(logIn({ data, redirect }))
  }
  const loginValidatorConfig = {
    email: {
      isRequired: {
        message: 'Email is required'
      }
    },
    password: {
      isRequired: { message: 'Password is required' }
    }
  }

  const validate = () => {
    const errors = validator(data, loginValidatorConfig)
    setErrors(errors)

    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    validate()
    return () => {}
  }, [data])

  const isValid = Object.keys(errors).length === 0
  return (
    <form onSubmit={submitHandle} className="d-flex flex-column">
      <h3 className="mb-4">Login</h3>
      <TextField
        name="email"
        value={data.email}
        onChangeHandle={onChangeHandle}
        label="Введите вашу электронную почту"
        error={errors.email}
      />
      <TextField
        name="password"
        value={data.password}
        onChangeHandle={onChangeHandle}
        label="Введите ваш пароль"
        type="password"
        error={errors.password}
      />

      <CheckField
        name="stayOn"
        value={data.stayOn}
        onChangeHandle={onChangeHandle}
      >
        Оставаться в системе
      </CheckField>
      <button
        type="submit"
        className="mt-3 align-self-end btn btn-primary"
        disabled={!isValid}
      >
        Submit
      </button>
    </form>
  )
}

export default LoginForm
