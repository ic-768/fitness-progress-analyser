import React,{useEffect,useState} from "react"
import {useHistory} from "react-router-dom"
import {IoIosArrowBack} from "react-icons/io"
import {BsFillTrashFill} from "react-icons/bs"

import exerciseService from "../Services/exercises" 
import ExerciseBox from "./ExerciseBox" 

const ExerciseSubmission=({setWorkouts, daysExercises})=>{ 
	const history=useHistory()

	if (!daysExercises){
		//TODO allow voluntary exercises
		return(
			<div>
				<h1>
			No exercises for today! Get some rest :) 
				</h1>
				<button onClick={()=>{history.push("/")}}>Home</button>
			</div> 
		)}

	/* Local copy of daysExercises
	to let user remove exercises without messing with higher state*/
	const [uniqueNames,setUniqueNames]=useState([... new Set(daysExercises)])

	const [newWorkout, setNewWorkout]=useState([]) 
	const [removedExercises, setRemovedExercises]=useState([]) // Keep track of removed exercises
	const [selectedExercise, setSelectedExercise]=useState(null) // to filter which exercises are shown for editing 

	useEffect(()=>{
		setNewWorkout( daysExercises.map((exerciseName)=>( [{name:exerciseName,reps:1,sets:1}]))) 
	},[daysExercises])

	const submitWorkout=async ()=>{ 
		const exercisesForSubmission=[]
		newWorkout.forEach((exerciseArray)=> //retrieve nested exercises
		{exerciseArray.forEach((exercise)=>{exercisesForSubmission.push(exercise)}) 
		})

		if(exercisesForSubmission.length>0){// Non-empty
			const validEntries = newWorkout 
				.filter((_,i) =>  
					exercisesForSubmission[i] && true)

			if (validEntries.length>0) { 
				const sentWorkout=await exerciseService.sendWorkout(exercisesForSubmission) //server response to new workout submission 
				const userWorkouts = JSON.parse(window.localStorage.getItem("userWorkouts")) //local storage copy of workouts 
				window.localStorage.setItem("userWorkouts",JSON.stringify(userWorkouts.concat(sentWorkout))) //update local storage
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
	
	return ( 
		<div style={{display:"flex", height:"100%"
		}}>
			<div style={{borderRadius:"5px",marginTop:"80px",marginBottom:"57px",padding:"40px",backgroundColor:"white",display:"flex",flexDirection:"column"}}>
				<h1> <IoIosArrowBack style={{cursor:"pointer"}} onClick={()=>{history.push("/") }}/> Today&apos;s Exercises</h1>
				{
					uniqueNames.map((uniqueName,i) => (  //selectable box for each unique exercise
						<div onClick={()=>{setSelectedExercise(uniqueName)}}
							style={{ cursor:"pointer",height:"36px",display:"flex",alignItems:"center", justifyContent:"center",
								margin:"5px",borderRadius:"5px",boxShadow:"0px 0px 4px rgba(0, 0, 0, 0.45)"}}
							key={`${uniqueName}${i}`}> 
							<p style={{margin:0,}}>{uniqueName}</p>
							<BsFillTrashFill style={{marginLeft:"20px"}} onClick={()=>{ // remove an exercise
								setRemovedExercises(removedExercises.concat(uniqueName))
								setNewWorkout(newWorkout.filter((exerciseArray)=>(exerciseArray[0].name!==uniqueName))) 
								setUniqueNames(uniqueNames.filter((name)=>(uniqueName!==name)))}}/> 
						</div>
					))
				}
				<button style={{marginTop:"auto",}}onClick={()=>submitWorkout(newWorkout)}>submit!</button> 
			</div>
			{removedExercises.map((exercise)=>( //bring back a removed exercise
				<div onClick={()=>{
					setRemovedExercises(removedExercises.filter((name)=>(name!=exercise)))
					setNewWorkout(newWorkout.concat([[{name:exercise,reps:1,sets:1,weight:null}]]))
					setUniqueNames(uniqueNames.concat((exercise)))}} 
				key={exercise}>{ exercise }</div>
			))
			}

			{newWorkout.map((exerciseArray,i)=>{ 
				if (exerciseArray[0].name!==selectedExercise){return}
				return( // render only for selected exercise
					<ExerciseBox key={i} exerciseArray={exerciseArray} newWorkout={newWorkout} setNewWorkout={setNewWorkout} indexInArray={i}/> 
				)
			}) 
			})
			<div> 
			</div>

		</div>
	)
} 

export default ExerciseSubmission
