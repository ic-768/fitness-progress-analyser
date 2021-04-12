import React,{useState} from "react"

const DayGrid=({day,currentRegiment,setCurrentRegiment})=>{ 
	/*Title and input portion of each day in regimentForm */

	const [exercise,setExercise] = useState("") //individual exercise to control input

	return( 

		<form className="regimentForm__dayGrid" onSubmit={(event)=>{event.preventDefault()
			{/*Append submitted exercise to one of day arrays in currentRegiment*/}
			if(exercise.trim()){ //no empty strings
				if(currentRegiment[day].includes( //no same exercise in day
					(exercise.charAt(0).toUpperCase()+ // compare formatted entry
					exercise.slice(1)).trim())){
					console.log("(TODO notification) you're already doing that today")} 

				else{ //format and update state
					setCurrentRegiment({...currentRegiment, [day]:currentRegiment[day].concat(
						(exercise.charAt(0).toUpperCase()+exercise.slice(1)).trim()) }) //Capitalise first letter, and trim whitespace off ends
					setExercise("")
				}}
		}}> 

			<div style={{alignItems:"center", display:"flex", flexDirection:"column"}}>
				<h2>{day}</h2> 
				<input style={{width:"120px"}}value={exercise} name={day} placeholder="exercise" onChange={(event)=>{
					if(event.target.value!==" "){
						setExercise(event.target.value)
					}}}/>
				<button className="themed--1" style={{margin:"5px",padding:"0px",width:"57px"}} type="submit">
					add
				</button>
			</div> 

		</form> 
	)

}

export default DayGrid
