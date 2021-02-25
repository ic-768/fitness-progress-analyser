import React,{useState} from "react"
import {useHistory} from "react-router-dom"

import ExerciseCounter from "../Components/ExerciseCounter"
import exerciseService from "../Services/exercises" 
//import { exerciseNamesFromWorkouts} from "../Functions/workoutFunctions"

const ExerciseSubmission=({daysExercises})=>{ 
	const history=useHistory()
	//const workouts=JSON.parse(localStorage.getItem("userWorkouts"))

	//View if no exercises to be done today
	//TODO allow user to voluntarily do a declared exercise based on cached exercise names
	if (!daysExercises){
		/*
		const exerciseNameCache=exerciseNamesFromWorkouts(workouts)
			.filter((name,index)=>( //keep only 1 instance of each name
				exerciseNamesFromWorkouts(workouts).indexOf(name)===index)
			)
			*/

		return(
			<>
				<h1>
			No exercises for today! Get some rest you beast :) 
				</h1>
				<button onClick={()=>{history.push("/")}}>Home</button>
			</> 
		)}

	//Actual submission view
	const myObj={}
	daysExercises.forEach((exercise)=>{
		myObj[exercise]=undefined
	})
	const [newWorkout, setNewWorkout]=useState(myObj)


	const submitWorkout=async ()=>{ 
		const cleanedWorkout = Object.keys(newWorkout) // remove undefined entries
			.filter((exercise) =>  
				newWorkout[exercise] != null) 
			.reduce((workout, exercise) => ({ ...workout, [exercise]: newWorkout[exercise] }), {})

		if (Object.entries(cleanedWorkout).length>0)
		{//if contains a valid entry
			const sentWorkout=await exerciseService.sendWorkout(newWorkout) //server response to new workout submission 
			const userWorkouts = JSON.parse(window.localStorage.getItem("userWorkouts")) //local storage copy of workouts 
			window.localStorage.setItem("userWorkouts",JSON.stringify(userWorkouts.concat(sentWorkout))) //update local Storage
			history.push("/") 
		} 
		console.log("Couldn't find a single submitted exercise :/")
	} 

	return ( 
		<>
			<h2>Today&apos;s exercises</h2> 
			<ul>
				{daysExercises.map((exerciseName,i)=>( 
					<ExerciseCounter key={i} newWorkout={newWorkout} setNewWorkout={setNewWorkout} exerciseName={exerciseName}/>
				))}
			</ul>
			<button onClick={()=>submitWorkout(newWorkout)}>submit!</button>
			<button onClick={()=>{history.push("/")}}>Home</button>
		</>
	)
}


export default ExerciseSubmission
