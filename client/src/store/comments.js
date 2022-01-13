import { createAction, createSlice } from '@reduxjs/toolkit'
import commentsService from '../services/comment.service'
import { nanoid } from 'nanoid'

const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    entities: [],
    isLoading: true,
    error: null
  },
  reducers: {
    commentsServiceRequested(state, action) {
      state.isLoading = true
    },
    commentsRequestFailed(state, action) {
      state.error = action.payload
      state.isLoading = false
    },
    commentsRequestSuccess(state, action) {
      state.entities = action.payload
      state.isLoading = false
    },
    newCommentCreated(state, action) {
      state.entities.push(action.payload)
      state.isLoading = false
    },
    commentDeleted(state, action) {
      state.isLoading = false
      state.entities = state.entities.filter(
        (comment) => comment._id !== action.payload
      )
    }
  }
})

const { actions, reducer: commentsReducer } = commentsSlice
const createCommentRequested = createAction('comments/createCommentRequested')

const {
  commentsServiceRequested,
  commentsRequestFailed,
  commentsRequestSuccess,
  newCommentCreated,
  commentDeleted
} = actions
/* functions to dispatch changes to state */
export const loadCommentsList = (userId) => async (dispatch) => {
  dispatch(commentsServiceRequested())
  try {
    const { content } = await commentsService.getComments(userId)
    dispatch(commentsRequestSuccess(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const createComment = (payload) => async (dispatch) => {
  dispatch(createCommentRequested())

  const { userId: id, data, currentUserId } = payload
  const comment = {
    ...data,
    pageId: id,
    created_at: Date.now(),
    userId: currentUserId,
    _id: nanoid()
  }
  try {
    const { content } = await commentsService.createComment(comment)
    dispatch(newCommentCreated(content))
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

export const deleteComment = (commentId) => async (dispatch) => {
  dispatch(commentsServiceRequested())
  try {
    const { content } = await commentsService.deleteComment(commentId)

    if (content === null) {
      dispatch(commentDeleted(commentId))
    }
  } catch (error) {
    dispatch(commentsRequestFailed(error.message))
  }
}

/* selectors */
export const getCommentsList = () => (state) => {
  if (state.comments.entities) {
    return state.comments.entities
  }
}
export const getCommentsLoadingStatus = () => (state) =>
  state.comments.isLoading

export default commentsReducer
