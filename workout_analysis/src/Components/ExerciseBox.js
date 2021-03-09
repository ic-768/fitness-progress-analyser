import React from "react"
import StatRow from "./StatRow"
import {AiOutlineClose} from "react-icons/ai"

const ExerciseBox=({exerciseArray, newWorkout, setNewWorkout})=>{ 
	/*Responsible for holding all instances of a specific exercise, e.g. [1 set of 12 reps, 3 sets of 20 reps and 5 weight], etc.
	Each  instance of array will be passed to a StatRow to be interactable*/

	const exerciseName=exerciseArray[0].name

	return(
		<div style={{ marginTop:"80px",display:"flex",flexDirection:"column"}}> 
			<div style={{minWidth:"500px",padding:"36px 58px 36px 58px",boxShadow: ("0px 0px 4px rgba(0, 0, 0, 0.45)"),borderRadius:"5px",
				backgroundColor:"white",marginLeft:"58px",marginRight:"58px"}}>
				<h5>Title</h5>
				<div style={{color:"#FF8933",marginBottom:"15px",display:"flex",alignItems:"center"}}>
					<h3 style={{display:"inline",color:"black"}}>{exerciseName} </h3>
					<button style={{backgroundColor:"#FF8933",marginLeft:"auto",border:"none",borderRadius:"5px"}}onClick={()=>{setNewWorkout(
						newWorkout.map((Array)=>{return exerciseName===Array[0].name 
							? Array.concat({name:exerciseName,reps:1,sets:1,weight:null})  //Append new exercise instance to array
							: Array}))}}>
				Add set
					</button>
				</div>
				{exerciseArray.map((exercise,i)=>( 
					<div style={{display:"flex"}}key={`${exercise}${i}`}> {/* if multiple sets of exercise, allow removal*/}
						<StatRow exercise={exercise} setExercise={(exercise)=>{ 
							setNewWorkout(
								newWorkout.map((Array)=>{return exerciseName===Array[0].name  //Find correct array
									? exerciseArray.map((item,index)=>{ // if correct array, find correct exercise index
										if (i===index) {
											return exercise // set equal to current Exercise ( passed as func parameter )
										}
										return item // keep all else the same
									}) 
									: Array})) //irrelevant array, keep same
						}} />
						{exerciseArray.length>1 &&  
						<AiOutlineClose onClick={()=>{setNewWorkout(newWorkout.map((item)=>( 
							exerciseName === item[0].name 
								? exerciseArray.filter((item,index)=>(index!=i)) // remove by index
								: item
						) 
						))}} />
						}

					</div>
				))} 
			</div>
		</div>
	)} 
export default ExerciseBox
