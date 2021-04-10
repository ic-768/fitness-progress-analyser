import React, {useEffect,useState} from "react"
import {filterExercisesByName,filterWorkoutsByDate} from "../../Functions/workoutFunctions"
import { BsSearch } from "react-icons/bs"
import HistoryWorkout from "../HistoryWorkout" 
import CalendarPicker from "../CalendarPicker"
import MenuCard from "../MenuCard"
import CheckBox from "../CheckBox"


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
			workouts && 
			setFilteredWorkouts(
				workouts.map((workout)=>{ 
					const result=filterExercisesByName(workout.exercises,filterQuery)
					if(result.length!==0){return(workout)}
				})
					.filter((value)=>value!=undefined)) 
		} 
	},[filterQuery,useDate])  //search box content or checkbox are changed

	if (workouts && workouts.length ===0) return ( 
		<div className="pageContainer">
			<MenuCard header={()=>"My History"} body={()=>( 
				<div>
						It looks like you&apos;s never submitted an exercise!
				</div> 
			)}/>


		</div> 
	)

	const body=()=>(
		<div style={{height:"100%",display:"flex",flexDirection:"column"}}>
			<p>Search by exercise name:</p>
			<div style={{display:"flex"}}>
				<BsSearch style={{marginRight:"5px"}} />
				<input className="search" placeholder="Exercise to analyse" onChange={(event)=>{ //filter suggestions
					setFilterQuery(event.target.value)}} /> 
			</div>
			<div style={{alignSelf:"flex-start",marginTop:"auto",marginBottom:"40px", }}>
				<div style={{display:"flex", flexDirection:"column",alignItems:"center",margin:"0px"}}>
					<p style={{margin:"0px",display:"block"}}>Filter by date</p>
					<CheckBox callback={()=>{setUseDate(!useDate)}} value={useDate}/> 
				</div>
			</div>
			<CalendarPicker dateRange={dateRange} setDateRange={setDateRange} workouts={workouts} callback={filterByDate} /> 
		</div> 
	)

	return(
		<>
			<div className="pageContainer">
				<MenuCard header={()=>"My History"} body={body}/> 
				{ filteredWorkouts && filteredWorkouts.length>0 && 
				<div className="resultPage history">
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

export default History