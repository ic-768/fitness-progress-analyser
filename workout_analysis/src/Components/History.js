import React, {useState} from "react"
import {filterExercises} from "../Functions/workoutFunctions"

const tableStyle={
	"borderCollapse":"collapse",
	"margin":"10px",
	"border":"1px solid black",
} 
const cellStyle={
	"padding":"5px",
	"border":"1px solid black",
	"textAlign":"left"
}

const History=({workouts})=>{ 
	const [filteredWorkouts,setFilteredWorkouts]=useState(workouts) 
	//Will be using filteredWorkouts for the functionality here.

	const filterWorkouts=(workouts,filter)=>{ 
		setFilteredWorkouts(
			workouts.map((workout)=>{ 
				/* If result doesn't match, an empty array will be returned. */
				const result=
				filterExercises(workout.exercises,filter)
				if(result.length!==0){return(workout)}  //if non-empty array
				return(null) // else null
			}))
	}

	return(
		<div>
			<input onChange={(event)=>{ //uncontrolled seems to work ok
				event.preventDefault
				filterWorkouts(workouts,event.target.value)
			}} 
			placeholder="Exercise Filter"/>

			<ul>
				{filteredWorkouts.map((workout,index)=>{ 
					if(workout){return(
						<div key={index}>
							<h2>{new Date(workout.date).toDateString()}</h2>
							{workout.exercises.map((exercise,index) => (
								<table style={tableStyle} key={index}>
									<tbody>
										<tr>
											<th style={cellStyle}>Exercise</th>
											<th style={cellStyle}>Repetitions</th>
											<th style={cellStyle}>Sets</th>
										</tr>
										<tr>
											<td style={cellStyle}>{exercise.name}</td>
											<td style={cellStyle}>{exercise.sets}</td>
											<td style={cellStyle}>{exercise.reps}</td>
										</tr>
									</tbody>
								</table>
							))}
						</div>
					)}})}
			</ul>
		</div>

	)
}

export default History