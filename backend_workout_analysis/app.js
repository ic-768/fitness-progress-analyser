const config = require('./utils/config')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const mongoUrl = config.mongoUrl

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected')
  })
  .catch((error) => {
    console.log(error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)


module.exports = app
