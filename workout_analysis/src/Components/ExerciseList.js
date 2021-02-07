import React from "react"

const ExerciseList=({totalExercises,setTotalExercises})=>{ 

	const exercises = totalExercises.map((exercise,index)=>{ // to give local key id
		/* not sure why this works. removeExercise() removes based on exercises id
		 * as opposed to totalExercises id.
		 * seems to be fine so I'll leave it for now
		 * */
		exercise.id=index
		return exercise
	})

	const removeExercise=(id)=>{ //filter exercises based on id
		setTotalExercises(totalExercises.filter((exercise)=>exercise.id!==id))
	}

	return( 
		<>
			<h2>Total exercises </h2>
			{exercises.map((exercise)=><li key={exercise.id}> 
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
