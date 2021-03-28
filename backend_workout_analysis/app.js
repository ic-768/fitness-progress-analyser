const config = require('./utils/config')
const userRouter = require('./controllers/users')
const routineRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const workoutRouter = require('./controllers/workouts')
const clientRouter = require('./controllers/clients')
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
app.use(express.static("build"))
app.use('/api/users', userRouter) /*get/create users,edit non-workout user data*/
app.use('/api/login', loginRouter) 
app.use('/api/workout', workoutRouter) 
app.use('/api/clients', clientRouter) 

app.get('/*', function(req, res) {
	res.sendFile(`${__dirname}/build/index.html`,function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

module.exports = app
