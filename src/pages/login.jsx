import React, { useEffect, useState } from 'react'

import { validator } from '../utilits/validator'
import { validatorConfig } from '../utilits/validatorConfig'
import LoginForm from '../components/form/LoginForm'

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})

  const onChangeHandle = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }
  const submitHandle = (e) => {
    try {
      e.preventDefault()
      const isValid = validate()
      if (!isValid) {
        return
      }

      console.log(data)
      setData({ email: '', password: '' })
    } catch (error) {
      console.log(error)
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

  return (
    <LoginForm
      data={data}
      errors={errors}
      onChangeHandle={onChangeHandle}
      submitHandle={submitHandle}
    />
  )
}

export default Login
