import React,{useState} from "react"
import {useHistory} from "react-router-dom"

import ExerciseBox from "../Components/ExerciseBox"
import exerciseService from "../Services/exercises" 
import {setTodaysExercises} from "../Functions/workoutFunctions"

const ExerciseSubmission=({currentRegiment,
	setWorkouts,
	daysExercises,setDaysExercises})=>{ 
	const uniqueNames=[... new Set(daysExercises)]
	const history=useHistory()

	if (!daysExercises){
		return(
			<div>
				<h1>
			No exercises for today! Get some rest you beast :) 
				</h1>
				<button onClick={()=>{history.push("/")}}>Home</button>
			</div> 
		)}

	const [newWorkout, setNewWorkout]=useState([])
	const [removedExercises, setRemovedExercises]=useState([])

	const submitWorkout=async ()=>{
		console.log("newWorkout is",newWorkout)

		if(newWorkout.length>0){
			const validEntries = newWorkout // Non-empty
				.filter((_,i) =>  
					newWorkout[i] && true)

			if (validEntries.length>0) { 
				const sentWorkout=await exerciseService.sendWorkout(newWorkout) //server response to new workout submission 
				const userWorkouts = JSON.parse(window.localStorage.getItem("userWorkouts")) //local storage copy of workouts 
				window.localStorage.setItem("userWorkouts",JSON.stringify(userWorkouts.concat(sentWorkout))) //update local Storage
				setWorkouts(JSON.parse(window.localStorage.getItem("userWorkouts")))//update state
				history.push("/") 
			} 
			else{
				console.log("No valid entries")
			}
		}
		else{
			console.log("Couldn't find a single submitted exercise :/")
		}
			
	} 
	
	//TODO Ensure backend can deal with this, REFACTOR
	return ( 
		<div style={{display:"flex", 
			flexDirection:"column",
			alignItems:"center"
		}}>
			{removedExercises.map((exercise)=>(
				<div onClick={()=>{setRemovedExercises(removedExercises.filter((name)=>(name!=exercise)));setDaysExercises(daysExercises.concat(exercise))}}key={exercise}>{ exercise }</div>
			))
			}

			<h2 style={{marginTop:"30px",marginBottom:"80px"}}>Today&apos;s exercises</h2> 
			<ul style={{display:"flex", flexWrap:"wrap"}}>

				{/*Create area for each exercise*/
					uniqueNames.map((uniqueName) => ( 
						<div key={uniqueName}>
							<button onClick={()=>{setDaysExercises(daysExercises.concat(uniqueName))}}> Add set </button> 
							<button onClick={()=>{setNewWorkout(newWorkout.filter((name)=>(name==uniqueName)));setRemovedExercises(removedExercises.concat(uniqueName));setDaysExercises(daysExercises.filter((name)=>(uniqueName!==name)))}}> Remove </button> 
							{	daysExercises.map((exerciseName,i)=>{ 
								if (exerciseName==uniqueName){ //append all Exercise Boxes to their respective divs
									return( 
										<div key={`${i} ${exerciseName}`}> 
											<ExerciseBox newWorkout={newWorkout} setNewWorkout={setNewWorkout} exerciseName={exerciseName} indexInArray={i}/>
											{/*Submit another instance of same exercise (for different reps)*/} 
										</div>
									)
								}
						
							})}
						</div> 
					))
				}
			</ul>
			<button onClick={()=>{setRemovedExercises([]);setTodaysExercises(currentRegiment,setDaysExercises);setNewWorkout([]) }}> reset </button> {/*Remove extra*/}
			<button onClick={()=>submitWorkout(newWorkout)}>submit!</button>
			<button onClick={()=>{history.push("/")}}>Home</button>
		</div>
	)
} 

export default ExerciseSubmission
