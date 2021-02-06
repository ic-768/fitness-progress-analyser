import React from "react"

const ExerciseList=({totalExercises,setTotalExercises})=>{ 

	const removeExercise=(id)=>{ //filter exercises based on id
		setTotalExercises(totalExercises.filter((exercise)=>exercise.id!==id))
	}

	return( 
		<>
			<h2>Total exercises </h2>
			{totalExercises.map((exercise)=><li key={exercise.id}> 
				<div>{exercise.name}</div> 
				<div>{exercise.reps} reps</div> 
				<div>{exercise.sets} sets</div> 
				{exercise.isWeighted && <>weighted exercise</>}
				<div>{exercise.weight} weight</div> 
				<div> {exercise.id} id</div> 
				<button onClick={()=>removeExercise(exercise.id)}>
		remove
				</button>
				<h1>test</h1>
			</li>)} 
		</> 
	)
}
 


export default ExerciseList
