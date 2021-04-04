import React from "react"
const StatRow=({exercise,setExercise})=>{
	/*Takes individual exercise instances and renders interactable rows of data- used in Exercise Submission*/
	const weightColor = exercise.weight ? "#FF8933" : "gray"
	const cellStyle={width:"80px",marginLeft:"25px"}

	const checkInput=(val)=> (/^[0-9]*$/.test(val))   // If contains only digits ( or empty ) 
	/*inputs get regex instead of "type="number"", because this is not a self-contained form -  
	it would complain at invalid input, but would allow the characters to be typed  in*/ 

	return(
		<div style={{paddingBottom:"10px",marginTop:"10px",display:"flex"}}> 
			<button className="themed--2" style={{marginRight:"0px", marginBottom:"auto",color:weightColor}} 
				onClick={()=>{setExercise({...exercise, weight:
							exercise.weight ? null : 1}) }}>KG</button> {/*Toggle weighted*/}
			<div style={cellStyle} > 
				<h5>Repetitions</h5> 
				<input className="statRow__input" value = {exercise["reps"]||""} onChange={(event)=>{ 
					checkInput(event.target.value) && setExercise({...exercise, ["reps"]:event.target.value.replace(/^0+/,"")})}}/>  {/*Remove leading 0's (e.g. 09 -> 9) */}
			</div>
			<div style={cellStyle}> 
				<h5>Sets</h5> 
				<input className="statRow__input" value = {exercise["sets"]||""} onChange={(event)=>{
					checkInput(event.target.value) && setExercise({...exercise, ["sets"]:event.target.value.replace(/^0+/,"")})}}/>
			</div>

			{exercise.weight!=null &&( 
				<div style={cellStyle}> 
					<h5>Weight</h5> 
					<input className="statRow__input" value = {exercise["weight"]|""} onChange={(event)=>{
						checkInput(event.target.value)&&
						setExercise({...exercise, ["weight"]:event.target.value.replace(/^0+/,"")})}}/> {/* if weighted, allow changing weight*/}
				</div>

			)}
		</div>
	)
}

export default StatRow