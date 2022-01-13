import React from 'react'

import PropTypes from 'prop-types'
import SingleCommentForUser from './SingleCommentForUser'

import { useDispatch, useSelector } from 'react-redux'
import { deleteComment, getCommentsLoadingStatus } from '../../store/comments'

function Comment({ commentsForUser }) {
  const dispatch = useDispatch()
  const commentLoadingStatus = useSelector(getCommentsLoadingStatus())

  const handleRemoveComment = (id) => {
    dispatch(deleteComment(id))
  }

  if (commentLoadingStatus) {
    return <p>Loading....</p>
  }

  if (commentsForUser.length === 0) {
    return <p>Никто еще не оставлял комментарии, вы будете первым</p>
  }

  return (
    <>
      {commentsForUser.map((comment) => (
        <SingleCommentForUser
          key={comment._id}
          {...comment}
          handleRemoveComment={handleRemoveComment}
        />
      ))}
    </>
  )
}
Comment.propTypes = {
  id: PropTypes.string,
  loading: PropTypes.bool,
  allUsers: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  commentsForUser: PropTypes.array,
  setCommentsForUser: PropTypes.func,
  getUsersCommentsFromDB: PropTypes.func
}
export default Comment
