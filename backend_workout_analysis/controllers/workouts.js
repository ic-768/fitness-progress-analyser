const workoutRouter = require('express').Router() 
//const Day = require ('../models/workoutDay')
const User = require ('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => { // get token from header
	const authorization = request.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer')){
		return authorization.substring(7)
	}
}

workoutRouter.post('/', async(request, response) => {
  const body = request.body 
	const cleanedBody = body.map((exercise)=>{delete exercise.id // get rid of local id field
		return exercise
	})
	console.log(cleanedBody)
	const token = getTokenFrom(request)
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if ( !token || !decodedToken.id){
		return response.status(401).json({error:'token missing or invalid'})
	}
	const user = await User.findById(decodedToken.id)
	//const result = await day.save()// we dont want a separate collection of days.
	user.days=user.days.concat({date:Date(), exercises:cleanedBody}) //days id saved to user
	const result=await user.save()
	response.status(201).json(result)
})

module.exports = workoutRouter
