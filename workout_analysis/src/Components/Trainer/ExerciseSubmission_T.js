import React,{useEffect, useState} from "react"
import {useHistory} from "react-router-dom"
import {BsFillTrashFill} from "react-icons/bs"

import exerciseService from "../../Services/exercises" 
import ExerciseBox from "../ExerciseBox" 
import MenuCard from "../MenuCard"
import DropdownClient from "./DropdownClient"
import {getTodaysExercises,getInvalidExercises } from "../../Functions/workoutFunctions"

const TrainerExerciseSubmission=({clients, setClients, setNotification})=>{ 
/*Trainer can submit workouts on behalf of a client */
	const history=useHistory()
	
	const [uniqueNames,setUniqueNames]=useState([])  //to store name of each exercise
	const [newWorkout, setNewWorkout]=useState([]) 
	const [removedExercises, setRemovedExercises]=useState([]) // Keep track of removed exercises
	const [selectedExercise, setSelectedExercise]=useState(null) // to filter which exercises are shown for editing 
	const [selectedClient, setSelectedClient] = useState(null)
	const [invalidArray, setInvalidArray]=useState([]) 
	//On submission, if an exercise is invalid, its name will be stored, to set backgroundcolor of menuItem to red 

	useEffect(()=>{
		setInvalidArray([])
		if(selectedClient){
			const unique=getTodaysExercises(selectedClient.currentRegiment)  //todays exercises
			if(unique){ //has exercises for today
				setUniqueNames(unique)
				setNewWorkout(unique.map((exerciseName)=>(   [{name:exerciseName,reps:null,sets:null}] ) ))
			}
		}},[selectedClient])

	const submitWorkout=async ()=>{  
		const exercisesForSubmission=[]
		newWorkout.forEach((exerciseArray)=> //retrieve nested exercises
		{exerciseArray.forEach((exercise)=>{exercisesForSubmission.push(exercise)}) 
		})

		const invalidExercises=getInvalidExercises(exercisesForSubmission)
		if (invalidExercises.length>0){ //no invalid entries
			setInvalidArray(invalidExercises) //set state so that invalid items get colored
			setNotification({color:"red",message:"An exercise hasn't been filled out :( please fill it out or remove it"})
		}

		else{ // no invalid entries 
			if (exercisesForSubmission.length>0) {  
				const sentWorkout=await exerciseService.sendWorkout({exercises:exercisesForSubmission,_id:selectedClient._id}) 
				if(sentWorkout){
					const updatedClient={...selectedClient,days:selectedClient.days.concat(sentWorkout)}
					const updatedClients=clients.filter((client)=>client._id!==selectedClient._id).concat(updatedClient)
					window.localStorage.setItem("clients",JSON.stringify(updatedClients)) //update local storage
					setClients(updatedClients)
					setNotification({color:"white",message:"Workout uploaded successfully"}) 
					history.push("/") 
				}
				else{
					setNotification({color:"red",message:"Something went wrong :("}) 
				}
			} 
			else{
				setNotification({color:"red",message:"Looks like you haven't submitted any exercises!"}) 
			} 
		} 
	}
	const body=()=>( //body for menuCard
		<> 
			<DropdownClient clients={clients} selectedClient={selectedClient} setSelectedClient={setSelectedClient}/>
			{uniqueNames &&  //if exercises
<>
	{uniqueNames.map((uniqueName,i) => (  //selectable box for each unique exercise
		<div className="menuItem__removable" style={{
			backgroundColor:invalidArray.includes(uniqueName) // if submission attempted, and exercise has an empty field, set to pink
				? "pink"
				: "white" 
		}}
		key={`${uniqueName}${i}`}>  
			<a className="menuItem__text" onClick={()=>{setSelectedExercise(uniqueName)}}>{uniqueName}</a>
			<a style={{cursor:"pointer"}}
				onClick={()=>{
					setInvalidArray(invalidArray.filter((exercise)=>uniqueName!==exercise))
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
								setNewWorkout(newWorkout.concat([[{name:exercise,reps:null,sets:null,weight:null}]]))
								setUniqueNames(uniqueNames.concat((exercise)))}} 
						>
							{exercise}
						</a>
					</div>
				)})
			}
			<button className="themed--2" style={{marginTop:"auto",}}onClick={()=>
				submitWorkout(newWorkout)}>Submit</button> 
		</> 
	)
	
	return ( 
		<div className="pageContainer">
			<MenuCard header={()=>"Exercises"} body={body}/> 

			{newWorkout.map((exerciseArray,i)=>{ 
				if (exerciseArray[0].name!==selectedExercise){return} //render only for selected exercise
				return( 
					<div key={i} className="exerciseContainer" > 
						<ExerciseBox  exerciseArray={exerciseArray} newWorkout={newWorkout} setNewWorkout={setNewWorkout} indexInArray={i}/> 
					</div>
				)
			}) 
			}
		</div> 
	)
} 

export default TrainerExerciseSubmission 