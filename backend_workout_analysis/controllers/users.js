const bcrypt = require('bcrypt')
const usersRouter = require('express').Router() 
const User = require ('../models/user')
const Day = require ('../models/workoutDay')

usersRouter.get('/', async(request, response) => {
	/*get all users*/
  const allUsers=await User
    .find({}).populate('dates')
  /*populate blogs field
   with the _id of whatever the model is "ref"-ing*/
  response.json(allUsers)
})

usersRouter.post('/', async(request, response) => {
	/*Register new user*/
  const body = request.body 
  if (!body.username || !body.password){
    return response.status(401).json({ error:'missing field' })
  } 
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds) 
  const user = new User({
    username: body.username,
    passwordHash,
		dates:[]
  }) 
  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = usersRouter
