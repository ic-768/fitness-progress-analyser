const bcrypt = require('bcrypt')
const usersRouter = require('express').Router() 
const User = require ('../models/user')

usersRouter.post('/', async(request, response) => { 
	/*Register new user*/
  const body = request.body 
  if (!body.username || !body.password){
    return response.status(401).json({ error:'missing field' })
  } 
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds) 
  const user = new User({   // Initialised to an athlete's fields - if trainer => remove currentRegiment, regIsSet, add clients, etc at onboarding
    username: body.username,
    passwordHash,
		currentRegiment:{Mon:null,Tue:null,Wed:null,Thu:null,Fri:null,Sat:null,Sun:null},
		regIsSet:false,
	}) 
		user.clients=undefined //TODO can't get rid of client field if athlete?
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
