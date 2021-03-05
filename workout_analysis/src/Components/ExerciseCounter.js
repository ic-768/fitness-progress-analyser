import React from "react"
import Button from "react-bootstrap/Button"

const ExerciseCounter = ({exercise,setExercise,property}) => { 

	const subtraction = property == "weight" ? 0.5 : 1
	const decrement=(number)=>( //1 set of 1 reps is minimum submittable, and weight is either null or >0
		number-subtraction || 1) 

	const CounterButtonStyle={margin:"10px", height:"60px", width:"60px", borderRadius:"50%" }
	const CounterContainerStyle={alignItems:"center", margin:"5px",backgroundColor:"white", borderRadius:"30px", display:"flex",flexDirection:"column"}

	return( 
		<div style={CounterContainerStyle}> 
			<Button style={CounterButtonStyle} onClick={()=>{
				if(open){
					setExercise({...exercise, [property]:exercise[property]+subtraction})
				}}}><h1>+</h1>
			</Button>
			<input style={{textAlign:"center"}} onChange={(event)=>{setExercise({...exercise, [property]:event.target.value})}}value = {exercise[property]}/>

			<Button style={CounterButtonStyle} onClick={()=>{
				if(open){
					setExercise({...exercise, [property]:decrement(exercise[property])})
				}}}><h1>-</h1>
			</Button>
			<h3>{property}</h3> 
		</div>

	)

}
 
export default ExerciseCounter