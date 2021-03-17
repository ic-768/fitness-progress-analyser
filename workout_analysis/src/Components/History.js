import React, {useEffect,useState} from "react"
import {filterExercisesByName,filterWorkoutsByDate} from "../Functions/workoutFunctions"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"
import HistoryWorkout from "./HistoryWorkout" 
import CalendarPicker from "./CalendarPicker"
import MenuCard from "./MenuCard"


const History=({workouts})=>{ 
	const [filterQuery, setFilterQuery] = useState("") //Search term
	const [useDate,setUseDate]=useState(false) // use calendar selection? 
	const [dateRange,setDateRange]=useState(new Date()) // when interacted with, will become array  with start and end of selection

	const [filteredWorkouts,setFilteredWorkouts]=useState(workouts) 
	
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
		if (useDate) { // combine date range and search term
			filterByDate(workouts,dateRange)
		} 
		else{ // use search term only 
			setFilteredWorkouts(
				workouts.map((workout)=>{ 
					const result=filterExercisesByName(workout.exercises,filterQuery)
					if(result.length!==0){return(workout)}
				})
					.filter((value)=>value!=undefined)) 
		} 
	},[filterQuery,useDate])  //search box content or checkbox are changed

	if (workouts.length ===0) return ( 
		<div className="pageContainer">
			<MenuCard header={"My History"} body={()=>(null)}/>

			<div style={{marginTop:"80px",display:"flex",flexDirection:"column"}}> 
				<div className="historyContainer">					
					<h2>It looks like you&apos;s never submitted an exercise!</h2>
					<h4 style={{marginTop:"40px"}}>After you submit one, you can start viewing your past workouts here.</h4>
				</div>
			</div> 

		</div> 
	)

	const body=()=>(
		<>
			<p>Search by name</p>
			<Form style={{marginBottom:"40px"}} onSubmit={(event)=>{event.preventDefault()}}>
				<FormControl type="text" placeholder="e.g. pushups"  onChange={(event)=>{setFilterQuery(event.target.value)}}/>
			</Form>
			<div>
				<p style={{marginRight:"20px",display:"inline"}}>Filter by date</p>
				<input type="checkbox" value={useDate} onClick={()=>{setUseDate(!useDate)}}/> 
			</div>
			<CalendarPicker dateRange={dateRange} setDateRange={setDateRange} workouts={workouts} callback={filterByDate} /> 
		</> 
	)

	return(
		<>
			<div className="pageContainer">
				<MenuCard header={"My History"} body={body}/> 
				{ filteredWorkouts && filteredWorkouts.length>0 && 
				<div className="resultPage history">
					<ul Name="history__list" 
						style={{display:"flex",flexDirection:"column-reverse",listStyleType:"none"}}>
						{filteredWorkouts.map((workout,index)=>( 
							<li key={index} >
								<HistoryWorkout workout={workout} /> 
							</li>
						))}
					</ul>
				</div>}
			</div>
		</>
	)
}

export default History