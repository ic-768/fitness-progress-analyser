import React,{useEffect,useState} from "react"
import {useHistory} from "react-router-dom"
import {IoIosArrowBack} from "react-icons/io"
import {BsFillTrashFill} from "react-icons/bs"
import {GoPlusSmall} from "react-icons/go"

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
	const [uniqueNames,setUniqueNames]=useState([])

	const [newWorkout, setNewWorkout]=useState([]) 
	const [removedExercises, setRemovedExercises]=useState([]) // Keep track of removed exercises
	const [selectedExercise, setSelectedExercise]=useState(null) // to filter which exercises are shown for editing 
	console.log(newWorkout)

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
		<div style={{display:"flex", height:"100%"}}>
			<div style={{borderRadius:"5px",marginBottom:"57px",marginLeft:"20px",marginTop:"80px",padding:"40px",backgroundColor:"white",display:"flex",flexDirection:"column"}}>
				<h1 style={{marginBottom:"57px"}}> <IoIosArrowBack style={{cursor:"pointer"}} onClick={()=>{history.push("/") }}/> My Exercises
					<GoPlusSmall style={{paddingTop:"2px",color:"white",borderRadius:"50%",backgroundColor:"#ff8933",marginLeft:"20px"}}/>
				
				</h1>
				{
					uniqueNames.map((uniqueName,i) => (  //selectable box for each unique exercise
						<div style={{height:"36px",display:"flex",alignItems:"center", justifyContent:"center",
							margin:"5px",borderRadius:"5px",boxShadow:"0px 0px 4px rgba(0, 0, 0, 0.45)"}}
						key={`${uniqueName}${i}`}> 
							<p onClick={()=>{setSelectedExercise(uniqueName)}} style={{width:"100%",cursor:"pointer",margin:0,marginLeft:"5px",marginRight:"20px",}}>{uniqueName}</p>
							<p style={{cursor:"pointer",padding:"5px",margin:0,}}
								onClick={()=>{
									setRemovedExercises(removedExercises.concat(uniqueName))
									setNewWorkout(newWorkout.filter((exerciseArray)=>(exerciseArray[0].name!==uniqueName))) 
									setUniqueNames(uniqueNames.filter((name)=>(uniqueName!==name)))
								}}>
								<BsFillTrashFill style={{marginLeft:"auto",marginRight:"15px"}} onClick={()=>{ // remove an exercise
								}}/>
							</p>
						</div>
					))
				}

				{removedExercises.length>0 && 
				<h5 style={{marginTop:"auto",textAlign:"center"}}>Removed</h5>
				}
				{removedExercises.map((exercise)=>{ //bring back a removed exercise
					return(
						<div style={{cursor:"pointer",height:"36px",display:"flex",alignItems:"center", justifyContent:"center",
							borderRadius:"5px",boxShadow:"0px 0px 4px rgba(0, 0, 0, 0.45)"}}
						onClick={()=>{
							setRemovedExercises(removedExercises.filter((name)=>(name!=exercise)))
							setNewWorkout(newWorkout.concat([[{name:exercise,reps:1,sets:1,weight:null}]]))
							setUniqueNames(uniqueNames.concat((exercise)))}} 
						key={exercise}>
							{exercise}
						</div>
					)})
				}
				<button style={{borderRadius:"5px",border:"none",marginTop:"auto",}}onClick={()=>
					submitWorkout(newWorkout)}>Submit</button> 
			</div>

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
