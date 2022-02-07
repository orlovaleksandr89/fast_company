const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const PORT = config.get('PORT') || 8080
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
  console.log(chalk.blueBright('Production'))
} else {
  console.log(chalk.blueBright('Development'))
}

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase()
    })
    await mongoose.connect(config.get('MONGO_URI'))
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}`))
    })
  } catch (error) {
    console.log(chalk.red(error.message))
    process.exit(1)
  }
}

start()
