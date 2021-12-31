import React, { useEffect, useState } from 'react'
import TextField from '../../common/form/TextField'
import { validator } from '../../../utilits/validator'
import { validatorConfig } from '../../../utilits/validatorConfig'
import CheckField from '../../common/form/CheckField'
import { useAuth } from '../../../hooks/useAuth'
import { useHistory } from 'react-router-dom'
import { MAIN_ROUTE } from '../../../utilits/constants'

function LoginForm() {
  const history = useHistory()
  const [data, setData] = useState({ email: '', password: '', stayOn: false })
  const [errors, setErrors] = useState({})
  const onChangeHandle = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }
  const { login } = useAuth()

  const submitHandle = async (e) => {
    try {
      e.preventDefault()
      const isValid = validate()
      if (!isValid) {
        return
      }

      await login(data)
      history.push(
        history.location.state
          ? history.location.state.from.pathname
          : MAIN_ROUTE
      )
    } catch (error) {
      setErrors(error)
    }
  }

  const validate = () => {
    const errors = validator(data, validatorConfig)
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
