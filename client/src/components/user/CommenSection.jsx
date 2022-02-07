import React, { useEffect } from 'react'
import Comment from './Comment'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  createComment,
  getCommentsList,
  getCommentsLoadingStatus,
  loadCommentsList
} from '../../store/comments'
import { orderBy } from 'lodash'
import CommentForm from '../ui/form/CommentForm'

function CommentSection({ userId }) {
  const dispatch = useDispatch()
  const commentLoadingStatus = useSelector(getCommentsLoadingStatus())
  const comments = useSelector(getCommentsList())

  useEffect(() => {
    dispatch(loadCommentsList(userId))
  }, [userId])

  const submitHandle = (data) => {
    dispatch(createComment({ userId, ...data }))
  }

  const sortedComments = orderBy(comments, ['created_at'], ['desc'])

  return (
    <>
      <div className="card mb-2">
        <CommentForm
          handleSubmit={submitHandle}
          isLoading={commentLoadingStatus}
        />
      </div>
      <div className="card mb-3">
        <div className="card-body ">
          <h2>Comments</h2>
          <hr />
          <Comment commentsForUser={sortedComments} />
        </div>
      </div>
    </>
  )
}
CommentSection.propTypes = {
  userId: PropTypes.string
}

export default CommentSection
