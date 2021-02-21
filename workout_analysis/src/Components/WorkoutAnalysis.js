import React,{useEffect,useState} from "react"
import {filterExercises} from "../Functions/workoutFunctions"

/** 
		 * Status quo: We get array of workout objects. This is good.
		 * TODO Cherry pick the exercise of workout that we care about
		 * TODO Get dates of each workout
		 * ! IF SAME EXERCISE HAPPENED TWICE IN A DAY, ADD UP RESULTS.
		 * ! DO SETS*REPS FIRST, THEN ADDITION!
		 * 
*/
const WorkoutAnalysis=({workouts,exerciseName})=>{
	const [relevant,setRelevant]=useState([])

	useEffect(()=>{setRelevant( 
		workouts.map((workout)=>{ 
			/* If no match, result will be empty array. */
			const result= filterExercises(workout.exercises,exerciseName)
			if(result.length!==0){return(workout)}  //if non-empty array
			return(null) // else null
		}).filter((value)=>value!==null))
	},[exerciseName])

	console.log(exerciseName,relevant)
	return(
		<>
		</>
	)
}

export default WorkoutAnalysis
