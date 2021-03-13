const workoutRouter = require('express').Router() 
const User = require ('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => { // get token from header
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

workoutRouter.post('/', async(request, response) => {
	/*Create new workout "day" for user. Append object to mongoDB "day" array, comprising ID, 
	 * exercise "name", sets and reps */ 
  const body = request.body 
	const token = getTokenFrom(request)
	const [succeeded, decodedToken]=verifyToken(token)

	if(!succeeded){ // Verification failure
		return response.status(401).json({error:"token missing or invalid"})
	}
	console.log(body) 
	const user = await User.findById(decodedToken.id)
  user.days=user.days.concat({date:new Date(), exercises:body}) 
	await user.save()
	response.status(201).json({date:new Date(), exercises:body})
})

workoutRouter.patch('/regiment', async(request, response) => { //set/update target regiment
  const regiment = request.body 
	console.log(regiment)
	const token = getTokenFrom(request)
	const [succeeded, decodedToken]=verifyToken(token) 
	if(!succeeded){ 
		return response.status(401).json({error:"token missing or invalid"})
	} 
	const user = await User.findById(decodedToken.id) 
	user.currentRegiment=regiment
	user.regIsSet=true // user won't be prompted to set a regiment again (until switched back to false)
	await user.save()
	response.status(201).json(regiment)
})

workoutRouter.put('/regiment', async(request, response) => { //reset regiment entirely
	const token = getTokenFrom(request)
	console.log(token)
	const [succeeded, decodedToken]=verifyToken(token) 
	if(!succeeded){ 
		return response.status(401).json({error:"token missing or invalid"})
	} 
	const user = await User.findById(decodedToken.id) 
	user.currentRegiment={Mon:null,Tue:null,Wed:null,Thu:null,Fri:null,Sat:null,Sun:null}
	user.regIsSet=false
	await user.save()
	response.status(201).json(user) 
})
module.exports = workoutRouter
