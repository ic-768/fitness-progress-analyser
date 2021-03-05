export const setTodaysExercises = (currentRegiment, setDaysExercises) => { 
	const day=(new Date()).getDay() //Sunday starts at 0 with Date method - with currentRegiment array at 6.
	if (day===0){ //Case when Sunday
		const exercisesForToday=(Object.values(currentRegiment)[6]) 
		setDaysExercises(exercisesForToday)
	}
	else{ //For all other days we can just -1.
		const exercisesForToday=(Object.values(currentRegiment)[day-1]) 
		setDaysExercises(exercisesForToday) 
	} 
}

export const exercisesFromWorkouts=(workouts)=>{ //exercise data is nested a bit deep
	const exerciseArray = [] 
	workouts.map((dayObject)=>(dayObject.exercises))
		.map((workout)=>{ 
			exerciseArray.push(...workout)
		})
	return exerciseArray 
}

//same as above, but one step further
export const exerciseNamesFromWorkouts=(workouts)=>{
	return(
		exercisesFromWorkouts(workouts).map((exercise)=>exercise.name)
	)

}
export const filterExercises = (exercises, name) => ( 
	//Filter exercise array of a workout object
	exercises.filter((exercise) => (
		exercise.name.toLowerCase().includes(name.toLowerCase())
	))
)

export const getTotalReps = (exercises, name) => { 
	{ /**
		* ! Because of filterExercises(), if searching for totalReps of "abs", 
			abs curls and abs crunches will be mixed together.
		**/
	}
	/*e.g. if user did 3 sets of 8, and then 2 sets of 2 => return 8*3+1*2*/
	try{
		const filteredWorkouts = filterExercises(exercises, name) //filter exercises by name 
		const repsArray = filteredWorkouts.map((exercise) => { //total reps on each exercise
			return (exercise.reps*exercise.sets)
		}) 
		//sum all reps in array
		return( repsArray.reduce((sum,currentValue)=>(sum+currentValue)))
	}
	catch{
		console.log("Provided exercise does not seem to be in the array") } 
}

export const getDaysWorkout = (days) => { //returns array of isolated exercise objects 
	const today = new Date().toDateString()
	const objectArray = days.filter((day) => ( //only keep workouts that happened today
		today == new Date(day.date).toDateString()
	))
	const exerciseArray = exercisesFromWorkouts(objectArray) 

	return exerciseArray
}

//! Not used, keeping just in case
export const getWeeksWorkouts = (days)=>{ 
	const weekMillis = 604800000 //milliseconds in a week
	const today=new Date().getTime()

	const result=exercisesFromWorkouts(days.filter((day)=>{
		const date=new Date(day.date).getTime()
		return( //if less than a week's worth of milliseconds
			today-date<=weekMillis
		)
	}))
	return result
}

export const getMonthsWorkouts = (days)=>{
	const monthMillis = 2678400000 //TODO not 100% sure on this => 31*24*60*60*1000
	const today=new Date().getTime()

	const result=exercisesFromWorkouts(days.filter((day)=>{
		const date=new Date(day.date).getTime()
		return( //if less than a week's worth of milliseconds
			today-date<=monthMillis
		)
	}))
	return result
}

export const getAllWorkouts=(days)=>{
	return exercisesFromWorkouts(days)
}

export const datedAnalysis=(workouts,exerciseName,interval)=>{ //interval = daily / monthly
	/*Aggregate data for a specific exercise over a time period.
	Returns array of objects with unique "timeProperty" and "totalReps" fields*/

	if(interval!=="daily" && interval !== "monthly"){
		console.log("Interval is invalid")
		return }

	const getTime = interval === "daily" //To compare time of workouts
		? (exercise) => (new Date (exercise.date).toDateString())
		: (exercise) => (new Date (exercise.date).toLocaleDateString("default",{month:"long"})) 

	const filteredWorkouts=[] //Array of objects containing date and exercise
	workouts.filter((workout)=>{ 
		const	results=workout.exercises.filter((exercise)=>exercise.name==exerciseName) 
		results.forEach((item)=>{filteredWorkouts.push({date:workout.date,exercise:item})
		}) 
	}) 

	if(filteredWorkouts.length==0){return(null)} //if empty, abort

	let timeProperty // for getting formatted dates with getTime()
	let totalReps // reps accumulator
	const uniqueTimes=[] //array of unique dates / months

	if (filteredWorkouts.length==1){ // If only one workout, return reps*sets and date
		totalReps=filteredWorkouts[0].sets*filteredWorkouts[0].reps
		timeProperty = getTime(filteredWorkouts[0]) 
		return({timeProperty, totalReps})}

	filteredWorkouts.forEach((workout,i)=>{
		if(i===0){ // if first repetition
			timeProperty = getTime(workout)  //initialise time and reps
			totalReps=workout.exercise.reps*workout.exercise.sets
		} 
		else{
			if (timeProperty === getTime(workout)){ // Same date 
				if (i!==filteredWorkouts.length-1){ // Not end of array, aggregate reps
					totalReps+=workout.exercise.reps*workout.exercise.sets
				}
				else{ // End of array, push final entry
					totalReps+=workout.exercise.reps*workout.exercise.sets
					uniqueTimes.push({timeProperty,totalReps}) }  
			}

			else{ // different date
				uniqueTimes.push({timeProperty, totalReps}) //push reps so far
				timeProperty=getTime(workout) //set time and reps equal to current workout
				totalReps=workout.exercise.reps*workout.exercise.sets
			}
		}

	} )
	console.log(uniqueTimes)
	return(uniqueTimes)
}

export const allTimeAnalysis=(workouts,exerciseName)=>{ 
	const filteredWorkouts=[]	
	let totalReps=0

	workouts.map((workout)=>{   //For every workout
		const	results=workout.exercises.filter((exercise)=>exercise.name==exerciseName)   // filter exercises
		results.forEach((exercise)=>{filteredWorkouts.push({date:workout.date,exercise}) // and push data
		}) 
	}) 

	filteredWorkouts.forEach((workout)=>{  // Accumulate reps
		totalReps+=workout.exercise.reps*workout.exercise.sets 
	})

	return [{timeProperty:"All-Time", totalReps}]
}

