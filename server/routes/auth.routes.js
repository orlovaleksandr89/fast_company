const express = require('express')

const router = express.Router({
  mergeParams: true
})
router.post('/signUp', async (req, res, next) => {})
router.post('/signInWithPassword', async (req, res, next) => {})
router.post('/token', async (req, res, next) => {})

module.exports = router
