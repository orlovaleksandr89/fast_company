import React, { useEffect, useState } from 'react'
import MultiSelectField from '../../components/common/form/MultiSelectField'
import RadioField from '../../components/common/form/RadioField'
import SelectField from '../../components/common/form/SelectField'
import TextField from '../../components/common/form/TextField'
import { validatorConfig } from '../../utilits/validatorConfig'
import { validator } from '../../utilits/validator'
import PropTypes from 'prop-types'

import { useHistory } from 'react-router-dom'
import Loader from '../../components/ui/loader'
import { USERS_ROUTE } from '../../utilits/constants'
import { useDispatch, useSelector } from 'react-redux'
import { getQualities, getQualitiesLoadingStatus } from '../../store/qualities'
import {
  getProfessionsList,
  getProfessionsLoadingStatus
} from '../../store/professions'
import {
  getCurrentUserData,
  getUsersLoadingStatus,
  updateUser
} from '../../store/users'

function EditPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const loading = useSelector(getUsersLoadingStatus())
  const currentUser = useSelector(getCurrentUserData())

  const qualities = useSelector(getQualities())
  const qualitiesLoading = useSelector(getQualitiesLoadingStatus())
  const professions = useSelector(getProfessionsList())
  const profLoading = useSelector(getProfessionsLoadingStatus())

  const [errors, setErrors] = useState({})
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if (!loading && !qualitiesLoading && !profLoading && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformQualitiesData(currentUser.qualities),
        profession: transformProfessionData(currentUser.profession)
      })
    }
  }, [qualitiesLoading, profLoading, currentUser, data, loading])

  useEffect(() => {
    if (data && isLoading) {
      setLoading(false)
    }
  }, [data, isLoading])

  const transformQualitiesData = (data) => {
    return qualities
      .filter((qual) => data.includes(qual._id))
      .map((q) => ({ value: q._id, label: q.name }))
  }
  const transformProfessionData = (data) => {
    return professions.find((prof) => prof._id === data)
  }

  const qualitiesList = qualities.map((qual) => ({
    value: qual._id,
    label: qual.name
  }))

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

      const formData = {
        ...data,
        profession: data.profession._id,
        qualities: data.qualities.map((qual) => qual.value)
      }

      dispatch(updateUser(formData))

      history.push(USERS_ROUTE + '/' + currentUser._id)
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

  if (isLoading) {
    return <Loader />
  }
  return (
    <div className="container ">
      <div className="row d-flex justify-content-start m-4">
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={() => history.goBack()}>
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
              options={qualitiesList}
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
