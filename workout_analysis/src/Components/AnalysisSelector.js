import React from "react"
import {getDaysWorkout,getWeeksWorkouts,getMonthsWorkouts,getAllWorkouts} from "../Functions/workoutFunctions"
import {useHistory} from "react-router-dom"

const AnalysisSelector=({timeFunction})=>{
	// Buttons to select time-frame of analysis
	const history=useHistory()
	return(
		<>
			{timeFunction == getDaysWorkout 
			// Run these on a filtered workout total
			&& ( <h2>Daily</h2> )}
			{timeFunction == getWeeksWorkouts
			&& ( <h2>Weekly</h2> )}
			{timeFunction == getMonthsWorkouts
			&& ( <h2>Monthly</h2> )}
			{timeFunction == getAllWorkouts
			&& ( <h2>All-time</h2> )}

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