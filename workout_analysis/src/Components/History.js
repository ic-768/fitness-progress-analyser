import React, {useState} from "react"
import {filterExercisesByName,filterWorkoutsByDate} from "../Functions/workoutFunctions"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import HistoryWorkout from "./HistoryWorkout" 
import CalendarPicker from "./CalendarPicker"

import {IoIosArrowBack} from "react-icons/io"
import {useHistory} from "react-router-dom"

const History=({workouts})=>{ 
	const history = useHistory()
	const [filteredWorkouts,setFilteredWorkouts]=useState(workouts) 

	const filterByName=(workouts,filter)=>{ 
		setFilteredWorkouts(
			workouts.map((workout)=>{ 
				/* If no match, result will be empty array. */
				const result=filterExercisesByName(workout.exercises,filter)
				//TODO if date picked=>second filtering function
				if(result.length!==0){return(workout)}  //if non-empty array
			}).filter((value)=>value!=undefined))
	}

	const filterByDate=(workouts,date)=>{
		setFilteredWorkouts(filterWorkoutsByDate(workouts,date))}

	if (workouts.length ===0) return (
		<>
			<h2>It looks like you&apos;ve never submitted a workout! </h2>
			<h3>After submitting one, you can start viewing your fitness history.</h3>
		</>

	)
	return(
		<div style={{display:"flex", height:"100%"}}>
			<div style={{borderRadius:"5px",marginBottom:"57px",marginLeft:"20px",marginTop:"80px",padding:"40px",backgroundColor:"white",display:"flex",flexDirection:"column"}}>
				<h1 style={{marginBottom:"57px"}}> <IoIosArrowBack style={{cursor:"pointer"}} onClick={()=>{history.push("/") }}/> My History </h1>
				<p>Search by name</p>
				<Form  style={{marginBottom:"40px"}} onSubmit={(event)=>{event.preventDefault()}}>
					<FormControl type="text" placeholder="Search exercises" className="mr-sm-2" onChange={(event)=>{ 
						filterByName(workouts,event.target.value)
					}} />
				</Form>
				<p>Or search by date</p>
				<CalendarPicker workouts={workouts} callback={filterByDate} />
			</div>

			<div style={{ marginTop:"80px",display:"flex",flexDirection:"column"}}> 
				{ filteredWorkouts.length>0 && 
				<div style={{marginBottom:"57px",overflowY:"auto",minWidth:"500px",padding:"0px 58px 36px 58px",boxShadow: ("0px 0px 4px rgba(0, 0, 0, 0.45)"),borderRadius:"5px",
					backgroundColor:"white",marginLeft:"58px",marginRight:"58px"}}>
					<ul style={{ height:"inherit",listStyleType:"none",backgroundColor:"white",borderRadius:"20px",display:"flex", flexDirection:"column", }}>
						{filteredWorkouts.map((workout,index)=>( 
							<li key={index} >
								<HistoryWorkout workout={workout} /> 
							</li>
						))}
					</ul>
				</div>}
			</div>
		</div>
	)
}

export default History