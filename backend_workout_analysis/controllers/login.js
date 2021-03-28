const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({ username: body.username }).populate("clients") //If trainer get clients
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)
  /*compare passwords*/

  if (!(user && passwordCorrect)) {
    /*user or password are incorrect*/
    return response.status(401).json({
      error: 'invalid credentials :('
    })
  }

  const userForToken = {
    username:user.username,
    id:user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  response
    .status(200)
  /* send token back to user*/
		.send({ token, username: user.username,days:user.days, regIsSet:user.regIsSet, currentRegiment:user.currentRegiment
		, isTrainer:user.isTrainer,clients:user.clients,routines:user.routines}) //TODO clean up

})

module.exports = loginRouter
