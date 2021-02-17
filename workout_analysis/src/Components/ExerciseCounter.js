import React,{useState,useEffect} from "react"

const ExerciseCounter=({newWorkout, setNewWorkout,exerciseName})=>{

	useEffect(()=>{ //provide exercise names on page load
		setNewWorkout({...newWorkout, [exerciseName]:{...[exerciseName],name:exerciseName}})
	},[])

	const [exercise,setExercise] = useState({reps:0, sets:0}) // dummy to hold values, makes life a bit easier

	const decrement=(number)=>( //to ensure no negative numbers 
		number && number-1 || 0
	)

	return(
		<div> 
			{exerciseName}
			<div>
				<h3>{exercise.reps} reps</h3>

				<button onClick={()=>{ //set e.g. newWorkout[pullups] equal to exercise dummy variable reps and or sets
					setNewWorkout({...newWorkout,[exerciseName]:{...exercise, reps:decrement(exercise.reps)}}) 
					setExercise({...exercise, reps:decrement(exercise.reps)})
				}}>-</button>

				<button onClick={()=>{
					setNewWorkout({...newWorkout,[exerciseName]:{...exercise,  reps:exercise.reps+1}})
					setExercise({...exercise, reps:exercise.reps+1})
				}}>+</button>

			</div>

			<div>
				<h3>{exercise.sets} sets</h3>
				<button onClick={()=>{ 
					setNewWorkout({...newWorkout,[exerciseName]:{...exercise,  sets:decrement(exercise.sets)}})
					setExercise({...exercise, sets:decrement(exercise.sets)}) 
				}}>-</button>

				<button onClick={()=>{ 
					setNewWorkout({...newWorkout,[exerciseName]:{...exercise,  sets:exercise.sets+1}})
					setExercise({...exercise, sets:exercise.sets+1}) 
				}}>+</button>

			</div> 
		</div>
	)

}
export default ExerciseCounter
