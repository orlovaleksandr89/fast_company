import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import TextArea from '../common/form/TextArea'
import PropTypes from 'prop-types'
import { validatorConfig } from '../../utilits/validatorConfig'
import { validator } from '../../utilits/validator'
import { useComments } from '../../hooks/useComments'

function CommentSection() {
  const [data, setData] = useState({ content: '' })
  const [errors, setErrors] = useState({})

  const { createComment, comments } = useComments()

  const submitHandle = async (e) => {
    try {
      e.preventDefault()
      if (!isValid) {
        return
      }
      await createComment(data)
      clearForm()
    } catch (error) {
      console.log(error)
    }
  }
  const clearForm = () => {
    setData({ content: '' })
    setErrors({})
  }

  const onChangeHandle = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
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
    <>
      <div className="card mb-2" onSubmit={submitHandle}>
        <div className="card-body ">
          <form className="d-flex flex-column needs-validation">
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
              disabled={!isValid}
            >
              Опубликовать
            </button>
          </form>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          <Comment commentsForUser={comments} />
        </div>
      </div>
    </>
  )
}
CommentSection.propTypes = {
  allUsers: PropTypes.object,
  id: PropTypes.string
}

export default CommentSection
