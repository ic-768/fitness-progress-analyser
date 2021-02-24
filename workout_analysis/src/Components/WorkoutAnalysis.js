import React from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
const WorkoutAnalysis=({analysis})=>{
	// We can use interval to decide format of date to pass to plot object

	if(analysis){ 
		return (
			<AreaChart
				width={600}
				height={400}
				data={analysis}
				margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="date" />
				<YAxis />
				<Tooltip />
				<Area
					type='monotone'
					dataKey='exercise.totalReps'
					stroke='#8884d8'
					fill='#8884d8'
				/>
			</AreaChart>
		)

		/*return(
			<div>
				<div>
					{

					
						analysis.map((day,index)=>{ 
							return(
								<ul key={`${index}`}> 
									<li>{day.date}</li>
									<li>{day.exercise.totalReps} reps</li>
								</ul> 
							)
						})}
				</div>
			</div>
		)
					*/}
	return(null)
}

export default WorkoutAnalysis
