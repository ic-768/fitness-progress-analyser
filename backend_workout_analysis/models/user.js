const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    unique: true
  },
  name: String,
	passwordHash: String,
	isTrainer:Boolean,
	/* if athlete */
  days : [
    {
			date: Date, //each day will have a date and a list of exercises
			exercises: [  
				{
				name: String,
				reps: Number,
				sets: Number,
				weight: Number
				}
			]
    }
	],
		currentRegiment:{}, // exercise regiment for user to focus on. Will contain keys of days, and array values with names of exercises. E.g.Mon: ["situps","pushups", etc.]
		regIsSet:Boolean,
		/*if trainer */
			clients: [] ,
},{strict:false}) 

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
}) 

const User = mongoose.model('User', userSchema)

module.exports = User
