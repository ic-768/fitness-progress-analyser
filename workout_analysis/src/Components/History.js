import React, {useState} from "react"
import {filterExercises} from "../Functions/workoutFunctions"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import HistoryWorkout from "./HistoryWorkout"

const History=({workouts})=>{ 
	const [filteredWorkouts,setFilteredWorkouts]=useState(workouts) 
	//Will be using filteredWorkouts for everything.

	const filterWorkouts=(workouts,filter)=>{ 
		setFilteredWorkouts(
			workouts.map((workout)=>{ 
				/* If no match, result will be empty array. */
				const result=filterExercises(workout.exercises,filter)
				if(result.length!==0){return(workout)}  //if non-empty array
			}).filter((value)=>value!=undefined))
	}

	return(
		<div style={{padding:"20px 90px 0 90px",display:"flex", 
			flexDirection:"column", alignContent:"center",justifyContent:"center",
			alignItems:"center",justifyItems:"center",}}>
			<Form  onSubmit={(event)=>{event.preventDefault()}}>
				<FormControl type="text" placeholder="Search exercises" className="mr-sm-2" onChange={(event)=>{ 
					filterWorkouts(workouts,event.target.value)
				}} />
			</Form>

			{ filteredWorkouts.length>0 && 
			<ul style={{ listStyleType:"none",backgroundColor:"white",borderRadius:"20px",margin:"10px",padding:"20px",border:"2px solid black",display:"flex", flexDirection:"column", }}>
				{filteredWorkouts.map((workout,index)=>( 
					<li key={index} >
						<HistoryWorkout workout={workout} /> 
					</li>
				))}
			</ul>}
		</div>

	)
}

export default History