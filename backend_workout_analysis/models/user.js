const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    unique: true
  },
  name: String,
  passwordHash: String,
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
	regIsSet:Boolean
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
}) 

const User = mongoose.model('User', userSchema)

module.exports = User
