import React,{useEffect,useState} from "react"
import {useHistory} from "react-router-dom"
import {BsFillTrashFill} from "react-icons/bs"
import {CSSTransition}  from "react-transition-group"

import exerciseService from "../Services/exercises" 
import ExerciseBox from "./ExerciseBox" 
import MenuCard from "./MenuCard"

const ExerciseSubmission=({setNotification,setWorkouts, daysExercises})=>{ 
	const history=useHistory()

	if (!daysExercises){
		//TODO allow voluntary exercises
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

		const validatedExercises=exercisesForSubmission.filter((exercise)=>( //validate exercises here
			exercise.sets!=0 && exercise.reps!=0
		))

		if(validatedExercises.length>0){// Non-empty
			const validEntries = newWorkout 
				.filter((_,i) =>  
					validatedExercises[i] && true)
			console.log("trash", exerciseService,setWorkouts,history,validEntries)

			if (validEntries.length>0) { 
				const sentWorkout=await exerciseService.sendWorkout(validatedExercises) //server response to new workout submission 
				if(sentWorkout){
					const userWorkouts = JSON.parse(window.localStorage.getItem("userWorkouts")) //local storage copy of workouts 
					window.localStorage.setItem("userWorkouts",JSON.stringify(userWorkouts.concat(sentWorkout))) //update local storage
					setWorkouts(JSON.parse(window.localStorage.getItem("userWorkouts")))//update state
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
			{uniqueNames.map((uniqueName,i) => (  //selectable box for each unique exercise
				<div className="menuCard__exercise" key={`${uniqueName}${i}`}> 
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
					<div key={i} style={{ zIndex:"0",marginTop:"80px",display:"flex",flexDirection:"column"}}> 
						<CSSTransition timeout={{ enter: 10, exit: 10 }}>
							<ExerciseBox  exerciseArray={exerciseArray} newWorkout={newWorkout} setNewWorkout={setNewWorkout} indexInArray={i}/> 
						</CSSTransition>
					</div>
				)
			}) 
			}
		</div> 
	)
} 

export default ExerciseSubmission
