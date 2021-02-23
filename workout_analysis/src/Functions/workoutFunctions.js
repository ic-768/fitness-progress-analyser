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
	if(results.length==0){return(null)}

	/*temporary containers for reduce function*/
	let reps
	let sets
	let totalReps
	let uniqueArray=[] //to store unique dates of a specific exercise

	try{
		if (results.length==1){ // If only one workout
			return([{...results[0],exercise:{...results[0].exercise, //return sets*reps
				totalReps:results[0].exercise.sets*results[0].exercise.reps}}])}

		results.reduce((currentItem,nextItem,index,array)=>{
			/*on each iteration, we will examine if currentItem and nextItem share the same date
			or not. If they do, we will sum their total reps of the day, and store it as 
			currentItem.exercise.totalReps as a running tally. 
			
			If they don't, we will push the currentItem, and continue the procedure with nextItem
			.*/

			reps=currentItem.exercise.reps
			sets=currentItem.exercise.sets
			totalReps=reps*sets 

			const newReps=nextItem.exercise.reps
			const newSets=nextItem.exercise.sets
			const newTotalReps=newReps*newSets

			let dateOfExercise=new Date(currentItem.date).toDateString()
			let newDateOfExercise=new Date(nextItem.date).toDateString() 

			/*Case at final comparison*/
			if ( index==array.length-1){ 
				if(newDateOfExercise!=dateOfExercise){ //if different date, push individually
					uniqueArray.push({...currentItem, exercise:{...currentItem.exercise,totalReps:currentItem.totalReps||totalReps}})
					uniqueArray.push({...nextItem, exercise:{...nextItem.exercise,totalReps:newTotalReps}})
					return(uniqueArray)
				} 
				//otherwise, aggregate reps
				uniqueArray.push({...currentItem,exercise:{...currentItem.exercise,
					totalReps:currentItem.exercise.totalReps+newTotalReps ||
					totalReps+newTotalReps
				}}) 
				return(uniqueArray) 
			} 
			/*For all other cases*/

			else if (newDateOfExercise!=dateOfExercise){
			/*workouts happened on different days, store currentItem, and return nextItem 
			to reiterate */ 
				uniqueArray.push({...currentItem, exercise:{name:exerciseName, totalReps:
							currentItem.exercise.totalReps || totalReps }})
				/*If first comparison, there will be no currentItem.exercise.totalReps*/
				return(nextItem) 
			}

			else{ // if same date, update totalReps, and set nextItem for processing
				return {...currentItem, exercise:{...nextItem.exercise,totalReps:totalReps+=newTotalReps}}
			}
		})
		return(uniqueArray)
	}
	catch{
		console.log("something went wrong")
	}
}
export const monthlyAnalysis=(workouts,exerciseName)=>{ 
	const results=[] 
	workouts.filter((workout)=>{ 
		const	result=workout.exercises.filter((exercise)=>exercise.name==exerciseName) 
		result.length>0 && results.push({date:workout.date, exercise:result[0]}) 
	}) 
	if(results.length==0){return(null)}

	let reps
	let sets
	let totalReps
	let uniqueArray=[] 

	try{
		if (results.length==1){ // 
			return([{...results[0],exercise:{...results[0].exercise, 
				totalReps:results[0].exercise.sets*results[0].exercise.reps}}])}

		results.reduce((currentItem,nextItem,index,array)=>{
			reps=currentItem.exercise.reps
			sets=currentItem.exercise.sets
			totalReps=reps*sets 

			const newReps=nextItem.exercise.reps
			const newSets=nextItem.exercise.sets
			const newTotalReps=newReps*newSets

			let monthOfExercise = new Date(currentItem.date).toLocaleString("default", { month: "long" })
			let newMonthOfExercise = new Date(nextItem.date).toLocaleString("default", { month: "long" })

			/*Case at final comparison*/
			if ( index==array.length-1){ 
				if(newMonthOfExercise!=monthOfExercise){ //if different month, push individually
					uniqueArray.push({...currentItem, exercise:{...currentItem.exercise,totalReps:currentItem.totalReps||totalReps}})
					uniqueArray.push({...nextItem, exercise:{...nextItem.exercise,totalReps:newTotalReps}})
					return(uniqueArray)
				} 
				//otherwise, aggregate reps
				uniqueArray.push({...currentItem,exercise:{...currentItem.exercise,
					totalReps:currentItem.exercise.totalReps+newTotalReps ||
					totalReps+newTotalReps
				}}) 
				return(uniqueArray) 
			} 

			/*For all other cases*/

			else if (newMonthOfExercise!=monthOfExercise){
			/*workouts happened in different months, store currentItem, and return nextItem 
			to reiterate */ 
				uniqueArray.push({...currentItem, exercise:{name:exerciseName, totalReps:
							currentItem.exercise.totalReps || totalReps }})
				/*If first comparison, there will be no currentItem.exercise.totalReps*/
				return(nextItem) 
			}

			else{ // if same date, update totalReps, and set nextItem for processing
				return {...currentItem, exercise:{...nextItem.exercise,totalReps:totalReps+=newTotalReps}}
			}
		})
		return(uniqueArray)
	}
	catch{
		console.log("something went wrong")
	}
}

