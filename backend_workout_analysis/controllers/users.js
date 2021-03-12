const bcrypt = require('bcrypt')
const usersRouter = require('express').Router() 
const User = require ('../models/user')

usersRouter.get('/', async(request, response) => {
  const user=await User
    .find({}).populate('dates')
  response.json(user)
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
		dates:[],
		currentRegiment:{Mon:null,Tue:null,Wed:null,Thu:null,Fri:null,Sat:null,Sun:null},
		regIsSet:false
	}) 
	try{
	const savedUser = await user.save() 
  response.json(savedUser)
	}
	catch{
		return response.status(401).json({ error:'user exists' })
	}
})

module.exports = usersRouter
