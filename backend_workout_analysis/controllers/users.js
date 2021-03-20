const bcrypt = require('bcrypt')
const usersRouter = require('express').Router() 
const User = require ('../models/user')

usersRouter.get('/', async(request, response) => {
  const user=await User
    .find({}).populate('dates') //TODO no populate necessary
  response.json(user)
})

usersRouter.post('/', async(request, response) => { // same for trainer - just add new field for clients, and add client array one by one
	/*Register new user*/
  const body = request.body 
  if (!body.username || !body.password){
    return response.status(401).json({ error:'missing field' })
  } 
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds) 
  const user = new User({   // Initialised to an athlete's fields - if trainer => remove currentRegiment, regIsSet, add clients, etc
    username: body.username,
    passwordHash,
		currentRegiment:{Mon:null,Tue:null,Wed:null,Thu:null,Fri:null,Sat:null,Sun:null},
		regIsSet:false,
	}) 
	try{
		const savedUser = await user.save() 
	  response.json(savedUser)
	}
	catch{
		return response.status(401).json({ error:'user exists' })
	}
})

usersRouter.patch('/password', async(request, response) => { 
	/*Change user password. Request body carries username, oldPassword, newPassword*/
	const body = request.body 
	const user = await User.findOne({ username: body.username })
	const passwordCorrect = await bcrypt.compare(body.currentPassword, user.passwordHash)
  /*validate current password*/ 
  if (! passwordCorrect) {
    return response.status(401).json({
      error: 'invalid credentials :('
    })
  }
  if (!body.username || !body.currentPassword || !body.newPassword){
    return response.status(401).json({ error:'missing field' })
  } 
  const saltRounds = 10
	const newPasswordHash = await bcrypt.hash(body.newPassword, saltRounds) 
	user.passwordHash=newPasswordHash
	savedUser = await user.save() //Update user
	response.json(savedUser) 
})

module.exports = usersRouter
