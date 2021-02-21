import React,{useState} from "react"
import {useHistory} from "react-router-dom"

import ExerciseCounter from "../Components/ExerciseCounter"
import exerciseService from "../Services/exercises"

const ExerciseSubmission=({daysExercises})=>{ 
	const myObj={}
	daysExercises.map((exercise)=>{ //IS AND SHOULD BE OBJ THAT CONTAINS OBJ
		myObj[exercise]=undefined
	})
	const [newWorkout, setNewWorkout]=useState(myObj)
	const history=useHistory()


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
