const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const chalk = require('chalk')
const PORT = process.env.PORT || config.get('PORT') || 8080
const initDatabase = require('./startUp/initDatabase')
const routes = require('./routes')
const cors = require('cors')
const path = require('path')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client')))
  const indexPath = path.join(__dirname, 'client', 'index.html')
  app.get('*', (req, res) => {
    res.sendFile(indexPath)
  })
} else {
  console.log(chalk.blueBright('Development'))
}

async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase()
    })
    await mongoose.connect(config.get('MONGO_URI'))
    console.log(chalk.greenBright('Mongo connected'))
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}`))
    })
  } catch (error) {
    console.log(chalk.red(error.message))
    process.exit(1)
  }
}

start()
