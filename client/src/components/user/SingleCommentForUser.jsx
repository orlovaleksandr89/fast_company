import React from 'react'
import UserImage from '../ui/UserImage'
import PropTypes from 'prop-types'
import { getCommentTime } from '../../utilits/helpers'
import { useUsers } from '../../hooks/useUsers'
import { useAuth } from '../../hooks/useAuth'

function SingleCommentForUser({
  userId,
  content,
  created_at: createdAt,
  handleRemoveComment,
  _id
}) {
  const { getUserById } = useUsers()
  const user = getUserById(userId)
  const { currentUser } = useAuth()

  return (
    <div className="bg-light card-body  mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start ">
            <UserImage image={user.image} />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1 ">
                    {user.name}
                    <span className="small ms-3">
                      {getCommentTime(createdAt)}
                    </span>
                  </p>
                  {currentUser._id === userId && (
                    <button
                      className="btn btn-sm text-primary d-flex align-items-center
                  "
                      onClick={() => handleRemoveComment(_id)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
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
  pageId: PropTypes.string,
  content: PropTypes.string,
  loading: PropTypes.bool,
  handleRemoveComment: PropTypes.func,
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
export default SingleCommentForUser
