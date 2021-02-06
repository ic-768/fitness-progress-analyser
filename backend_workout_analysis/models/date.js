const mongoose=require('mongoose')

const dateSchema = new mongoose.Schema({
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"User"
		},
  date: Date,
	exercises:[
		{
			name: String,
			reps: Number,
			sets: Number,
			ref:'Date'
			} 
		]
})

dateSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.__v
		delete returnedObject.passwordHash
  }
})

module.exports=mongoose.model("Date", dateSchema)
