import React,{useState, useEffect} from "react" 
import {datedAnalysis,allTimeAnalysis,exerciseNamesFromWorkouts} from "../Functions/workoutFunctions"
import Dropdown from "react-bootstrap/Dropdown"

import AnalysisPlot from "./AnalysisPlot"
import MenuCard from "./MenuCard"

const AthleteAnalysis=({workouts})=>{
	const exerciseNameCache=exerciseNamesFromWorkouts(workouts)
		.filter((name,index)=>( //keep only 1 instance of each name
			exerciseNamesFromWorkouts(workouts).indexOf(name)===index))
	/*indexOf returns index of first matching element
			if repetition of element in array, it will not equal the index of the first
			element, thus being discarded */
		
	const [suggestions,setSuggestions]=useState([]) 
	const [selection,setSelection]=useState(null)  //Selection to be analysed
	const [analysisType,setAnalysisType]=useState(null)  //Daily/Monthly/All-Time

	const [repsAnalysis,setRepsAnalysis]=useState(null)  //Data from analysis
	const [weightAnalysis,setWeightAnalysis]=useState(null)  //Data from analysis

	useEffect(()=>{
		switch(analysisType){
		case "Daily": 
			setWeightAnalysis(datedAnalysis(workouts,selection||suggestions[0],"daily","weight"))
			setRepsAnalysis(datedAnalysis(workouts,selection||suggestions[0],"daily","reps"))
			break
		case "Monthly": 
			setWeightAnalysis(datedAnalysis(workouts,selection||suggestions[0],"monthly","weight"))
			setRepsAnalysis(datedAnalysis(workouts,selection||suggestions[0],"monthly","reps"))
			break
		default: 
			setWeightAnalysis(allTimeAnalysis(workouts,selection||suggestions[0],"weight"))
			setRepsAnalysis(allTimeAnalysis(workouts,selection||suggestions[0],"reps"))
			break
		}
	},[selection, analysisType])
	
	if (workouts.length===0) return (
		<div className="pageContainer">
			<MenuCard header={"Performance Analysis"} body={()=>(null)}/> 
			<div className="resultPage analysis">
				<h2>It looks like you&apos;s never submitted an exercise!</h2>
				<h4 style={{marginTop:"40px"}}>After you submit one, you can start viewing your progress here, and get various performance stats.</h4>
			</div>
		</div> 
	)

	const body=()=>(
		<>
			<input placeholder="exercise" onChange={(event)=>{ //filter suggestions
				setSuggestions(exerciseNameCache.filter((name)=>(
					name.toLowerCase().includes(event.target.value.toLowerCase()))))
			}}/> 
			{suggestions.length<5 //if suggestions narrowed down, allow setting the selection for analysis
				? (<ul className="analysis__list">{suggestions.map((suggestion,index)=> 
					(<div className="analysis__result" key={index}>
						<h5>{suggestion}</h5> 
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
				: (<h6>Too many suggestions to show!</h6>)} 
		</>
	) 
	return(
		<div className="pageContainer"> 
			<MenuCard header={"Analyse"} body={body}/>  {/*TODO Change from MenuCard to resultPage*/}
			{ repsAnalysis && selection &&  //Right-side card
					<div className="resultPage analysis"> 
						<h2 >{analysisType}</h2>
						<h2>Total repetitions</h2>
						<AnalysisPlot analysis={repsAnalysis} dataKey="total"/>
						{ weightAnalysis && ( 
							<>
								<h2>Total weight lifted</h2>
								<AnalysisPlot analysis={weightAnalysis} dataKey="total" />
							</> )}
					</div>
			}
		</div>
	)
}

export default AthleteAnalysis