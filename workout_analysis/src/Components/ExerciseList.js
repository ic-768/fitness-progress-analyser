import React from "react"

const ExerciseList=({appendedExercises,setAppendedExercises})=>{ 

	const removeExercise=(id)=>{ //filter exercises based on id
		setAppendedExercises(appendedExercises.filter((exercise)=>exercise.id!==id))
	}

	const exercises = appendedExercises.map((exercise,index)=>{
		{exercise.id = index+1}
		return(
			<li key={index}> 
				<div>{exercise.id}</div>
				<div>{exercise.name}</div> 
				<div>{exercise.reps} reps</div> 
				<div>{exercise.sets} sets</div> 
				<div>{exercise.weight} weight</div> 
				<button onClick={()=>removeExercise(exercise.id)}>
		remove
				</button>
				{ console.log(exercise) }
			</li> 
		)})

	return exercises

}
export default ExerciseList
