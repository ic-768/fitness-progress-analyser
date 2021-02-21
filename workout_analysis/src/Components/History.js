import React, {useState} from "react"
import {useHistory} from "react-router-dom"
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
	//TODO Collapse multiple same exercises of same day into a single workout
	const history=useHistory()
	const [filteredWorkouts,setFilteredWorkouts]=useState(workouts) 
	//Will be using filteredWorkouts for everything.

	const filterWorkouts=(workouts,filter)=>{ 
		setFilteredWorkouts(
			workouts.map((workout)=>{ 
				/* If no match, result will be empty array. */
				const result= filterExercises(workout.exercises,filter)
				if(result.length!==0){return(workout)}  //if non-empty array
			}).filter((value)=>value!=undefined))
	}

	return(
		<div>
			<button onClick={()=>{history.push("/")}}>Home</button>
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
							<table style={tableStyle}>
								<tbody>
									<tr>
										<th style={cellStyle}>Exercise</th>
										<th style={cellStyle}>Repetitions</th>
										<th style={cellStyle}>Sets</th>
									</tr>
									{workout.exercises.map((exercise,index) => (
										<tr key={index}>
											<td style={cellStyle}>{exercise.name}</td>
											<td style={cellStyle}>{exercise.sets}</td>
											<td style={cellStyle}>{exercise.reps}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}})}
			</ul>
		</div>

	)
}

export default History