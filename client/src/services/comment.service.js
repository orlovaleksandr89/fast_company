import httpService from './http.service'

const commentsEndpoint = 'comments/'

const commentsService = {
  createComment: async (comment) => {
    const { data } = await httpService.put(
      commentsEndpoint + comment._id,
      comment
    )
    return data
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(commentsEndpoint, {
      params: {
        orderBy: '"pageId"',
        equalTo: `"${pageId}"`
      }
    })
    return data
  },
  deleteComment: async (commentId) => {
    const { data } = await httpService.delete(commentsEndpoint + commentId)
    return data
  }
}
export default commentsService
