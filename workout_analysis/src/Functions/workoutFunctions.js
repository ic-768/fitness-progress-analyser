export const getTodaysExercises = (currentRegiment) => { 
	/*Choose todays exercises out of weekly regiment*/ //TODO simplify
	const day=(new Date()).getDay() //Sunday starts at 0 with Date() - with currentRegiment at 6.
	const exercisesForToday = day===0
		? Object.values(currentRegiment)[6] //Sunday
		: Object.values(currentRegiment)[day-1] //All other days 
	return exercisesForToday
}

export const exercisesFromWorkouts=(workouts)=>{
	const exerciseArray = [] 
	workouts.map((dayObject)=>(dayObject.exercises))
		.forEach((workout)=>{ 
			exerciseArray.push(...workout)
		})
	return exerciseArray 
}

//same as above, but one step further
export const exerciseNamesFromWorkouts=(workouts)=>{
	return exercisesFromWorkouts(workouts).map((exercise)=>exercise.name) 
}

export const filterExercisesByName = (exercises, name) => ( 
	//Filter exercise array of a workout object
	exercises.filter((exercise) => (
		exercise.name.toLowerCase().includes(name.toLowerCase())
	))
) 
export const filterWorkoutsByDate = (workouts, dates) => {  
	//Date property is in workout object, not in every individual exercises
	return workouts.filter((workout)=>(new Date(workout.date)>= dates[0] && new Date(workout.date)<=dates[1])) 
}

export const getTotalReps = (exercises, name) => { 
	try{
		return filterExercisesByName(exercises, name) //filter exercises by name 
			.map((exercise) => (exercise.reps*exercise.sets) //total reps on exercise
				.reduce((sum,currentValue)=>(sum+currentValue)) //sum all
			) }
	catch{
		console.log("Provided exercise does not seem to be in the array") } 
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
		: (exercise) => (new Date (exercise.date).toLocaleDateString("default",{month:"long",year:"numeric"}))  // Month and year

	const accumulate = parameter === "reps" // will either be "reps" or "weight"
		? (workoutObject)=>(workoutObject.exercise.sets*workoutObject.exercise.reps) // accumulate reps
		: (workoutObject)=>(workoutObject.exercise.weight*workoutObject.exercise.sets*workoutObject.exercise.reps)  //accumulate total weight lifted

	const filteredWorkouts=[] //Array of workouts containing date and analysed exercise

	if(parameter==="reps"){
		workouts.forEach((workout)=>{ 
			const	results=workout.exercises.filter((exercise)=>exercise.name==exerciseName)  // get requested exercise by name
			results.forEach((item)=>{filteredWorkouts.push({date:workout.date,exercise:item})})
		})}

	else {
		workouts.forEach((workout)=>{ 
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
		workouts.forEach((workout)=>{   
			const	results=workout.exercises.filter((exercise)=>exercise.name==exerciseName)   // filter exercises
			results.forEach((exercise)=>{filteredWorkouts.push({date:workout.date,exercise}) // push data
			}) 
		}) 
		filteredWorkouts.forEach((workout)=>{  
			total+=workout.exercise.reps*workout.exercise.sets 
		})
	}
	else {
		workouts.forEach((workout)=>{
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
