import React, { useEffect, useState } from 'react'
import MultiSelectField from '../../components/common/form/MultiSelectField'
import RadioField from '../../components/common/form/RadioField'
import SelectField from '../../components/common/form/SelectField'
import TextField from '../../components/common/form/TextField'
import { validatorConfig } from '../../utilits/validatorConfig'
import { validator } from '../../utilits/validator'
import PropTypes from 'prop-types'
import { useAuth } from '../../hooks/useAuth'
import { useQualities } from '../../hooks/useQualities'
import { useProfessions } from '../../hooks/useProfession'
import { useHistory } from 'react-router-dom'

function EditPage() {
  const history = useHistory()
  const { currentUser, loading, updateUser } = useAuth()
  const { qualities, qualitiesLoading } = useQualities()
  const { professions, loading: profLoading } = useProfessions()
  const [errors, setErrors] = useState({})
  const [data, setData] = useState({
    ...currentUser
  })

  const newQualities = qualities.map((qual) => ({
    value: qual._id,
    label: qual.name
  }))
  const defaultUserQualities = qualities.filter((q) =>
    currentUser.qualities.includes(q._id)
  )

  const onChangeHandle = (target) => {
    setData((prev) => ({
      ...prev,
      [target.name]:
        target.name === 'profession'
          ? professions.find((profession) => profession._id === target.value)
          : target.value
    }))
  }

  const submitHandle = async (e) => {
    try {
      e.preventDefault()
      const isValid = validate()
      if (!isValid) {
        return
      }
      const userMapedQualities = data.qualities.map((qual) => qual.value)

      const formData = {
        ...data,
        profession: data._id,
        qualities: userMapedQualities
      }

      await updateUser(formData)
      history.goBack()
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
    <div className="container ">
      {!loading && !qualitiesLoading && !profLoading && (
        <div className="row d-flex justify-content-start m-4">
          <div className="col-md-2">
            <button
              className="btn btn-primary"
              onClick={() => history.goBack()}
            >
              <i className="bi bi-arrow-left"></i>
              <span>Назад</span>
            </button>
          </div>
          <div
            className="col-md-6 text-start p-4 shadow
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
                options={newQualities}
                onChangeHandle={onChangeHandle}
                label="Выбирите качество"
                defaultValue={defaultUserQualities}
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
      )}
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
