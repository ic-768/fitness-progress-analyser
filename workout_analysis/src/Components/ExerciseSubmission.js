import React,{useState} from "react"
import {useHistory} from "react-router-dom"

import ExerciseCounter from "../Components/ExerciseCounter"
import exerciseService from "../Services/exercises" 
//import { exerciseNamesFromWorkouts} from "../Functions/workoutFunctions"

const ExerciseSubmission=({setWorkouts,daysExercises})=>{ 
	const history=useHistory()

	//View if no exercises to be done today
	//TODO allow user to voluntarily do a declared exercise based on cached exercise names
	if (!daysExercises){
		/* const exerciseNameCache=exerciseNamesFromWorkouts(workouts)
			.filter((name,index)=>( //keep only 1 instance of each name
				exerciseNamesFromWorkouts(workouts).indexOf(name)===index)) */ 
		return(
			<div>
				<h1>
			No exercises for today! Get some rest you beast :) 
				</h1>
				<button onClick={()=>{history.push("/")}}>Home</button>
			</div> 
		)}

	//Actual submission view
	const myObj={}
	daysExercises.forEach((exercise)=>{
		myObj[exercise]=undefined
	})
	const [newWorkout, setNewWorkout]=useState(myObj)


	const submitWorkout=async ()=>{
		const validEntries = Object.keys(newWorkout) // Non-null entries, and non-empty arrays
			.filter((exercise) =>  
				newWorkout[exercise] != null && 
				newWorkout[exercise].length!=0) 

		if (Object.entries(validEntries).length>0) {
			const sentWorkout=await exerciseService.sendWorkout(newWorkout) //server response to new workout submission 
			const userWorkouts = JSON.parse(window.localStorage.getItem("userWorkouts")) //local storage copy of workouts 
			window.localStorage.setItem("userWorkouts",JSON.stringify(userWorkouts.concat(sentWorkout))) //update local Storage
			setWorkouts(JSON.parse(window.localStorage.getItem("userWorkouts")))//update state
			history.push("/") 
		} 
		else{
			console.log("Couldn't find a single submitted exercise :/")
		}
	} 

	return ( 
		<div style={{display:"flex", 
			flexDirection:"column",
			alignItems:"center"
		}}>
			<h2 style={{marginTop:"30px",marginBottom:"80px"}}>Today&apos;s exercises</h2> 
			<ul style={{display:"flex", flexWrap:"wrap"}}>
				{daysExercises.map((exerciseName,i)=>( 
					<ExerciseCounter key={i} newWorkout={newWorkout} setNewWorkout={setNewWorkout} exerciseName={exerciseName}/>
				))}
			</ul>
			<button onClick={()=>submitWorkout(newWorkout)}>submit!</button>
			<button onClick={()=>{history.push("/")}}>Home</button>
		</div>
	)
} 

export default ExerciseSubmission
