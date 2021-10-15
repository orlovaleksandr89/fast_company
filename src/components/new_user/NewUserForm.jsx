import React, { useEffect, useState } from 'react'
import TextField from '../form/TextField'
import { validator } from '../../utilits/validator'
import { newUserValidatorConfig } from '../../utilits/newUserValidatorConfig'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

function NewUserForm(props) {
  const user = props.location.state
  const [data, setData] = useState(
    user || {
      name: '',
      lastname: '',
      dateofbirth: '',
      portfolio: ''
    }
  )
  console.log(user)
  const [errors, setErrors] = useState({})
  const isValid = Object.keys(errors).length === 0
  const history = useHistory()

  const onChangeHandle = ({ target }) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }
  const submitHandle = () => {
    event.preventDefault()
    if (!isValid) {
      return
    }
    localStorage.setItem('user', JSON.stringify(data))
    setData({ name: '', lastname: '', dateofbirth: '', portfolio: '' })
    history.push('/new_user')
  }

  const validate = () => {
    const errors = validator(data, newUserValidatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  useEffect(() => {
    validate()
  }, [data])

  return (
    <div className="container mt-4">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 ">
          <form
            onSubmit={submitHandle}
            className="d-flex flex-column shadow p-4"
          >
            <h3 className="mb-4">Создать</h3>
            <TextField
              name="name"
              value={data.name}
              onChangeHandle={onChangeHandle}
              label="Имя"
              error={errors.name}
            />
            <TextField
              name="lastname"
              value={data.lastname}
              onChangeHandle={onChangeHandle}
              label="Фамилия"
              error={errors.lastname}
            />
            <TextField
              name="dateofbirth"
              value={data.dateofbirth}
              onChangeHandle={onChangeHandle}
              label="Год рождения"
              type="date"
              error={errors.dateofbirth}
            />
            <TextField
              name="portfolio"
              value={data.portfolio}
              onChangeHandle={onChangeHandle}
              label="Ссылка на портфолио"
              error={errors.portfolio}
            />
            <div className="d-flex flex-row align-self-end">
              {user && (
                <button
                  type="button"
                  className="mt-3  btn btn-secondary"
                  onClick={() => history.goBack()}
                >
                  Назад
                </button>
              )}
              <button
                type="submit"
                className="mt-3 ms-3 align-self-end btn btn-primary"
                disabled={!isValid}
              >
                {user ? 'Обновить' : 'Создать'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
NewUserForm.propTypes = {
  user: PropTypes.object,
  props: PropTypes.object,
  location: PropTypes.object,
  state: PropTypes.object
}

export default NewUserForm
