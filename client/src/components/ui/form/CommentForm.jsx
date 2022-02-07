import React, { useEffect, useState } from 'react'
import { validatorConfig } from '../../../utilits/validatorConfig'
import PropTypes from 'prop-types'

import TextArea from '../../common/form/TextArea'
import { validator } from '../../../utilits/validator'

function CommentForm({ isLoading, handleSubmit }) {
  const [errors, setErrors] = useState({})
  const [data, setData] = useState({ content: '' })

  const onChangeHandle = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }
  const submitHandle = (e) => {
    e.preventDefault()
    if (!isValid) {
      return
    }
    handleSubmit(data)
    clearForm()
  }

  const clearForm = () => {
    setData({ content: '' })
    setErrors({})
  }
  const validate = () => {
    const errors = validator(data, validatorConfig)

    setErrors(errors)
    return Object.keys(errors).length === 0
  }
  useEffect(() => {
    validate()
  }, [data])

  const isValid = Object.keys(errors).length === 0

  return (
    <div className="card-body">
      <form
        className="d-flex flex-column needs-validation"
        onSubmit={submitHandle}
      >
        <h2>New Comment</h2>

        <TextArea
          name="content"
          label="Сообщение"
          onChangeHandle={onChangeHandle}
          placeholder="Ваш комментарий ..."
          value={data.content || ''}
          error={errors.content}
        />
        <button
          type="submit"
          className="mt-3 align-self-end btn btn-primary"
          disabled={!isValid || isLoading}
        >
          Опубликовать
        </button>
      </form>
    </div>
  )
}
CommentForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired
}
export default React.memo(CommentForm)
