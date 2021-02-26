import React,{useState} from "react" 
import {datedAnalysis,allTimeAnalysis,exerciseNamesFromWorkouts} from "../Functions/workoutFunctions"
import {Route,Switch,useHistory} from "react-router-dom"
import Button from "react-bootstrap/Button"
import Tooltip from "react-bootstrap/Tooltip"
import Dropdown from "react-bootstrap/Dropdown"

import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import AnalysisPlot from "./AnalysisPlot"


const Analysis=({workouts})=>{

	if(!workouts){return(<div>Workouts haven not been loaded</div>)}

	/***************STYLING******************/
	const toolTipButtonStyle={
		borderRadius:"90%",
		backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(255,255,255,0.2) 39%,rgba(255,255,255,0.15) 11%,rgba(0,0,0,1))",
		backgroundRepeat:"repeat-x",
		width:"30px"

	}

	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			Start typing an exercise name! :)
		</Tooltip>
	)
	
	/***************STYLING******************/

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
			<input onChange={(event)=>{ //filter suggestions
				setSuggestions(exerciseNameCache.filter((name)=>(
					name.toLowerCase().includes(event.target.value.toLowerCase())
				))) }} placeholder="exercise"> 
			</input> 
			<OverlayTrigger placement="right"
				overlay={renderTooltip}>
				<Button size="sm" variant="primary" style={toolTipButtonStyle}>?</Button>
			</OverlayTrigger>

			{suggestions.length<5 //if suggestions narrowed down, allow setting the selection for analysis
				? (<ul>{suggestions.map((suggestion,index)=> 
					(<>
						<li key={index}>{suggestion}</li> 
						<Dropdown key ={`${index}Button`}>
							<Dropdown.Toggle>
							Analyse 
							</Dropdown.Toggle>
							<Dropdown.Menu>
								<Dropdown.Item onClick={()=>{setSelection(suggestions[index]);history.push("/analysis/daily")}}> Daily</Dropdown.Item>
								<Dropdown.Item onClick={()=>{setSelection(suggestions[index]);history.push("/analysis/monthly")}}> Monthly</Dropdown.Item>
								<Dropdown.Item onClick={()=>{setSelection(suggestions[index]);history.push("/analysis/all")}}> All-Time</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</>)
				)} </ul>)  
				: (<h2>Too many suggestions to show!</h2>)}

			<Switch> 
				<Route path="/analysis/daily"> 
					{selection && (
						<>
							<h2>Daily</h2>
							<AnalysisPlot analysis={datedAnalysis(workouts,selection||suggestions[0],"daily")} />
						</>
					)}
				</Route>
				<Route path="/analysis/monthly">
					{selection && (
						<>
							<h2>Monthly</h2>
							<AnalysisPlot analysis={datedAnalysis(workouts,selection||suggestions[0],"monthly")} />
						</>
					)}
				</Route>
				<Route path="/analysis/all">
					{selection && (
						<>
							<h2>All Time</h2>
							<AnalysisPlot analysis={allTimeAnalysis(workouts,selection||suggestions[0])}/>
						</>
					)}
				</Route>
				<Route path ="/analysis/"> {/*Nicer view if no analysis*/}
				</Route>
			</Switch>
		</div>
	)
}

export default Analysis