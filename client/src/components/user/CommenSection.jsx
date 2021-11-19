import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import SelectField from '../common/form/SelectField'
import TextArea from '../common/form/TextArea'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import api from '../../API'
import { validatorConfig } from '../../utilits/validatorConfig'
import { validator } from '../../utilits/validator'

function CommentSection() {
  const { id } = useParams()
  const [data, setData] = useState({
    content: '',
    userId: '',
    pageId: ''
  })
  const [errors, setErrors] = useState({})
  const [allUsers, setAllUsers] = useState([])
  const [loading, setIsLoading] = useState(false)
  const [commentsForUser, setCommentsForUser] = useState([])
  useEffect(() => {
    setIsLoading(true)
    getUsersCommentsFromDB(id)
    api.users
      .fetchAll()
      .then((data) => setAllUsers(Object.keys(data).map((key) => data[key])))
      .then(() => setIsLoading(false))
    return () => {
      setIsLoading(false)
    }
  }, [])

  const submitHandle = (e) => {
    try {
      setIsLoading(true)
      e.preventDefault()
      if (!isValid) {
        return
      }
      api.comments
        .add(data)
        .then((data) => setCommentsForUser([data, ...commentsForUser]))

      setData((prev) => ({ ...prev, content: '', userId: '' }))
      setErrors({})

      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }
  const getUsersCommentsFromDB = (userId) => {
    setIsLoading(true)
    api.comments
      .fetchCommentsForUser(userId)
      .then((comments) => setCommentsForUser(comments.reverse()))
      .then(() => setIsLoading(false))
  }

  const onChangeHandle = (target) => {
    setData((prev) => ({ ...prev, [target.name]: target.value }))
  }

  useEffect(() => {
    setData((prev) => ({ ...prev, pageId: id }))
  }, [location])

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
            {allUsers && (
              <SelectField
                options={allUsers}
                defaultOption="Выбирете пользователя"
                onChangeHandle={onChangeHandle}
                name="userId"
                value={data.userId}
                error={errors.userId}
                loading={loading}
              />
            )}

            <TextArea
              name="content"
              label="Сообщение"
              onChangeHandle={onChangeHandle}
              placeholder="Ваш комментарий ..."
              value={data.content}
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
          <Comment
            id={id}
            setCommentsForUser={setCommentsForUser}
            commentsForUser={commentsForUser}
            loading={loading}
          />
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
