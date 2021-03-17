import React from "react"
const StatRow=({exercise,setExercise})=>{
	/*Takes individual exercise instances and renders interactable rows of data*/
	const weightColor = exercise.weight ? "#FF8933" : "gray"
	const cellStyle={width:"80px",marginLeft:"25px"}

	return(
		<div style={{paddingBottom:"10px",marginTop:"10px",display:"flex"}}> 
			<button style={{marginRight:"10px", marginBottom:"auto",border:"none",borderRadius:"5px",color:weightColor}} 
				onClick={()=>{setExercise({...exercise, weight:
							exercise.weight ? null : 1}) }}>KG</button> {/*Toggle weighted*/}
			<div style={cellStyle} > 
				<h5>Repetitions</h5> 
				<input className="statRow__input"type="number" onChange={(event)=>{
					(/^[0-9]+$/.test(event.target.value)) &&  // If contains only digits
					setExercise({...exercise, ["reps"]:event.target.value})}}value = {exercise["reps"]}/> 
			</div>
			<div style={cellStyle}> 
				<h5>Sets</h5> 
				<input className="statRow__input"type="number" onChange={(event)=>{
					(/^[0-9]+$/.test(event.target.value)) &&
					setExercise({...exercise, ["sets"]:event.target.value})}}value = {exercise["sets"]}/>
			</div>
			{exercise.weight!=null &&( 
				<div style={cellStyle}> 
					<h5>Weight</h5> 
					<input className="statRow__input"type="number" onChange={(event)=>{
						(/^[0-9]+$/.test(event.target.value)) &&
						setExercise({...exercise, ["weight"]:event.target.value})}}value = {exercise["weight"]}/> {/* if weighted, allow changing weight*/}
				</div>

			)}
		</div>
	)
}

export default StatRow