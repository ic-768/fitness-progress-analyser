import React,{useState, useEffect} from "react" 
import {datedAnalysis,allTimeAnalysis,exerciseNamesFromWorkouts} from "../../Functions/workoutFunctions"
import Dropdown from "react-bootstrap/Dropdown"
import { BsSearch } from "react-icons/bs"

import AnalysisPlot from "../AnalysisPlot"
import MenuCard from "../MenuCard"

const AthleteAnalysis=({workouts})=>{
	/*Allow athlete to view progress analysis based on time-interval, repetitions, and weight */

	const exerciseNameCache=workouts && exerciseNamesFromWorkouts(workouts) //array of unique exerciseNames
		
	const [suggestions,setSuggestions]=useState([]) 
	const [selection,setSelection]=useState(null)  //Selection to be analysed
	const [analysisType,setAnalysisType]=useState(null)  //Daily/Monthly/All-Time

	const [repsAnalysis,setRepsAnalysis]=useState(null)  //Data from analysis
	const [weightAnalysis,setWeightAnalysis]=useState(null)  //Data from analysis

	useEffect(()=>{
		if(workouts){
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
		}
	},[selection, analysisType])
	
	if (workouts && workouts.length===0) return (
		<div className="pageContainer">
			<MenuCard header={()=>"Analysis"} body={()=>( 
				<div>
						It looks like you&apos;s never submitted an exercise!
				</div> 
			)}/> 
		</div> 
	)

	const body=()=>(
		<>
			<div>
				<BsSearch style={{marginRight:"5px"}} />
				<input className="search" placeholder="Exercise to analyse" onChange={(event)=>{ //filter suggestions
					setSuggestions(exerciseNameCache.filter((name)=>(
						name.toLowerCase().includes(event.target.value.toLowerCase()))))
				}}/> 
			</div>
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
			<MenuCard header={()=>"Analyse"} body={body}/>  
			{ repsAnalysis && selection &&  //Right-side card
					<div className="resultPage analysis"> 
						<h2 style={{marginBottom:"20px"}}>{analysisType}</h2>
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