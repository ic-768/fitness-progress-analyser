export const exercisesFromWorkouts=(workouts)=>{ //exercise data is nested a bit deep
	const exerciseArray = [] 
	workouts.map((dayObject)=>(dayObject.exercises))
		.map((workout)=>{ 
			exerciseArray.push(...workout)
		})
	return exerciseArray 
}

export const getDaysWorkout = (days) => { //returns array of isolated exercise objects 
	const today=new Date().toDateString() 
	const objectArray=days.filter((day)=>( //only keep workouts that happened today
		today==new Date(day.date).toDateString()
	))

	const exerciseArray=exercisesFromWorkouts(objectArray) 
	return exerciseArray
}

export const getWeeksWorkout = (days)=>{
	console.log("TODO")
	return days
}

export const getMonthsWorkout = (days)=>{
	console.log("TODO")
	return days
}
