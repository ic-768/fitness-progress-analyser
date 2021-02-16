import React,{useState} from "react"

import ExerciseCounter from "../Components/ExerciseCounter"
//import exerciseService from "../Services/exercises"


const ExerciseSubmission=({daysExercises})=>{ 
	const [newWorkout, setNewWorkout]=useState({})

	//TODO implement workout submission :)
	//
	/*const submitWorkout=async (event)=>{
		event.preventDefault()
		const userWorkouts = JSON.parse(window.localStorage.getItem("userWorkouts")) //local storage copy of workouts 
		const sentWorkout=await exerciseService.sendWorkout(newWorkout) //server response to new workout submission 
		window.localStorage.setItem("userWorkouts",JSON.stringify(userWorkouts.concat(sentWorkout))) //update local Storage
	}
	*/

	return ( 
		<>
			<ul>
				{daysExercises.map((exerciseName,i)=>( 
					<ExerciseCounter key={i} newWorkout={newWorkout} setNewWorkout={setNewWorkout} exerciseName={exerciseName}/>
				))}
			</ul>
			<button onClick={()=>{console.log(newWorkout)}}>submit!</button>
		</>
	)
}


export default ExerciseSubmission
