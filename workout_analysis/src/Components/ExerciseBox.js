import React from "react"
import StatRow from "./StatRow"


//Goal is to update newWorkout. Go to index, and set array to updated exerciseArray
const ExerciseBox=({exerciseArray, newWorkout, setNewWorkout})=>{ 
	const exerciseName=exerciseArray[0].name
	console.log(newWorkout)

	return(
		<div style={{marginBottom:"160px",width:"auto",height:"282px",boxShadow: ("0px 0px 4px rgba(0, 0, 0, 0.45)"),borderRadius:"5px",backgroundColor:"white" ,display:"flex",flexDirection:"column"}}> 
			<div style={{marginTop:"44px",marginLeft:"58px",marginRight:"58px"}}>
				<h5>Title</h5>
				<h3 style={{display:"inline",color:"black"}}>{exerciseName} </h3>
				<button onClick={()=>{setNewWorkout(newWorkout.map((Array)=>{return exerciseName===Array[0].name ? Array.concat({name:exerciseName,reps:1,sets:1,weight:null}) : Array}))}}>
				Add set</button>
				{exerciseArray.map((exercise,i)=>(
					<StatRow key={`${exercise}${i}`}exercise={exercise} setExercise={(exercise)=>{ 
						setNewWorkout( 
							newWorkout.map((Array)=>{return exerciseName===Array[0].name  //sift through arrays
								? exerciseArray.map((item,index)=>{ // if correct array, find correct exercise index
									if (i===index) {
										return exercise // set index value equal to parameter of setExercise
									}
									return item // keep all else the same
								})
								
								: Array})) //otherwise keep array
							
					}} />

				))}

			</div>
		</div>
	)} 


	
export default ExerciseBox
