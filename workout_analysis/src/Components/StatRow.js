import React from "react"
const StatRow=({exercise,setExercise})=>{
	/*Takes individual exercise instances and renders interactable rows of data*/
	const weightColor = exercise.weight ? "#FF8933" : "gray"

	return(
		<div style={{marginTop:"50px",display:"flex"}}> 
			<button style={{border:"none",borderRadius:"5px",color:weightColor}} onClick={()=>{setExercise({...exercise, weight:
							exercise.weight ? null : 1}) }}>KG</button> {/*Toggle weighted*/}
			<div style={{display:"inline"}} > 
				<h3>reps</h3> 
				<input style={{textAlign:"center"}} onChange={(event)=>{
					setExercise({...exercise, ["reps"]:event.target.value})}}value = {exercise["reps"]}/> 
			</div>
			<div style={{display:"inline"}}> 
				<h3>sets</h3> 
				<input style={{textAlign:"center"}} onChange={(event)=>{
					setExercise({...exercise, ["sets"]:event.target.value})}}value = {exercise["sets"]}/>
			</div>
			{exercise.weight &&( 
				<div > 
					<h3>weight</h3> 
					<input style={{textAlign:"center"}} onChange={(event)=>{
						setExercise({...exercise, ["weight"]:event.target.value})}}value = {exercise["weight"]}/> {/* if weighted, allow changing weight*/}
				</div>

			)}
		</div>
	)
}

export default StatRow