const express = require('express')
const authMiddleware = require('../middleware/auth.middleware')
const Comment = require('../models/Comment')
const router = express.Router({
  mergeParams: true
})

// /api/comment
router
  .route('/')
  .get(authMiddleware, async (req, res) => {
    try {
      const { orderBy, equalTo } = req.query

      const commentsList = await Comment.find({ [orderBy]: equalTo })

      res.status(200).send(commentsList)
    } catch (error) {
      res.status(500).json({ message: 'Server error, try again later' })
    }
  })
  .post(authMiddleware, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        userId: req.user._id
      })
      return res.status(201).send(newComment)
    } catch (error) {
      res.status(500).json({ message: 'Server error, try again later' })
    }
  })

router.delete('/:commentId', authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params
    const removedComment = await Comment.findById(commentId)

    if (removedComment.userId.toString() === req.user._id) {
      await removedComment.remove()
      return res.status(200).send(null)
    } else {
      res.status(401).json({ message: 'Unauthorized' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error, try again later' })
  }
})

module.exports = router
