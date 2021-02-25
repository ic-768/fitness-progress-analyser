import React,{useState} from "react" 
import {datedAnalysis,allTimeAnalysis,exerciseNamesFromWorkouts} from "../Functions/workoutFunctions"
import {Route,Switch,useHistory} from "react-router-dom"
import AnalysisSelector from "./AnalysisSelector"
import AnalysisPlot from "./AnalysisPlot"


const Analysis=({workouts})=>{

	const exerciseNameCache=exerciseNamesFromWorkouts(workouts)
		.filter((name,index)=>( //keep only 1 instance of each name
			exerciseNamesFromWorkouts(workouts).indexOf(name)===index)
			/*indexOf returns index of first matching element
			if repetition of element in array, it will not equal the index of the first
			element, thus being discarded */
		)
	const [suggestions,setSuggestions]=useState([])
	const [selection,setSelection]=useState() 
	const history = useHistory()

	return(
		<div>
			<button onClick={()=>{history.push("/")}}>Home</button>
			<input onChange={(event)=>{ //filter suggestions
				setSuggestions(exerciseNameCache.filter((name)=>(
					name.toLowerCase().includes(event.target.value.toLowerCase())
				))) }} placeholder="exercise"> 
			</input> 

			{suggestions.length<5 //if suggestions narrowed down, allow setting the selection for analysis
				? (<ul>{suggestions.map((suggestion,index)=> 
					(<>
						<li key={index}>{suggestion}</li> 
						<button key ={`${index}Button`} onClick={()=>{setSelection(suggestions[index])}}>analyse</button>
					</>)
				)} </ul>)  
				: (<h2>Too many suggestions to show!</h2>)}

			<Switch> 
				<Route path="/analysis/daily"> 
					<AnalysisSelector selection={"day"}/>
					{selection && (
						<AnalysisPlot analysis={datedAnalysis(workouts,selection||suggestions[0],"daily")} />
					)}
				</Route>
				<Route path="/analysis/monthly">
					<AnalysisSelector selection={"month"}/> 
					{selection && (
						<AnalysisPlot analysis={datedAnalysis(workouts,selection||suggestions[0],"monthly")} />
					)}
				</Route>
				<Route path="/analysis/all">
					<AnalysisSelector selection={"all"}/> 
					{selection && (
						<AnalysisPlot analysis={allTimeAnalysis(workouts,selection||suggestions[0])}/>
					)}
				</Route>
				<Route path ="/analysis/">
					{selection
						? (<>
							<button onClick={()=>{history.push("/analysis/daily")}}>Daily</button>
							<button onClick={()=>{history.push("/analysis/monthly")}}>Monthly</button>
							<button onClick={()=>{history.push("/analysis/all")}}>All time</button>
						</>
						)
						: <h2>To see your progress, start typing an exercise name, and pick from the list. Then choose a time duration for the analysis, and you&apos;re set :)</h2>}
				</Route>
			</Switch>
		</div>
	)
}

export default Analysis