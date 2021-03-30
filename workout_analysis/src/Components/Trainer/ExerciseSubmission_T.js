import React,{useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {BsFillTrashFill} from "react-icons/bs"

import exerciseService from "../../Services/exercises" 
import ExerciseBox from "../ExerciseBox" 
import MenuCard from "../MenuCard"
import Dropdown from "react-bootstrap/Dropdown"
import {getTodaysExercises } from "../../Functions/workoutFunctions"

const TrainerExerciseSubmission=({clients, setClients, setNotification})=>{ 
/*Trainer can submit workouts on behalf of a client */
	const history=useHistory()
	
	const [uniqueNames,setUniqueNames]=useState([]) 
	const [selectedClient, setSelectedClient] = useState(null)
	const [newWorkout, setNewWorkout]=useState([]) 
	const [removedExercises, setRemovedExercises]=useState([]) // Keep track of removed exercises
	const [selectedExercise, setSelectedExercise]=useState(null) // to filter which exercises are shown for editing 

	useEffect(()=>{
		if(selectedClient){
			const unique=getTodaysExercises(selectedClient.currentRegiment)  //todays exercises
			if(unique){ //has exercises for today
				setUniqueNames(unique)
				setNewWorkout(unique.map((exerciseName)=>(   [{name:exerciseName,reps:1,sets:1}] ) ))
			}
		}},[selectedClient])

	const submitWorkout=async ()=>{ 
		const exercisesForSubmission=[]
		newWorkout.forEach((exerciseArray)=> //retrieve nested exercises
		{exerciseArray.forEach((exercise)=>{exercisesForSubmission.push(exercise)}) 
		})

		const validatedExercises=exercisesForSubmission.filter((exercise)=>( //validate exercises
			exercise.sets!=0 && exercise.reps!=0
		))

		if(validatedExercises.length>0){// Non-empty
			const validEntries = newWorkout 
				.filter((_,i) =>  
					validatedExercises[i] && true) 

			if (validEntries.length>0) {  
				const sentWorkout=await exerciseService.sendWorkout({exercises:validatedExercises,_id:selectedClient._id}) 
				if(sentWorkout){
					const updatedClient={...selectedClient,days:selectedClient.days.concat(sentWorkout)}
					const updatedClients=clients.filter((client)=>client._id!==selectedClient._id).concat(updatedClient)
					setClients(updatedClients)
					setNotification({color:"white",message:"Workout uploaded successfully"}) 
					history.push("/") 

				}
				else{
					setNotification({color:"red",message:"Something went wrong :("}) 
				}
			} 
			
			else{
				console.log("No valid entries") //Data mangled-Shouldn't happen in production.
			}
		}
		else{
			setNotification({color:"red",message:"Looks like you haven't submitted any exercises!"}) 
		} 
	} 
	const body=()=>(
		<>
			<Dropdown style={{marginBottom:"20px"}}>
				<Dropdown.Toggle>
					{selectedClient && selectedClient.username || "Select a client"} 
				</Dropdown.Toggle>
				<Dropdown.Menu>
					{clients && clients.map((client)=>( 
						<Dropdown.Item key={client.username} onClick={()=>{setSelectedClient(client)
						}}> {client.username}</Dropdown.Item>
					))}
				</Dropdown.Menu>
			</Dropdown> 

			{uniqueNames &&

<>
	{uniqueNames.map((uniqueName,i) => (  //selectable box for each unique exercise
		<div className="menuItem__removable" key={`${uniqueName}${i}`}>  
			<a className="menuItem__text" onClick={()=>{setSelectedExercise(uniqueName)}}>{uniqueName}</a>
			<a style={{cursor:"pointer"}}
				onClick={()=>{
					setRemovedExercises(removedExercises.concat(uniqueName))
					setNewWorkout(newWorkout.filter((exerciseArray)=>(exerciseArray[0].name!==uniqueName))) 
					setUniqueNames(uniqueNames.filter((name)=>(uniqueName!==name)))
				}}>
				<BsFillTrashFill style={{marginLeft:"auto",marginRight:"15px"}}/>
			</a>
		</div>
	))}
</>
			}

			{ removedExercises.length>0 && 
				<h5 style={{marginTop:"auto",textAlign:"center"}}>Removed</h5> }
			{ removedExercises.map((exercise)=>{ //bring back a removed exercise
				return(
					<div className="menuCard__exercise--removed" key={exercise}> 
						<a key={exercise} className="menuItem__text"
							onClick={()=>{
								setRemovedExercises(removedExercises.filter((name)=>(name!=exercise)))
								setNewWorkout(newWorkout.concat([[{name:exercise,reps:1,sets:1,weight:null}]]))
								setUniqueNames(uniqueNames.concat((exercise)))}} 
						>
							{exercise}
						</a>
					</div>
				)})
			}
			<button style={{borderRadius:"5px",marginTop:"auto",}}onClick={()=>
				submitWorkout(newWorkout)}>Submit</button> 
		</> 
	)
	
	return ( 
		<div className="pageContainer">
			<MenuCard header={"Exercises"} body={body}/> 

			{newWorkout.map((exerciseArray,i)=>{ 
				if (exerciseArray[0].name!==selectedExercise){return} //render only for selected exercise
				return( 
					<div key={i} style={{ zIndex:"0",marginTop:"80px",display:"flex",flexDirection:"column"}}>   {/*TODO make css class - shared with routinePage */}
						<ExerciseBox  exerciseArray={exerciseArray} newWorkout={newWorkout} setNewWorkout={setNewWorkout} indexInArray={i}/> 
					</div>
				)
			}) 
			}
		</div> 
	)
} 

export default TrainerExerciseSubmission 