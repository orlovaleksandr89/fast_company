const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const { generateUserData } = require('../utils/generateUserData')
const tokenService = require('../services/token.service')

const router = express.Router({
  mergeParams: true
})

router.post('/signUp', [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password needs to be at least 8 characters long').isLength(
    { min: 8 }
  ),

  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400
          }
        })
      }

      const { email, password } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res
          .status(400)
          .json({ error: { message: 'EMAIL_EXISTS', code: 400 } })
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const newUser = await User.create({
        ...generateUserData(),
        ...req.body,
        password: hashedPassword
      })

      const tokens = tokenService.generate({ _id: newUser._id })
      await tokenService.save(newUser._id, tokens.refreshToken)

      res.status(201).send({ ...tokens, userId: newUser._id })
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
])
router.post('/signInWithPassword', [
  check('email', 'Please enter a valid email').isEmail(),
  check('password', 'Password needs to be at least 8 characters long').exists(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: 'INVALID_DATA',
            code: 400,
            errors: errors.array()
          }
        })
      }
      const { email, password } = req.body
      const existingUser = await User.findOne({ email })
      if (!existingUser) {
        return res
          .status(400)
          .send({ error: { message: 'EMAIL_NOT_FOUND', code: 400 } })
      }

      const isValidPassword = await bcrypt.compare(
        password,
        existingUser.password
      )

      if (!isValidPassword) {
        return res
          .status(400)
          .send({ error: { message: 'INVALID_PASSWORD', code: 400 } })
      }

      const tokens = tokenService.generate({ _id: existingUser._id })
      await tokenService.save(existingUser._id, tokens.refreshToken)

      return res.status(200).send({ ...tokens, userId: existingUser._id })
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' })
    }
  }
])

function isTokenInvalid(tokenData, dbToken) {
  return !tokenData || !dbToken || tokenData._id !== dbToken?.user?.toString()
}
router.post('/token', async (req, res, next) => {
  try {
    const { refresh_token: refreshToken } = req.body
    const tokenData = tokenService.validateRefresh(refreshToken)
    const dbToken = await tokenService.findToken(refreshToken)

    if (isTokenInvalid(tokenData, dbToken)) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const tokens = tokenService.generate({ _id: tokenData._id })

    await tokenService.save(tokenData._id, tokens.refreshToken)

    return res.status(200).send({ ...tokens, userId: tokenData._id })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' })
  }
})

module.exports = router
