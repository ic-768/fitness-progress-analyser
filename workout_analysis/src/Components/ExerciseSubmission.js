import React,{useState} from "react"
import {useHistory} from "react-router-dom"

import ExerciseCounter from "../Components/ExerciseCounter"
import exerciseService from "../Services/exercises"


const ExerciseSubmission=({daysExercises})=>{ 
	const [newWorkout, setNewWorkout]=useState({})
	const history=useHistory()

	const submitWorkout=async ()=>{
		const userWorkouts = JSON.parse(window.localStorage.getItem("userWorkouts")) //local storage copy of workouts 
		if (newWorkout){
			const sentWorkout=await exerciseService.sendWorkout(newWorkout) //server response to new workout submission 
			window.localStorage.setItem("userWorkouts",JSON.stringify(userWorkouts.concat(sentWorkout))) //update local Storage
			history.push("/")
		}}


	return ( 
		<>
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
