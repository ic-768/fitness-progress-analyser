import React,{useEffect,useState} from "react"
import {useHistory} from "react-router-dom"
import {BsFillTrashFill} from "react-icons/bs"

import exerciseService from "../../Services/exercises" 
import ExerciseBox from "../ExerciseBox" 
import MenuCard from "../MenuCard" 
import {getInvalidExercises } from "../../Functions/workoutFunctions"

const AthleteExerciseSubmission=({setNotification,setWorkouts, daysExercises})=>{ 
	/*allows user to select from today's scheduled exercises and submit his workout */
	const history=useHistory()
	if (!daysExercises){
		return(
			<div className="pageContainer">
				<MenuCard header={"My Exercises"} body={()=>(<p>No exercises for today :)</p>)} />
			</div> 
		)}

	/* Local copy of daysExercises
	to let user remove exercises without messing with outter state*/
	const [uniqueNames,setUniqueNames]=useState([])

	const [newWorkout, setNewWorkout]=useState([]) 
	const [removedExercises, setRemovedExercises]=useState([]) // Keep track of removed exercises
	const [selectedExercise, setSelectedExercise]=useState(null) // to filter which exercises are shown for editing 
	const [invalidArray,setInvalidArray]=useState([]) 
	//On submission, if an exercise is invalid, its name will be stored, to set backgroundcolor of menuItem to red 

	useEffect(()=>{
		setNewWorkout( daysExercises.map((exerciseName)=>( [{name:exerciseName,reps:1,sets:1}]))) 
		setUniqueNames([... new Set(daysExercises)]) 
	}
	,[daysExercises])

	useEffect(()=>{
		setUniqueNames([... new Set(daysExercises)]) 
	},[])

	const submitWorkout=async ()=>{  
		const exercisesForSubmission=[]
		newWorkout.forEach((exerciseArray)=> //retrieve nested exercises
		{exerciseArray.forEach((exercise)=>{exercisesForSubmission.push(exercise)}) 
		})

		const invalidExercises=getInvalidExercises(exercisesForSubmission)
		if (invalidExercises.length>0){
			setInvalidArray(invalidExercises) //set state so that invalid items get colored
			setNotification({color:"red",message:"An exercise hasn't been filled out :( please fill it out or remove it"})
		}

		else{ //no invalid Entries
			if (exercisesForSubmission.length>0) {   //exercises actually exist
				const sentWorkout=await exerciseService.sendWorkout({exercises:exercisesForSubmission}) //server response to new workout submission 
				if(sentWorkout){
					const userWorkouts = JSON.parse(window.localStorage.getItem("userWorkouts")) //local storage copy of workouts 
					window.localStorage.setItem("userWorkouts",JSON.stringify(userWorkouts.concat(sentWorkout))) //update local storage
					setWorkouts(JSON.parse(window.localStorage.getItem("userWorkouts")))//update state
					setNotification({color:"white",message:"Workout uploaded successfully"})
					history.push("/") 
				}
				else{ //server response not valid
					setNotification({color:"red",message:"Something went wrong :("}) 
				}
			} 
			else{ //no valid exercises
				setNotification({color:"red",message:"Looks like you haven't submitted any exercises!"}) 
			} 
		}
	} 
	const body=()=>(
		<>
			{uniqueNames.map((uniqueName,i) => (  //selectable box for each unique exercise 
				<div className="menuItem__removable" style={{
					backgroundColor:invalidArray.includes(uniqueName) // if submission attempted, and exercise has an empty field, set to pink
						? "pink"
						: "white"
				} } key={`${uniqueName}${i}`}>  
					<a className="menuItem__text" onClick={()=>{setSelectedExercise(uniqueName)}}>{uniqueName}</a>
					<a style={{cursor:"pointer"}}
						onClick={()=>{
							setRemovedExercises(removedExercises.concat(uniqueName))
							setInvalidArray(invalidArray.filter((exercise)=>exercise!=uniqueName)) //remove from invalid array
							setNewWorkout(newWorkout.filter((exerciseArray)=>(exerciseArray[0].name!==uniqueName))) 
							setUniqueNames(uniqueNames.filter((name)=>(uniqueName!==name)))
						}}>
						<BsFillTrashFill style={{marginLeft:"auto",marginRight:"15px"}}/>
					</a>
				</div>
			))}

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
			<MenuCard header={"My Exercises"} body={body}/> 

			{newWorkout.map((exerciseArray,i)=>{ 
				if (exerciseArray[0].name!==selectedExercise){return} //render only for selected exercise
				return( 
					<div key={i} style={{ zIndex:"0",marginTop:"80px",display:"flex",flexDirection:"column"}}>   {/*TODO shared with routinePage */}
						<ExerciseBox  exerciseArray={exerciseArray} newWorkout={newWorkout} setNewWorkout={setNewWorkout} indexInArray={i}/> 
					</div>
				)
			}) 
			}
		</div> 
	)
} 

export default AthleteExerciseSubmission
