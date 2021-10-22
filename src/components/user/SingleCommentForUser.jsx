import React, { useEffect, useState } from 'react'
import UserImage from '../ui/UserImage'
import PropTypes from 'prop-types'
import Loader from '../ui/loader'
import { getCommentTime } from '../../utilits/helpers'
import api from '../../API'

function SingleCommentForUser({
  userId,
  content,
  created_at: createdAt,
  removeCommentHandler,
  _id
}) {
  const [user, setUser] = useState({})

  useEffect(() => {
    api.users.getById(userId).then((user) => {
      setUser(user)
    })
  }, [])

  if (!userId) {
    return <Loader />
  }
  getCommentTime(createdAt)

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <UserImage />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {user.name}
                    <span className="small ms-3">
                      {getCommentTime(createdAt)}
                    </span>
                  </p>
                  <button
                    className="btn btn-sm text-primary d-flex align-items-center
                  "
                    onClick={() => removeCommentHandler(_id)}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
SingleCommentForUser.propTypes = {
  allUsers: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  userId: PropTypes.string,
  _id: PropTypes.string,
  content: PropTypes.string,
  loading: PropTypes.bool,
  removeCommentHandler: PropTypes.func,
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
export default SingleCommentForUser
