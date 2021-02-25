import React, {useState} from "react"
import {filterExercises} from "../Functions/workoutFunctions"
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"

const History=({workouts})=>{ 
	//TODO Collapse multiple same exercises of same day into a single workout
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
			<Form inline>
				<FormControl type="text" placeholder="Search exercises" className="mr-sm-2" onChange={(event)=>{ //uncontrolled seems to work ok
					event.preventDefault
					filterWorkouts(workouts,event.target.value)
				}} />
			</Form>

			<ul>
				{filteredWorkouts.map((workout,index)=>{ 
					if(workout){return(
						<div key={index}>
							<h2>{new Date(workout.date).toDateString()}</h2>
							<Table striped bordered hover >
								<tbody>
									<tr> {/*classnames ensure column width*/}
										<th className="col-1" >Exercise</th>
										<th className="col-1">Repetitions</th>
										<th classnName="col-1">Sets</th>
									</tr>
									{workout.exercises.map((exercise,index) => (
										<tr  key={index}>
											<td className="col-1">{exercise.name}</td>
											<td className="col-1">{exercise.sets}</td>
											<td className="col-1">{exercise.reps}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					)}})}
			</ul>
		</div>

	)
}

export default History