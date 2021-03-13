import React,{useState} from "react"

const DayGrid=({day,currentRegiment,setCurrentRegiment})=>{ 
	const [exercise,setExercise] = useState("") //individual exercise to control input
	console.log(exercise)

	return( 

		<form style={{borderRadius:"5px",margin:"5px",display:"flex",flexDirection:"column",
		}} onSubmit={(event)=>{event.preventDefault()
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

			<div style={{width:"120px",justifyContent:"center",alignItems:"center",borderRadius:"5px", display:"flex", flexDirection:"column"}}> {/*exercise input*/}
				<h2 style={{padding:"10px",borderRadius:"5px", color:"black", }}>{day}</h2> 
				<input style={{width:"120px"}}value={exercise} name={day} placeholder="exercise" onChange={(event)=>{
					if(event.target.value!==" "){
						setExercise(event.target.value)
					}}}/>
				<button style={{marginTop:"5px",padding:"0px",width:"57px",height:"20px",border:"none",borderRadius:"5px",backgroundColor:"#FF8933"}}type="submit">add</button>
			</div> 

			<div style={{display:"flex",flexWrap:"wrap",flexDirection:"column",
				alignContent:"center",justifyContent:"space-between"}}>

			</div>
		</form> 
	)

}

export default DayGrid