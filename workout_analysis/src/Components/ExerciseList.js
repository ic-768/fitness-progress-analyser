import React from "react"

const ExerciseList=({totalExercises,setTotalExercises})=>{ 
	console.log(totalExercises)

	const removeExercise=(id)=>{ //filter exercises based on id
		setTotalExercises(totalExercises.filter((exercise)=>exercise.id!==id))
	}

	const exercises = totalExercises.map((exercise,index)=>( 		
		<li key={index}> 
			{exercise.id = index}
			<div>{exercise.name}</div> 
			<div>{exercise.reps} reps</div> 
			<div>{exercise.sets} sets</div> 
			<div>{exercise.weight} weight</div> 
			<div> {exercise.id} id</div> 
			<button onClick={()=>removeExercise(exercise.id)}>
		remove
			</button>
			<h1>test</h1>
			{ console.log(exercise) }
		</li> 
	))

	return exercises

}
export default ExerciseList
