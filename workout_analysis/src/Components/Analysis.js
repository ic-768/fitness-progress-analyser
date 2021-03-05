import React,{useState, useEffect} from "react" 
import {allTimeAnalysis,exerciseNamesFromWorkouts, datedAnalysis} from "../Functions/workoutFunctions"
import Button from "react-bootstrap/Button"
import Tooltip from "react-bootstrap/Tooltip"
import Dropdown from "react-bootstrap/Dropdown"

import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import AnalysisPlot from "./AnalysisPlot"

const Analysis=({workouts})=>{

	/***************STYLING******************/
	const toolTipButtonStyle={
		marginLeft:"10px",
		borderRadius:"90%",
		backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(255,255,255,0.2) 39%,rgba(255,255,255,0.15) 11%,rgba(0,0,0,1))",
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
	const [selection,setSelection]=useState(null)  //Selection to be analysed
	const [analysisType,setAnalysisType]=useState(null)  //Daily/Monthly/All-Time
	const [analysisResults,setAnalysisResults]=useState(null)  //Data from analysis

	useEffect(()=>{
		if(analysisType==="Daily"){
			setAnalysisResults(datedAnalysis(workouts,selection||suggestions[0],"daily"))
		}
		else if(analysisType==="Monthly"){
			setAnalysisResults(datedAnalysis(workouts,selection||suggestions[0],"monthly"))
		} 
		else{setAnalysisResults(allTimeAnalysis(workouts,selection||suggestions[0])) }

	},[selection, analysisType])
	
	return(
		<div style={{display:"flex", flexDirection:"column", justifyContent:"center",alignContent:"center",alignItems:"center"}}>
			{ analysisResults && selection && 
			(
				<div style={{marginTop:"10px",display:"flex", flexDirection:"column", alignItems:"center"}}>
					<h2 style={{color:"white",borderRadius:"50px",padding:"20px",backgroundColor:"black"}}>{analysisType}</h2>
					<AnalysisPlot analysis={analysisResults}/>
				</div>
			)}
			<div>
				<input style={{marginTop:"20px"}} onChange={(event)=>{ //filter suggestions
					setSuggestions(exerciseNameCache.filter((name)=>(
						name.toLowerCase().includes(event.target.value.toLowerCase())
					))) }} placeholder="exercise"> 
				</input> 
				<OverlayTrigger placement="right"
					overlay={renderTooltip}>
					<Button size="sm" variant="primary" style={toolTipButtonStyle}>?</Button>
				</OverlayTrigger>
			</div>
			{suggestions.length<5 //if suggestions narrowed down, allow setting the selection for analysis
				? (<ul style={{marginTop:"30px",padding:"0px",display:"flex", 
					justifyContent:"center",
					justifyItems:"center", alignContent:"center",
				}}>{suggestions.map((suggestion,index)=> 
						(<div style={{ margin:"0px 5px 0px 10px",display:"flex", flexDirection:"column", alignItems:"center",}}key={index}>
							<h5 style={{color:"black"}}>{suggestion}</h5> 
							<Dropdown key ={`${index}Button`}>
								<Dropdown.Toggle>
							Analyse 
								</Dropdown.Toggle>
								<Dropdown.Menu>
									<Dropdown.Item onClick={()=>{setAnalysisType("Daily");setSelection(suggestions[index])}}> Daily</Dropdown.Item>
									<Dropdown.Item onClick={()=>{setAnalysisType("Monthly");setSelection(suggestions[index])}}> Monthly</Dropdown.Item>
									<Dropdown.Item onClick={()=>{setAnalysisType("All-Time");setSelection(suggestions[index])}}> All-Time</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						</div>)
					)} </ul>)  
				: (<h2 style={{margin:"40px 0 40px 0",color:"black"}}>Too many suggestions to show!</h2>)}

		</div>
	)
}

export default Analysis