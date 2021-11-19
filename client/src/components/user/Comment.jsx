import React from 'react'

import PropTypes from 'prop-types'
import SingleCommentForUser from './SingleCommentForUser'
import api from '../../API'

function Comment({ id: userId, setCommentsForUser, commentsForUser, loading }) {
  const removeCommentHandler = (id) => {
    api.comments.remove(id)
    api.comments
      .fetchCommentsForUser(userId)
      .then((data) => setCommentsForUser(data.reverse()))
  }

  if (commentsForUser.length === 0) {
    return <div>Нет комментариев, вы будете первым</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {commentsForUser.map((comment) => (
        <SingleCommentForUser
          key={comment._id}
          {...comment}
          removeCommentHandler={removeCommentHandler}
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
