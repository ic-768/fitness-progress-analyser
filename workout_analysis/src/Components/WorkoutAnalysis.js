import React from "react"

const WorkoutAnalysis=({workouts,exerciseName,analysisFunction})=>{
	const days=analysisFunction(workouts,exerciseName)
	if(days){
		return(
			<div>
				<ul>
					{days.map((day,index)=>{ 
						const date= new Date(day.date).toDateString()
						return(/*this will become a plot chart, so no use in making it pretty now*/
							<> 
								<li key={`${index}${date}`}>{date}</li>
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
