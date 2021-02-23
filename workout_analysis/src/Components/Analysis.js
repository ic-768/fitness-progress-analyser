import React,{useState} from "react" 
import {dailyAnalysis,monthlyAnalysis,exerciseNamesFromWorkouts, getDaysWorkout,getWeeksWorkouts,getAllWorkouts,getMonthsWorkouts} from "../Functions/workoutFunctions"
import {Route,Switch,useHistory} from "react-router-dom"
import AnalysisSelector from "./AnalysisSelector"
import WorkoutAnalysis from "./WorkoutAnalysis"


const Analysis=()=>{
	const workouts=JSON.parse(window.localStorage.getItem("userWorkouts")) 
	const exerciseNameCache=exerciseNamesFromWorkouts(workouts)
		.filter((name,index)=>( //keep only 1 instance of each name
			exerciseNamesFromWorkouts(workouts).indexOf(name)===index)
			/*indexOf returns index of first matching element
			if repetition of element in array, it will not equal the index of the first
			element, thus being discarded */
		)
	const [suggestions,setSuggestions]=useState([])

	const history = useHistory()
	return(
		<div>
			<button onClick={()=>{history.push("/")}}>Home</button>
			<input onChange={(event)=>{ //filter suggestions
				setSuggestions(exerciseNameCache.filter((name)=>(
					name.toLowerCase().includes(event.target.value.toLowerCase())
				))) }} placeholder="exercise"> 
			</input>

			{suggestions.length<5
				? (<ul>{suggestions.map((suggestion,index)=>
					(<li key={index}>{suggestion}</li>))}</ul>) 
				: (<h2>Too many suggestions to show!</h2>)}

			<Switch> 
				<Route path="/analysis/daily"> 
					<AnalysisSelector workouts={workouts} exerciseName={suggestions[0]}timeFunction={getDaysWorkout}/>
					{suggestions.length==1 && (
						<WorkoutAnalysis workouts={workouts} exerciseName={suggestions[0]} analysisFunction={dailyAnalysis}/>
					)}
				</Route>
				<Route path="/analysis/weekly"> 
					<AnalysisSelector workouts={workouts} exerciseName={suggestions[0]}timeFunction={getWeeksWorkouts}/> 
				</Route>
				<Route path="/analysis/monthly">
					<AnalysisSelector workouts={workouts} exerciseName={suggestions[0]}timeFunction={getMonthsWorkouts}/> 
					{suggestions.length==1 && (
						<WorkoutAnalysis workouts={workouts} exerciseName={suggestions[0]} analysisFunction={monthlyAnalysis}/>
					)}
				</Route>
				<Route path="/analysis/all">
					<AnalysisSelector workouts={workouts} exerciseName={suggestions[0]}timeFunction={getAllWorkouts}/> 
				</Route>
				<Route path ="/analysis/">
					{suggestions.length===1
						? (<>
							<button onClick={()=>{history.push("/analysis/daily")}}>Daily</button>
							<button onClick={()=>{history.push("/analysis/weekly")}}>Weekly</button>
							<button onClick={()=>{history.push("/analysis/monthly")}}>Monthly</button>
							<button onClick={()=>{history.push("/analysis/all")}}>All time</button>
						</>
						)
						: <h2>To see your progress, start typing an exercise name in the search field 
					until only one result remains :)</h2>}
				</Route>
			</Switch>
		</div>
	)
}

export default Analysis