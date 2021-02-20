import React,{useEffect,useState} from "react"

const ExerciseCounter=({newWorkout, setNewWorkout,exerciseName})=>{ 
	const [exercise,setExercise] = useState(null) // dummy to hold values
	const [finished,setFinished] = useState(false) // finished workout (or skipped)

	const decrement=(number)=>( //1 set of 1 reps is minimum submittable 
		number-1 || 1
	)

	useEffect(()=>{ //Every time a change happens to exercise, update newWorkout
		setNewWorkout({...newWorkout,[exerciseName]:exercise}) 
	},[exercise])

	useEffect(()=>{ // Same for finished
		finished 
			? setExercise({reps:1,sets:1})
			: setExercise(undefined)
		setNewWorkout({...newWorkout,[exerciseName]:exercise}) 
	},[finished])

	return(
		<div> 
			{exerciseName}
			<button onClick={()=>{
				setFinished(!finished)
			}}> {/*toggle switch for exercise*/}
				{(finished) && <>skipped it?</> || <>finished it?</>}
			</button> 
			{exercise &&
				<>
					<div>
						<h3>{exercise.reps} reps</h3>

						<button onClick={()=>{ //set e.g. newWorkout[pullups] equal to exercise dummy variable reps and or sets
							if(finished){
								setExercise({...exercise, reps:decrement(exercise.reps)})
							}}}>-</button>

						<button onClick={()=>{
							if(finished){
								setExercise({...exercise, reps:exercise.reps+1})
							}}}>+</button>

					</div>

					<div>
						<h3>{exercise.sets} sets</h3>
						<button onClick={()=>{ 
							if(finished){
								setExercise({...exercise, sets:decrement(exercise.sets)}) 
							}}}>-</button>

						<button onClick={()=>{ 
							if(finished){
								setExercise({...exercise, sets:exercise.sets+1}) 
							}}}>+</button>

					</div> 
				</>}
		</div>
	) 
}
export default ExerciseCounter
