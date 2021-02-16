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
  const body = request.body 
	const cleanedBody = body.map((exercise)=>{delete exercise.id // get rid of local id field
		return exercise
	})
	console.log(cleanedBody)
	const token = getTokenFrom(request)
	const [succeeded, decodedToken]=verifyToken(token)

	if(!succeeded){ // Verification failure
		return response.status(401).json({error:"token missing or invalid"})
	}
	
	const user = await User.findById(decodedToken.id)
	user.days=user.days.concat({date:Date(), exercises:cleanedBody}) 
	await user.save()
	response.status(201).json({date:new Date(), exercises:cleanedBody})
})

workoutRouter.patch('/regiment', async(request, response) => { //set target regiment
  const regiment = request.body 
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

module.exports = workoutRouter
