import React,{useState} from "react"

const ExerciseCounter=({newWorkout, setNewWorkout,exerciseName})=>{ 
	const [exercise,setExercise] = useState({reps:1, sets:1}) // dummy to hold values
	const [activated,setActivated] = useState(false) // dummy to hold values

	const decrement=(number)=>( //1 set of 1 reps is minimum submittable 
		number-1 || 1
	)

	//TODO useEffect to set newWorkout automatically ( and just change exercise ? )

	return(
		<div> 
			{exerciseName}
			<div>
				<button onClick={()=>{
					activated 
						? setNewWorkout({...newWorkout,[exerciseName]:undefined})
						: setNewWorkout({...newWorkout, [exerciseName]:{...exercise,}})
					setActivated(!activated)
				}}> {/*toggle switch for exercise*/}
					{/*TODO filter on untoggle*/}
					{(activated) && <> added </> || <> add exercise </>}
				</button> 
				<h3>{exercise.reps} reps</h3>

				<button onClick={()=>{ //set e.g. newWorkout[pullups] equal to exercise dummy variable reps and or sets
					if(activated){
						setNewWorkout({...newWorkout,[exerciseName]:{...exercise, reps:decrement(exercise.reps)}}) 
						setExercise({...exercise, reps:decrement(exercise.reps)})
					}}}>-</button>

				<button onClick={()=>{
					if(activated){
						setNewWorkout({...newWorkout,[exerciseName]:{...exercise,  reps:exercise.reps+1}})
						setExercise({...exercise, reps:exercise.reps+1})
					}}}>+</button>

			</div>

			<div>
				<h3>{exercise.sets} sets</h3>
				<button onClick={()=>{ 
					if(activated){
						setNewWorkout({...newWorkout,[exerciseName]:{...exercise,  sets:decrement(exercise.sets)}})
						setExercise({...exercise, sets:decrement(exercise.sets)}) 
					}}}>-</button>

				<button onClick={()=>{ 
					if(activated){
						setNewWorkout({...newWorkout,[exerciseName]:{...exercise,  sets:exercise.sets+1}})
						setExercise({...exercise, sets:exercise.sets+1}) 
					}}}>+</button>

			</div> 
		</div>
	)

}
export default ExerciseCounter
