import React, {useEffect,useState} from "react"
import {filterExercisesByName,filterWorkoutsByDate} from "../../Functions/workoutFunctions"
import HistoryWorkout from "../HistoryWorkout" 
import CalendarPicker from "../CalendarPicker"
import MenuCard from "../MenuCard" 
import DropdownClient from "./DropdownClient" 
import CheckBox from "../CheckBox"
import { BsSearch } from "react-icons/bs"

const TrainerHistory=({clients})=>{ 
	/* view workout history of any client */

	const [selectedClient,setSelectedClient]=useState()
	const [filterQuery, setFilterQuery] = useState("") //Search term
	const [useDate,setUseDate]=useState(false) // use calendar selection? 
	const [dateRange,setDateRange]=useState(new Date()) // when interacted with, will become array  with start and end of selection

	const [filteredWorkouts,setFilteredWorkouts]=useState(null) 
	
	const filterByDate=(workouts,dateRange)=>{ 
		if(useDate){ // if check box is ticked
			const results=[]
			filterWorkoutsByDate(workouts,dateRange).forEach((workout)=>{ //For each workout within date range
				if (filterExercisesByName(workout.exercises,filterQuery).length>0){ // if satisfies search query
					results.push(workout)
				}})
			setFilteredWorkouts(results)
		}}

	useEffect(()=>{
		if (selectedClient){
			if (useDate) { // combine date range and search term
				filterByDate(selectedClient.days,dateRange)
			} 
			else{ // use search term only 
				setFilteredWorkouts(
					selectedClient.days.map((workout)=>{ 
						const result=filterExercisesByName(workout.exercises,filterQuery)
						if(result.length!==0){return(workout)}
					})
						.filter((value)=>value!=undefined)) 
			} }
	},[filterQuery,useDate,selectedClient])  //search box content or checkbox are changed

	const body=()=>(
		<div style={{height:"100%",display:"flex",flexDirection:"column"}}>
			<DropdownClient clients={clients} selectedClient={selectedClient} setSelectedClient={setSelectedClient}/>
			<div>
				<p>Search by exercise name:</p>
				<div style={{display:"flex"}}>
					<BsSearch style={{marginRight:"5px"}} />
					<input style={{marginBottom:"40px"}}className="search" placeholder="Exercise to analyse" 
						onChange={(event) =>{setFilterQuery(event.target.value)}}//filter suggestions
					/> 
				</div>
			</div>
			<div style={{alignSelf:"flex-start",marginTop:"auto",marginBottom:"40px", }}>
				<div style={{display:"flex", flexDirection:"column",alignItems:"center",padding:"0px",margin:"0px"}}>
					<p style={{margin:"0px",display:"block"}}>Filter by date</p>
					<CheckBox callback={()=>{setUseDate(!useDate)}} value={useDate}/> 
				</div>
			</div>
			<CalendarPicker dateRange={dateRange} setDateRange={setDateRange} workouts={selectedClient && selectedClient.days} callback={filterByDate} /> 
		</div> 
	)

	return(
		<>
			<div className="pageContainer">
				<MenuCard header={()=>"History"} body={body}/> 
				{ filteredWorkouts && filteredWorkouts.length>0 && 
				<div style={{overflowY:"scroll"}}className="resultPage history"> 
					<div style={{display:"block"}}>{/*Safari needs explicit block display for scroll*/}
						<ul className="history__list" 
							style={{display:"flex",flexDirection:"column-reverse",listStyleType:"none"}}>
							{filteredWorkouts.map((workout,index)=>( 
								<li key={index} >
									<HistoryWorkout workout={workout} /> 
								</li>
							))}
						</ul>

					</div>
				</div>}
			</div>
		</>
	)
}

export default TrainerHistory