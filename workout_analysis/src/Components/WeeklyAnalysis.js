import React from "react"
import {getTotalReps,getWeeksWorkouts} from "../Functions/workoutFunctions"

const WeeklyAnalysis=({workouts})=>{
	return(
		<button onClick={() => { console.log(getTotalReps(getWeeksWorkouts(workouts), "meditation")) }}>
					get week&apos;s reps
		</button>
	)
}

export default WeeklyAnalysis
