import React, { useEffect, useState } from 'react'
import TextField from '../../common/form/TextField'
import { validator } from '../../../utilits/validator'
import { validatorConfig } from '../../../utilits/validatorConfig'
import api from '../../../API'
import SelectField from '../../common/form/SelectField'
import RadioField from '../../common/form/RadioField'
import MultiSelectField from '../../common/form/MultiSelectField'
import CheckField from '../../common/form/CheckField'

function RegisterForm() {
  const [professions, setProfession] = useState([])
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  })
  const [errors, setErrors] = useState({})
  const [qualities, setQualities] = useState({})
  console.log(data)
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  const onChangeHandle = (target) => {
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
      setData({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        qualities: [],
        licence: false
      })
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

  const isValid = Object.keys(errors).length === 0
  return (
    <form
      onSubmit={submitHandle}
      className="d-flex flex-column needs-validation"
    >
      <h3 className="mb-4">Register</h3>
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
        label="Ваш пароль"
        type="password"
        error={errors.password}
      />
      <SelectField
        onChangeHandle={onChangeHandle}
        options={professions}
        label="Выбирите вашу профессию"
        value={data.profession}
        defaultOption="Choose..."
        name="profession"
        error={errors.profession}
      />

      <RadioField
        options={[
          { name: 'Муж', value: 'male' },
          { name: 'Жен', value: 'female' },
          { name: 'Другое', value: 'other' }
        ]}
        value={data.sex}
        onChangeHandle={onChangeHandle}
        name="sex"
      />

      <MultiSelectField
        name="qualities"
        options={qualities}
        onChangeHandle={onChangeHandle}
        label="Выбирите качество"
      />

      <CheckField
        name="licence"
        value={data.licence}
        onChangeHandle={onChangeHandle}
        error={errors.licence}
      >
        Подтвердить соглашение с лицензией
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

export default RegisterForm
