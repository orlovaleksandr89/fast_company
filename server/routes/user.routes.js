const express = require('express')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth.middleware')
const router = express.Router({
  mergeParams: true
})

router.patch('/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params

    if (userId === req.user._id) {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true
      })
      return res.status(200).send(updatedUser)
    } else {
      return res.status(401).json({ message: 'UNAUTHORIZED' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

router.get('/', authMiddleware, async (req, res) => {
  try {
    const usersList = await User.find()
    res.status(200).send(usersList)
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
