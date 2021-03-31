const bcrypt = require('bcrypt')
const usersRouter = require('express').Router() 
const User = require ('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => { // TODO refactor -- copied from workouts.js
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer')){
		return authorization.substring(7)
	}
} 

const verifyToken = token =>{
	const decodedToken=jwt.verify(token, process.env.SECRET)
	const success=(!token || !decodedToken.id)
		? false
		: true
	return [success,decodedToken] 
}

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
		user.clients=undefined 
	try{
		const savedUser = await user.save() 
	  response.json(savedUser)
	}
	catch{
		return response.status(401).json({ error:'user exists' })
	}
})

usersRouter.post('/name', async(request, response) => { 
	/*Change user's name*/
	const body = request.body 
	console.log(body)
  if (!body.name){
    return response.status(401).json({ error:'missing field' })
	} 

	const token = getTokenFrom(request)
	const [succeeded, decodedToken]=verifyToken(token)

	if(!succeeded){ // Verification failure
		return response.status(401).json({error:"token missing or invalid"})
	}
	const user = await User.findById(decodedToken.id) 
		user.name=body.name 
		console.log(user.name)
	try{
		const savedUser = await user.save() 
	  response.json(savedUser)
	}
	catch{
		return response.status(401).json({ error:'something went wrong :(' })
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
