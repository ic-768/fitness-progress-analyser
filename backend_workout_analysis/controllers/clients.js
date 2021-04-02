const clientRouter = require('express').Router() 
const bcrypt = require('bcrypt')
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

clientRouter.post('/', async(request, response) => { 
	/*register and add client to trainer user*/ 
  const body = request.body 
	const token = getTokenFrom(request) 
	const [succeeded, decodedToken]=verifyToken(token)

	if(!succeeded){ // Verification failure
		return response.status(401).json({error:"token missing or invalid"})
	}

	//Create user for client
  const saltRounds = 10
	const passwordHash = await bcrypt.hash(body.password, saltRounds) 

  const client = new User({
    username: body.username,
		name:body.name, //TODO make frontend send name
    passwordHash,
		currentRegiment:{Mon:null,Tue:null,Wed:null,Thu:null,Fri:null,Sat:null,Sun:null},
		regIsSet:false,
	}) 

	client.clients=undefined 
	client.routines=undefined

	let savedClient 
	try{ /*register client*/
		savedClient = await client.save()
	}
	catch{
		return response.status(401).json({ error:'user exists' })
	}
/*append client ID to trainer*/
	const trainer = await User.findById(decodedToken.id)
	try{ 
		trainer.clients=trainer.clients.concat(savedClient._id)
	}
	catch{ 
			return response.status(500).json({ error:'Something went wrong :(' })
	} 
	try{  //! should only happen on first client of account - user declares he is a trainer and not an athlete
		//TODO if (clients.length==0)
		trainer.isTrainer=true
		trainer.regIsSet=undefined
		trainer.days=undefined
		trainer.currentRegiment=undefined
	}
	catch{
		console.log("Some error when formatting trainer fields - should be fine") 
	} 
		const updatedTrainer=await trainer.save()
		await updatedTrainer.populate("clients").execPopulate();
	  response.status(200).send(updatedTrainer)
})

clientRouter.patch('/', async(request, response) => { //set/update target regiment
  const body = request.body 
	const token = getTokenFrom(request) 
	const [succeeded, decodedToken]=verifyToken(token)
	if(!succeeded){ // Verification failure
		return response.status(401).json({error:"token missing or invalid"})
	}
	let client=await User.findById(body._id)
	client.currentRegiment=body.currentRegiment
	client.regIsSet=true
	const updatedClient=await client.save()
	console.log(updatedClient)
	response.status(200).send(updatedClient)
})

clientRouter.patch('/removeClient', async(request, response) => { //remove client from trainer
	const clientId = request.body.id 
	console.log("clientId",clientId)

	const token = getTokenFrom(request) 
	const [succeeded, decodedToken]=verifyToken(token)

	if(!succeeded){ // Verification failure
		return response.status(401).json({error:"token missing or invalid"})
	}

	const trainer=await User.findById(decodedToken.id) 
	trainer.clients=trainer.clients.filter((client)=>client._id!=clientId) 

	const updatedTrainer=await trainer.save()
	response.status(200).send(updatedTrainer) //?not using returned item at all on client-side
})

module.exports = clientRouter