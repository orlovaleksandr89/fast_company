const tokenSevice = require('../services/token.service')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    // Bearer
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
    }

    const tokenData = tokenSevice.validateAccessToken(token)

    req.user = tokenData

    next()
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
