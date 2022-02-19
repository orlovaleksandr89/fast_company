const jwt = require('jsonwebtoken')
require('dotenv').config()

const Token = require('../models/Token')

class TokenService {
  generate(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: '1h'
    })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET)
    return { accessToken, refreshToken, expiresIn: 3600 }
  }

  async save(userId, refreshToken) {
    const data = await Token.findOne({ user: userId })
    if (data) {
      data.refreshToken = refreshToken
      return await data.save()
    }
    const token = await Token.create({
      user: userId,
      refreshToken: refreshToken
    })
    return token
  }

  validateRefresh(token) {
    try {
      return jwt.verify(token, process.env.REFRESH_SECRET)
    } catch (error) {
      return null
    }
  }
  validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, process.env.ACCESS_SECRET)
    } catch (error) {
      return null
    }
  }
  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken })
    } catch (error) {
      return null
    }
  }
}

module.exports = new TokenService()
