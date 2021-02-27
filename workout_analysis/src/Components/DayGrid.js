import React,{useState} from "react"

const DayGrid=({day,currentRegiment,setCurrentRegiment})=>{ 
	const [exercise,setExercise] = useState("") //individual exercise to control input

	if(!currentRegiment[day]){return(null)} //If inactive day
	return( 

		<form style={{margin:"5px",backgroundColor:"#DDDDDD", display:"flex",flexDirection:"column", border:"1px solid black",
			justifyContent:"center",}} onSubmit={(event)=>{event.preventDefault()
			{/*Append submitted exercise to one of day arrays in currentRegiment*/}
			if(exercise.trim()){ //no empty strings
				if(currentRegiment[day].includes( //no same exercise in day
					(exercise.charAt(0).toUpperCase()+ // compare formatted entry
					exercise.slice(1)).trim())){
					console.log("you're already doing that today")} 

				else{ //format and update state
					setCurrentRegiment({...currentRegiment, [day]:currentRegiment[day].concat(
						(exercise.charAt(0).toUpperCase()+exercise.slice(1)).trim()) }) //Capitalise first letter, and trim whitespace off ends
					setExercise("")
				}}
		}}> 

			<div style={{backgroundColor:"#AAAAAA", display:"flex", flexDirection:"column"}}> {/*exercise input*/}
				<h2 style={{margin:"20px"}}>{day}</h2> 
				<input value={exercise} name={day} placeholder={day} onChange={(event)=>{
					if(event.target.value!==" "){
						setExercise(event.target.value)
					}}}/>
				<button type="submit">add</button>
			</div> 

			<div style={{display:"flex",flexWrap:"wrap",flexDirection:"column",
				alignContent:"center",justifyContent:"space-between"}}>

			</div>
		</form> 
	)

}

export default DayGrid