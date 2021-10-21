import React from 'react'

import PropTypes from 'prop-types'
import SingleCommentForUser from './SingleCommentForUser'
import api from '../../API'

function Comment({
  id: userId,
  allUsers,
  loading,
  commentsForUser,
  setCommentsForUser
}) {
  const removeCommentHandler = (id) => {
    api.comments.remove(id)
    api.comments
      .fetchCommentsForUser(userId)
      .then((data) => setCommentsForUser(data.reverse()))
  }
  if (commentsForUser.length === 0) {
    return <div>Нет комментариев, вы будете первым</div>
  }
  return (
    <>
      {commentsForUser &&
        commentsForUser.map((comment) => (
          <SingleCommentForUser
            key={comment._id}
            {...comment}
            allUsers={allUsers}
            loading={loading}
            removeCommentHandler={removeCommentHandler}
          />
        ))}
    </>
  )
}
Comment.propTypes = {
  id: PropTypes.string,
  loading: PropTypes.bool,
  allUsers: PropTypes.object,
  commentsForUser: PropTypes.array,
  setCommentsForUser: PropTypes.func
}
export default Comment
