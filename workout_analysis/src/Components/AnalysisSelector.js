import React from "react"
import {getTotalReps,getDaysWorkout,getWeeksWorkouts,getMonthsWorkouts,getAllWorkouts} from "../Functions/workoutFunctions"
import {useHistory} from "react-router-dom"

const AnalysisSelector=({workouts,exerciseName,timeFunction})=>{
	// Buttons to select time-frame of analysis
	const history=useHistory()
	return(
		<>
			{timeFunction == getDaysWorkout
			&& ( <h2>Daily</h2> )}
			{timeFunction == getWeeksWorkouts
			&& ( <h2>Weekly</h2> )}
			{timeFunction == getMonthsWorkouts
			&& ( <h2>Monthly</h2> )}
			{timeFunction == getAllWorkouts
			&& ( <h2>All-time</h2> )}

			<button onClick={() => { console.log(getTotalReps(timeFunction(
				workouts), exerciseName)) }}>
					get All-time reps
			</button>

			{timeFunction != getDaysWorkout
			&& (<button onClick={()=>{history.push("/analysis/daily")}}>Daily</button>)}

			{timeFunction != getWeeksWorkouts
			&& (<button onClick={()=>{history.push("/analysis/weekly")}}>Weekly</button>)} 

			{timeFunction != getMonthsWorkouts
			&& (<button onClick={()=>{history.push("/analysis/monthly")}}>Monthly</button>)}

			{timeFunction != getAllWorkouts
			&& (<button onClick={()=>{history.push("/analysis/all")}}>All</button>)}
		</>
	)
}

export default AnalysisSelector