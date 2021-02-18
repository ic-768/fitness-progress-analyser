import React from "react" 
import {getTotalReps,getDaysWorkout,getMonthsWorkouts,getAllWorkouts } from "../Functions/workoutFunctions"
import {Route,useHistory} from "react-router-dom"
import WeeklyAnalysis from "./WeeklyAnalysis"


const Analysis=()=>{
	const workouts=JSON.parse(window.localStorage.getItem("userWorkouts"))
	const history = useHistory()
	return(
		<div>
			<button onClick={()=>{history.push("/analysis/daily")}}>Daily</button>
			<button onClick={()=>{history.push("/analysis/weekly")}}>Weekly</button>
			<button onClick={()=>{history.push("/analysis/monthly")}}>Monthy</button>
			<button onClick={()=>{history.push("/analysis/all")}}>All time</button>
			<Route path="/analysis/daily"> 
				<button onClick={() => { console.log(getTotalReps(getDaysWorkout(workouts), "meditation")) }}>
					get today&apos;s reps
				</button>
			</Route>
			<Route path="/analysis/weekly"> 
				<WeeklyAnalysis workouts={workouts}/>
			</Route>
			<Route path="/analysis/monthly">
				<button onClick={()=>{getMonthsWorkouts(workouts)}}>
		month&apos;s workouts
				</button> 
			</Route>
			<Route path="/analysis/all">
				<button onClick={()=>{getAllWorkouts(workouts)}}>
		All-time workouts
				</button>
			</Route>
		</div>
	)
}

export default Analysis