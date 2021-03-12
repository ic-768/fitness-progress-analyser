import React,{useState, useEffect} from "react" 
import {datedAnalysis,allTimeAnalysis,exerciseNamesFromWorkouts} from "../Functions/workoutFunctions"
import Dropdown from "react-bootstrap/Dropdown"

import AnalysisPlot from "./AnalysisPlot"
import MenuCard from "./MenuCard"

const Analysis=({workouts})=>{
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
		if(analysisType==="Daily"){
			setWeightAnalysis(datedAnalysis(workouts,selection||suggestions[0],"daily","weight"))
			setRepsAnalysis(datedAnalysis(workouts,selection||suggestions[0],"daily","reps"))
		}
		else if(analysisType==="Monthly"){
			setWeightAnalysis(datedAnalysis(workouts,selection||suggestions[0],"daily","weight"))
			setRepsAnalysis(datedAnalysis(workouts,selection||suggestions[0],"monthly","reps"))
		} 
		else{
			setWeightAnalysis(allTimeAnalysis(workouts,selection||suggestions[0],"weight"))
			setRepsAnalysis(allTimeAnalysis(workouts,selection||suggestions[0],"reps"))
		}

	},[selection, analysisType])
	
	if (workouts.length===0) return (
		<div style={{display:"flex", height:"100%"}}>
			<MenuCard header={"Performance Analysis"} body={()=>(null)}/>

			<div style={{  marginTop:"80px",display:"flex",flexDirection:"column"}}> 
				<div style={{marginBottom:"57px",overflowY:"auto",minWidth:"500px",padding:"0px 58px 36px 58px",boxShadow: ("0px 0px 4px rgba(0, 0, 0, 0.45)"),borderRadius:"5px",
					backgroundColor:"white",marginLeft:"58px",marginRight:"58px"}}>
					<h2>It looks like you&apos;s never submitted an exercise!</h2>
					<h4 style={{marginTop:"40px"}}>After you submit one, you can start viewing your progress here, and get various performance stats.</h4>
				</div>
			</div> 

		</div> 
	)

	const body=()=>(
		<>
			<input style={{marginTop:"20px"}} onChange={(event)=>{ //filter suggestions
				setSuggestions(exerciseNameCache.filter((name)=>(
					name.toLowerCase().includes(event.target.value.toLowerCase())
				))) }} placeholder="exercise"> 
			</input> 
			{suggestions.length<5 //if suggestions narrowed down, allow setting the selection for analysis
				? (<ul style={{marginTop:"30px",padding:"0px",display:"flex", 
					flexDirection:"column",
					justifyContent:"center",
					justifyItems:"center", alignContent:"center",
				}}>{suggestions.map((suggestion,index)=> 
						(<div style={{ margin:"0px 5px 0px 10px",display:"flex", flexDirection:"column", alignItems:"center",}}key={index}>
							<h5 style={{color:"black"}}>{suggestion}</h5> 
							<Dropdown style ={{borderRadius:"50px"}} key ={`${index}Button`}>
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
				: (<h6 style={{margin:"40px 0 40px 0",color:"black"}}>Too many suggestions to show!</h6>)} 
		</>
	)

	return(
		<div style={{display:"flex",height:"100%"}}> 
			<MenuCard header={"Analyse"} body={body}/>


			{ repsAnalysis && selection &&  //Right-side card
				<div style={{ marginTop:"80px",display:"flex",flexDirection:"column" }} >
					<div style={{overflowY:"auto",minWidth:"500px",padding:"36px 58px 36px 58px",boxShadow: ("0px 0px 4px rgba(0, 0, 0, 0.45)"),borderRadius:"5px",
						backgroundColor:"white",marginLeft:"58px",marginRight:"58px",marginBottom:"57px"}}>
					
						<h2 >{analysisType}</h2>
						<h2>Total repetitions</h2>
						<AnalysisPlot analysis={repsAnalysis} dataKey="total"/>
						{
							weightAnalysis && ( 
								<>
									<h2>Total weight lifted</h2>
									<AnalysisPlot analysis={weightAnalysis} dataKey="total" />
								</>) 
						}
					</div>
				</div>
			}
		</div>
	)
}

export default Analysis