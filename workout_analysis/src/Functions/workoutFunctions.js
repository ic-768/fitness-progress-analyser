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

export const datedAnalysis=(workouts,exerciseName,interval)=>{ //interval=daily -> examine each day, inverval=monthly -> examine month
	/*Function to retrieve array of aggregate data for a specific exercise, per given time period.
	End result will be an array of uniquely-dated objects, with a totalReps field,
	and a formatted date for use in the chart.
	*/
	const results=[] //Array of objects containing date and exercise
	workouts.filter((workout)=>{ 
		const	result=workout.exercises.filter((exercise)=>exercise.name==exerciseName) 
		result.length>0 && results.push({date:workout.date, exercise:result[0]}) 
		/*User can only submit one exercise of a particular name at a time.
					Therefore, result will at most hold 1 item (hence, [0] works fine)*/ 
	}) 
	if(results.length==0){return(null)} //if empty, abort

	let timeProperty // will be using this for getting formatted dates
	let newTimeProperty // same as above, but used in reduce function for nextItem

	if (results.length==1){ // If only one workout, return object+reps*sets, and a formatted date
		if(interval=="daily"){
			timeProperty=new Date(results[0].date).toDateString()
		}
		else if (interval =="monthly"){
			timeProperty = new Date(results[0].date).toLocaleString("default", { month: "long" }) 
		}
		return([{formattedDate:timeProperty,
			totalReps:results[0].exercise.sets*results[0].exercise.reps}])}

	/*temporary containers for reduce function*/
	let reps
	let sets
	let totalReps
	let uniqueArray=[] //to store unique dates/months of a specific exercise

	try{ 
		results.reduce((currentItem,nextItem,index,array)=>{
			/*on each iteration, we will examine if currentItem and nextItem share the same date/month.
			 If they do, sum their total reps, and store it as a running tally in currentItem.exercise.totalReps. 
			 If they don't, we will push the currentItem, and continue the procedure with nextItem
			.*/

			reps=currentItem.exercise.reps
			sets=currentItem.exercise.sets
			totalReps=reps*sets 

			const newReps=nextItem.exercise.reps
			const newSets=nextItem.exercise.sets
			const newTotalReps=newReps*newSets


			if (interval==="daily"){
				timeProperty=new Date(currentItem.date).toDateString() //time property refers to day of year
				newTimeProperty=new Date(nextItem.date).toDateString() 
			}
			else if (interval==="monthly"){ 
				timeProperty = new Date(currentItem.date).toLocaleString("default", { month: "long" }) //time property refers to month
				newTimeProperty = new Date(nextItem.date).toLocaleString("default", { month: "long" }) 
			}
			else{console.log("interval not set or invalid")}

			/*Case at final comparison*/
			if ( index==array.length-1){ 
				if(newTimeProperty!=timeProperty){ //if different date, push individually ( and clean up unneeded fields)
					uniqueArray.push({formattedDate:timeProperty, totalReps:currentItem.totalReps||totalReps})
					uniqueArray.push({formattedDate:newTimeProperty, totalReps:newTotalReps})
					return(uniqueArray)
				} 
				else{
					//otherwise, aggregate reps
					uniqueArray.push({formattedDate:timeProperty,
						totalReps:currentItem.totalReps+newTotalReps ||
					totalReps+newTotalReps
					}) 
				}
				return(uniqueArray) 
			} 
			/*For all other cases*/

			else if (newTimeProperty!=timeProperty){
			/*workouts happened on different dates, store currentItem, and return nextItem 
			to reiterate */ 
				uniqueArray.push({formattedDate:timeProperty,totalReps:
							currentItem.exercise.totalReps || totalReps 
				})
				/*If first comparison, there will be no currentItem.exercise.totalReps*/
				return(nextItem) 
			}

			else{ // if same date, update totalReps, and set nextItem for processing
				return {...currentItem,totalReps:totalReps+=newTotalReps, formattedDate:timeProperty,exercise:{...nextItem.exercise,}}
			}
		}
		)

		return(uniqueArray)
	}
	
	catch{
		console.log("something went wrong")
	}
}

export const allTimeAnalysis=(workouts,exerciseName)=>{ 
	/*A simplified version of datedAnalysis*/
	const results=[] 
	workouts.filter((workout)=>{ 
		const	result=workout.exercises.filter((exercise)=>exercise.name==exerciseName) 
		result.length>0 && results.push({date:workout.date, exercise:result[0]}) 
	}) 
	if(results.length==0){return(null)}

	let reps
	let sets
	let totalReps
	let result

	try{
		if (results.length==1){ // 
			return([{totalReps:results[0].exercise.sets*results[0].exercise.reps}])}

		results.reduce((currentItem,nextItem,index,array)=>{
			reps=currentItem.exercise.reps
			sets=currentItem.exercise.sets
			totalReps=reps*sets 

			const newReps=nextItem.exercise.reps
			const newSets=nextItem.exercise.sets
			const newTotalReps=newReps*newSets

			/*Case at final comparison*/
			if ( index==array.length-1){ 
				//otherwise, aggregate reps
				result=({formattedDate:"All time",
					totalReps:currentItem.totalReps+newTotalReps ||
					totalReps+newTotalReps
				}) 
				return result
			} 
			return {...currentItem,totalReps:totalReps+=newTotalReps, exercise:{...nextItem.exercise}}
		})
		return([result])}
	
	catch{
		console.log("something went wrong")
	}
}

