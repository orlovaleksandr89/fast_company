import React from 'react'

import PropTypes from 'prop-types'
import SingleCommentForUser from './SingleCommentForUser'
import { useComments } from '../../hooks/useComments'

function Comment({ commentsForUser }) {
  const { deleteComment } = useComments()
  if (commentsForUser.length === 0) {
    return <div>Нет комментариев, вы будете первым</div>
  }

  const handleRemoveComment = (id) => {
    deleteComment(id)
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
