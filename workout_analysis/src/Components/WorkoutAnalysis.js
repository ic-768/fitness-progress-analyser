import React from "react"
import {monthlyAnalysis, dailyAnalysis} from "../Functions/workoutFunctions"

const WorkoutAnalysis=({workouts,exerciseName,analysisFunction})=>{
	const days=analysisFunction(workouts,exerciseName)
	let date
	if(days){
		return(
			<div>
				<ul>
					{days.map((day,index)=>{ {/*There's definitely a better way than checking on each iteration, but works do for now..*/}
						if(analysisFunction==monthlyAnalysis){
							date=new Date(day.date).toLocaleString("default", { month: "long" })
						} 
						else if (analysisFunction==dailyAnalysis){
							date=new Date(day.date).toDateString() } 
						else{
							console.log("get year") 
						} 
						return(/*this will become a plot chart, so no use in making it pretty now*/
							<> 
								<li key={`${index}${day}`}>{date}</li>
								<li key={`${index}${day.exerciseName}`}>{day.exercise.totalReps} reps</li>
							</> 
						)
					})}
				</ul>
			</div>
		)
	}
	return(null)
}

export default WorkoutAnalysis
