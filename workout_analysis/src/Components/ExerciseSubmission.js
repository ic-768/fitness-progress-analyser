import React from "react"
import AddExercise from "./AddExercise"
import ExerciseList from "../Components/ExerciseList"

import exerciseService from "../Services/exercises"


const ExerciseSubmission=({AppendedExercises,setAppendedExercises})=>{ 
	const submitWorkout=async (event)=>{
		event.preventDefault()
		const userWorkouts = JSON.parse(window.localStorage.getItem("userWorkouts")) //local storage copy of workouts 
		const sentWorkout=await exerciseService.sendWorkout(AppendedExercises) //server response to new workout submission 

		window.localStorage.setItem("userWorkouts",JSON.stringify(userWorkouts.concat(sentWorkout))) //update local Storage
		setAppendedExercises([]) //reset new workout list
	}

	return(
		<>
			<ExerciseList AppendedExercises={AppendedExercises} setAppendedExercises={setAppendedExercises}/> {/*exercise list*/} 
			<AddExercise AppendedExercises={AppendedExercises} setAppendedExercises= {setAppendedExercises}/> {/*exercise form*/}
			<button onClick={submitWorkout}>Workout Finished</button> 
		</> 
	)

}


export default ExerciseSubmission
