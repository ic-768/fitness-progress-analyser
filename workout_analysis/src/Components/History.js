import React, {useState} from "react"
import {filterExercises} from "../Functions/workoutFunctions"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import HistoryWorkout from "./HistoryWorkout"
import Container from "react-bootstrap/Container"

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

	if (workouts.length ===0) return (
		<>
			<h2>It looks like you&apos;ve never submitted a workout! </h2>
			<h3>After submitting one, you can start viewing your fitness history.</h3>
		</>

	)
	return(
		<Container>
			<div style={{paddingTop:"20px ",display:"flex", flexGrow:"1",
				flexDirection:"column", 
			}}>
				<Form  onSubmit={(event)=>{event.preventDefault()}}>
					<FormControl type="text" placeholder="Search exercises" className="mr-sm-2" onChange={(event)=>{ 
						filterWorkouts(workouts,event.target.value)
					}} />
				</Form>

				{ filteredWorkouts.length>0 && 
			<ul style={{ height:"inherit",listStyleType:"none",backgroundColor:"white",borderRadius:"20px",margin:"10px",padding:"20px",border:"2px solid black",display:"flex", flexDirection:"column", }}>
				{filteredWorkouts.map((workout,index)=>( 
					<li key={index} >
						<HistoryWorkout workout={workout} /> 
					</li>
				))}
			</ul>}
			</div>
		</Container>
	)
}

export default History