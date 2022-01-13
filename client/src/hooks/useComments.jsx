// import React, { useState, useContext, useEffect } from 'react'
// import { nanoid } from 'nanoid'
// import PropTypes from 'prop-types'
// import { useParams } from 'react-router-dom'

// import { toast } from 'react-toastify'
// import commentsService from '../services/comment.service'
// import { useSelector } from 'react-redux'
// import { getCurrentUserId } from '../store/users'
// // import Loader from '../components/ui/loader'

// const CommentContext = React.createContext()

// export const useComments = () => {
//   return useContext(CommentContext)
// }

// export const CommentsProvider = ({ children }) => {
//   const { id } = useParams()
//   const currentUserId = useSelector(getCurrentUserId())
//   const [, setLoading] = useState(true)
//   const [comments, setComments] = useState([])
//   const [error, setError] = useState(null)
//   useEffect(() => {
//     if (error !== null) {
//       toast.error(error)
//       setError(null)
//     }
//   }, [error])

//   useEffect(() => {
//     getComments(id)
//     return () => {
//       setLoading(false)
//     }
//   }, [id])

//   async function createComment(data) {
//     const comment = {
//       ...data,
//       pageId: id,
//       created_at: Date.now(),
//       userId: currentUserId,
//       _id: nanoid()
//     }
//     try {
//       setLoading(true)
//       const { content } = await commentsService.createComment(comment)
//       setComments((prevstate) => [content, ...prevstate])
//     } catch (error) {
//       errorCatcher(error)
//     } finally {
//       setLoading(false)
//     }
//   }
//   async function getComments(userId) {
//     try {
//       const { content } = await commentsService.getComments(userId)
//       setComments(content)
//     } catch (error) {
//       errorCatcher(error)
//     } finally {
//       setLoading(false)
//     }
//   }
//   async function deleteComment(commentId) {
//     try {
//       const { content } = await commentsService.deleteComment(commentId)
//       if (content === null) {
//         setComments((prevState) =>
//           prevState.filter((comment) => comment._id !== commentId)
//         )
//       }
//     } catch (error) {
//       errorCatcher(error)
//     }
//   }

//   function errorCatcher(error) {
//     const { message } = error.response.data
//     setError(message)
//     setLoading(false)
//   }

//   return (
//     <CommentContext.Provider value={{ comments, createComment, deleteComment }}>
//       {children}
//     </CommentContext.Provider>
//   )
// }
// CommentsProvider.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.node),
//     PropTypes.node
//   ])
// }
