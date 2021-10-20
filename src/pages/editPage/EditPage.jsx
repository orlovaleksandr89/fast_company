import React, { useEffect, useState } from 'react'
import MultiSelectField from '../../components/common/form/MultiSelectField'
import RadioField from '../../components/common/form/RadioField'
import SelectField from '../../components/common/form/SelectField'
import TextField from '../../components/common/form/TextField'
import { validatorConfig } from '../../utilits/validatorConfig'
import { validator } from '../../utilits/validator'
import api from '../../API'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import { USERS_ROUTE } from '../../utilits/constants'

function EditPage({ location: { state } }) {
  const { id } = useParams()
  const history = useHistory()
  const [professions, setProfessions] = useState([])
  const [data, setData] = useState({
    ...state,
    email: state.email || '',
    sex: 'male'
  })

  const [errors, setErrors] = useState({})
  const [qualities, setQualities] = useState({})
  const onChangeHandle = (target) => {
    setData((prev) => ({
      ...prev,
      [target.name]:
        target.name === 'profession'
          ? professions.find((profession) => profession._id === target.value)
          : target.value
    }))
  }

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data))
    api.qualities.fetchAll().then((data) => setQualities(data))
  }, [])

  const submitHandle = (e) => {
    try {
      e.preventDefault()
      const isValid = validate()
      if (!isValid) {
        return
      }

      api.users.update(id, data)
      history.replace(USERS_ROUTE)
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
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div
          className="col-md-6 text-start p-4
        "
        >
          <form
            onSubmit={submitHandle}
            className="d-flex flex-column needs-validation"
          >
            <h3 className="mb-4">Edit</h3>
            <TextField
              name="name"
              value={data.name}
              onChangeHandle={onChangeHandle}
              label="Ваше имя"
              error={errors.name}
            />
            <TextField
              name="email"
              value={data.email}
              onChangeHandle={onChangeHandle}
              label="Ваша електронная почта"
              type="email"
              error={errors.email}
            />
            <SelectField
              onChangeHandle={onChangeHandle}
              options={professions}
              label="Выбирите вашу профессию"
              value={data.profession}
              defaultOption={data.profession.name}
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
              defaultValue={data.qualities}
              error={errors.qualities}
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
EditPage.propTypes = {
  user: PropTypes.object,
  props: PropTypes.object,
  location: PropTypes.object,
  state: PropTypes.object
}

export default EditPage
