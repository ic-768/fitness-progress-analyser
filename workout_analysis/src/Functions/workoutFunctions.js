export const exercisesFromWorkouts=(workouts)=>{ //exercise data is nested a bit deep
	const exerciseArray = [] 
	workouts.map((dayObject)=>(dayObject.exercises))
		.map((workout)=>{ 
			exerciseArray.push(...workout)
		})
	return exerciseArray 
}

//same as above, but one step further
export const exerciseNamesFromWorkouts=(workouts)=>
	exercisesFromWorkouts(workouts).map((exercise)=>exercise.name)

export const filterExercises = (exercises, name) => ( 
	//Filter exercise array of a workout object
	exercises.filter((exercise) => (
		//exercise.name === name
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
		const filteredExercises = filterExercises(exercises, name) //filter exercises by name 
		const repsArray = filteredExercises.map((exercise) => { //total reps on each exercise
			return (exercise.reps*exercise.sets)
		}) 
		//sum all reps in array
		return( repsArray.reduce((sum,currentValue)=>(sum+currentValue)))
	}
	catch{
		console.log("Provided exercise does not seem to be in the array")

	}
}

export const getDaysWorkout = (days) => { //returns array of isolated exercise objects 
	const today = new Date().toDateString()
	const objectArray = days.filter((day) => ( //only keep workouts that happened today
		today == new Date(day.date).toDateString()
	))
	const exerciseArray = exercisesFromWorkouts(objectArray) 

	return exerciseArray
}

export const getWeeksWorkouts = (days)=>{ //?Could just split right after DD/MM/YYYY 
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

export const dailyAnalysis=(workouts,exerciseName)=>{ 
	const results=[] //Array of objects containing date and exercise
	workouts.filter((workout)=>{ 
		const	result=workout.exercises.filter((exercise)=>exercise.name==exerciseName) 
		result.length>0 && results.push({date:workout.date, exercise:result[0]}) 
		/*In one sitting, user can only submit one exercise of a particular name
					therefore, it will either be empty, or hold 1 item (hence, [0] is fine)*/ 
	}) 
	let dateOfExercise /*temporary containers for reduce function*/
	let reps
	let sets
	let totalReps
	let uniqueArray=[] //to store unique dates of a specific exercise

	try{
		results.reduce((currentItem,nextItem,index,array)=>{
			reps=currentItem.exercise.reps
			sets=currentItem.exercise.sets
			totalReps=reps*sets

			const newReps=nextItem.exercise.reps
			const newSets=nextItem.exercise.sets
			const newRepsTimesSets=newReps*newSets

			dateOfExercise=new Date(currentItem.date).toDateString()
			let newDateOfExercise=new Date(nextItem.date).toDateString() 
			/*if workout happened on a different day, or reached the end of the array,
					push the results so far, and return nextItem to reiterate the procedure ( if more workouts) */
			if (newDateOfExercise!=dateOfExercise || index==array.length-1){
				uniqueArray.push({...currentItem, exercise:{name:exerciseName, totalReps:
							newRepsTimesSets+currentItem.exercise.totalReps }})
				return(nextItem) 
			}

			if(newDateOfExercise==dateOfExercise){ // if same date, update totalReps, and set nextItem for processing
				return {...currentItem, exercise:{...nextItem.exercise,totalReps:totalReps+=newRepsTimesSets}}
			}
		})
		return(uniqueArray)
	}
	catch{
		console.log("something went wrong")
	}
}
