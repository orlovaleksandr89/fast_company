const express = require('express')
const Quality = require('../models/Quality')

const router = express.Router({
  mergeParams: true
})

router.get('/', async (req, res) => {
  try {
    const qualities = await Quality.find()
    res.status(200).send(qualities)
  } catch (error) {
    res.status(500).json({ message: 'Server error, try again later' })
  }
})

module.exports = router
