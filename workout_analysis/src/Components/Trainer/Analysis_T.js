import React,{useState, useEffect} from "react" 
import {datedAnalysis,allTimeAnalysis,exerciseNamesFromWorkouts} from "../../Functions/workoutFunctions"
import Dropdown from "react-bootstrap/Dropdown"
import DropdownClient from "./DropdownClient"
import { BsSearch } from "react-icons/bs"

import AnalysisPlot from "../AnalysisPlot"
import MenuCard from "../MenuCard"

const TrainerAnalysis=({clients})=>{
	/*For trainer to select any client, and view their workout progress */

	const [exerciseNameCache,setExerciseNameCache] = useState(null) 
	const [selectedClient,setSelectedClient]=useState() //workouts will depend on selectedClient

	const [searchQuery,setSearchQuery]=useState("") 
	const [suggestions,setSuggestions]=useState([]) 
	const [selection,setSelection]=useState(null)  //Selection to be analysed

	const [analysisType,setAnalysisType]=useState(null)  //Daily/Monthly/All-Time

	const [repsAnalysis,setRepsAnalysis]=useState(null)  //Data from analysis
	const [weightAnalysis,setWeightAnalysis]=useState(null)  //Data from analysis

	/*indexOf returns index of first matching element
			if repetition of element in array, it will not equal the index of the first
			element, thus being discarded */
		
	useEffect(()=>{ 
		selectedClient &&
		setExerciseNameCache(selectedClient.days && exerciseNamesFromWorkouts(selectedClient.days)
			.filter((name,index)=>( //keep only 1 instance of each name
				exerciseNamesFromWorkouts(selectedClient.days).indexOf(name)===index)))
	},[selectedClient]) //when client changes, update selection ( if username has an exercise of the same name)

	useEffect(()=>{
		exerciseNameCache && searchQuery && 
		setSuggestions(exerciseNameCache.filter((name)=>(
			name.toLowerCase().includes(searchQuery.toLowerCase())))) 
	},[exerciseNameCache,searchQuery,])

	useEffect(()=>{
		if (selectedClient){
			switch(analysisType){
			case "Daily": 
				setWeightAnalysis(datedAnalysis(selectedClient.days,selection||suggestions[0],"daily","weight"))
				setRepsAnalysis(datedAnalysis(selectedClient.days,selection||suggestions[0],"daily","reps"))
				break
			case "Monthly": 
				setWeightAnalysis(datedAnalysis(selectedClient.days,selection||suggestions[0],"monthly","weight"))
				setRepsAnalysis(datedAnalysis(selectedClient.days,selection||suggestions[0],"monthly","reps"))
				break
			default: 
				setWeightAnalysis(allTimeAnalysis(selectedClient.days,selection||suggestions[0],"weight"))
				setRepsAnalysis(allTimeAnalysis(selectedClient.days,selection||suggestions[0],"reps"))
				break
			}}
	},[selectedClient,selection, analysisType])
	
	const body=()=>(
		<>
			<DropdownClient clients={clients} selectedClient={selectedClient}  setSelectedClient={setSelectedClient}/> 
			<div>
				<BsSearch style={{marginRight:"5px"}} />
				<input className="search" placeholder="Exercise to analyse" 
					value={searchQuery}
					onChange={(event)=>{ //filter suggestions
						setSearchQuery(event.target.value)
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
			<MenuCard header={()=>"Analysis"} body={body}/>
			{ repsAnalysis && selection &&  //Right-side card
					<div className="resultPage analysis"> 
						<h1 style={{marginBottom:"20px"}}>{analysisType}</h1>
						{ weightAnalysis && ( 
							<>
								<h2>Total weight lifted</h2>
								<AnalysisPlot analysis={weightAnalysis} dataKey="total" />
							</> )}
						<h2>Total repetitions</h2>
						<AnalysisPlot analysis={repsAnalysis} dataKey="total"/>
					</div>
			}
		</div>
	)
}

export default TrainerAnalysis