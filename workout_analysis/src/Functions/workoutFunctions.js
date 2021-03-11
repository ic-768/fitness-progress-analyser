export const setTodaysExercises = (currentRegiment, setDaysExercises) => { 
	/*Choose todays exercises out of weekly regiment*/
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
	//TODO clean up code
	const exerciseArray = [] 
	workouts.map((dayObject)=>(dayObject.exercises))
		.forEach((workout)=>{ 
			exerciseArray.push(...workout)
		})
	return exerciseArray 
}

//same as above, but one step further
export const exerciseNamesFromWorkouts=(workouts)=>{
	//TODO clean up code
	return exercisesFromWorkouts(workouts).map((exercise)=>exercise.name) 
}

export const filterExercisesByName = (exercises, name) => ( 
	//Filter exercise array of a workout object
	exercises.filter((exercise) => (
		exercise.name.toLowerCase().includes(name.toLowerCase())
	))
) 
export const filterWorkoutsByDate = (workouts, date) => {  
	//Date property is in workout object, not in individual exercises
	const resultArray=[]
	workouts.forEach((workout)=>{
		if (new Date(workout.date).toDateString() === date.toDateString() ){
			resultArray.push(workout) 
		}})
	return resultArray
}

export const getTotalReps = (exercises, name) => { 
	try{
		const filteredWorkouts = filterExercisesByName(exercises, name) //filter exercises by name 
		const repsArray = filteredWorkouts.map((exercise) =>  //total reps on each exercise
			(exercise.reps*exercise.sets)
		) 
		//sum all reps in array
		return repsArray.reduce((sum,currentValue)=>(sum+currentValue))
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

export const datedAnalysis=(workouts,exerciseName,interval,parameter)=>{
	/* Get array of daily or monthly total reps or total weight lifted.
	interval = "daily" / "monthly" 
	* parameter="reps"/weight"*/

	if(interval!=="daily" && interval !== "monthly"){
		console.log("Interval is invalid")
		return }

	const getTime = interval === "daily" //To compare time of workouts
		? (exercise) => (new Date (exercise.date).toDateString()) // Full date
		: (exercise) => (new Date (exercise.date).toLocaleDateString("default",{month:"long"}))  // Just month

	const accumulate = parameter === "reps" // will either be "reps" or "weight"
		? (workoutObject)=>(workoutObject.exercise.sets*workoutObject.exercise.reps) // accumulate reps
		: (workoutObject)=>(workoutObject.exercise.weight*workoutObject.exercise.sets*workoutObject.exercise.reps)  //accumulate total weight lifted

	const filteredWorkouts=[] //Array of workouts containing date and analysed exercise

	if(parameter==="reps"){
		workouts.filter((workout)=>{ 
			const	results=workout.exercises.filter((exercise)=>exercise.name==exerciseName)  // get requested exercise by name
			results.forEach((item)=>{filteredWorkouts.push({date:workout.date,exercise:item})})
		})}

	else {
		workouts.filter((workout)=>{ 
			const	results=workout.exercises.filter((exercise)=>exercise.weight && exercise.name==exerciseName) // must also contain weight field
			results.forEach((item)=>{filteredWorkouts.push({date:workout.date,exercise:item})})
		})}

	if(filteredWorkouts.length==0){return null} //if no suitable exercise found, abort

	let timeProperty // for storing formatted dates
	let total // accumulator for reps or weight
	const uniqueTimes=[] //array of unique dates or months

	if (filteredWorkouts.length==1){ // If only one workout, return reps*sets(*weight) and date
		total=accumulate(filteredWorkouts[0])
		timeProperty = getTime(filteredWorkouts[0]) 
		return [{timeProperty, total}]
	}

	filteredWorkouts.forEach((workout,i)=>{
		if(i===0){ // if first repetition
			timeProperty = getTime(workout)  //initialise data
			total=accumulate(workout)
		} 
		else{
			if (timeProperty === getTime(workout)){ // Same date 
				if (i!==filteredWorkouts.length-1){ // Not end of array, aggregate reps
					total+=accumulate(workout)
				}
				else{ // End of array, push final entry
					total+=accumulate(workout)
					uniqueTimes.push({timeProperty,total}) }  
			}

			else{ // different date
				uniqueTimes.push({timeProperty, total}) //push accumulation so far
				timeProperty=getTime(workout) //set time and accumulator equal to current workout
				total=accumulate(workout) }
		} 
	})
	return uniqueTimes 
} 

export const allTimeAnalysis=(workouts,exerciseName,parameter)=>{ 
	const filteredWorkouts=[]	
	let total=0

	if(parameter==="reps") { //total reps
		workouts.map((workout)=>{   
			const	results=workout.exercises.filter((exercise)=>exercise.name==exerciseName)   // filter exercises
			results.forEach((exercise)=>{filteredWorkouts.push({date:workout.date,exercise}) // push data
			}) 
		}) 
		filteredWorkouts.forEach((workout)=>{  
			total+=workout.exercise.reps*workout.exercise.sets 
		})
	}
	else {
		workouts.map((workout)=>{
			const	results=workout.exercises.filter((exercise)=>(exercise.weight && exercise.name==exerciseName))
			results.forEach((exercise)=>{filteredWorkouts.push({date:workout.date,exercise})
			}) 
		})
		filteredWorkouts.forEach((workout)=>{
			total+=workout.exercise.weight*workout.exercise.reps*workout.exercise.sets 
		})
	} 
	if (total===0) return null
	return [{timeProperty:"total", total:total||null}]
} 
