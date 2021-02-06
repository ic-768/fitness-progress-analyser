const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findOne({ username: body.username })
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
    /*printing token literally gives u this + "iat"*/
    username:user.username,
    id:user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  response
    .status(200)
  /* send token back to user*/
    .send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter
