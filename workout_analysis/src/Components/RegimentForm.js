import React,{useState} from "react"

const RegimentForm=({day,currentRegiment, setCurrentRegiment})=>{
	const [exercise,setExercise] = useState("") //individual exercise (to control input)

	if (!currentRegiment[day]) {return(null)} //make forms only for active days
	return( 
		<form style={{backgroundColor:"#DDDDDD", display:"flex",flexDirection:"column", border:"1px solid black",
			justifyContent:"center",}} onSubmit={(event)=>{event.preventDefault()
			{/*Append submitted exercise to one of day arrays in currentRegiment*/}
			if(exercise.trim()){ //make sure no empty strings
				if(currentRegiment[day].includes(
					(exercise.charAt(0).toUpperCase()+ // compare formatted entry
					exercise.slice(1)).trim())){
					console.log("you're already doing that today")}
			

				else{
					setCurrentRegiment({...currentRegiment, [day]:currentRegiment[day].concat(
						(exercise.charAt(0).toUpperCase()+exercise.slice(1)).trim()) }) //Capitalise first letter, and trim whitespace off ends
					setExercise("")
				}}
		}}> 
			<div style={{backgroundColor:"#AAAAAA", display:"flex", flexDirection:"column"}}> {/*input div*/}
				<h2 style={{margin:"20px"}}>{day}</h2> 
				<input value={exercise} name={day} placeholder={day} onChange={(event)=>{
					if(event.target.value!==" "){
						setExercise(event.target.value)
					}}}/>
				<button type="submit">add</button>
			</div> 

			<div style={{display:"flex",flexWrap:"wrap",flexDirection:"column",
				alignContent:"center",justifyContent:"space-between"}}>{/*output div*/}
				<h5>Submissions:</h5>
				{currentRegiment[day].map((exercise,i)=>( 
					<div key={i} style={{display:"flex" }}> {/*show each submitted exercise*/}
						<div >
							{exercise}
						</div> 
						<div >
							{/*remove exercise*/}
							<button  type="button" onClick={()=>
								setCurrentRegiment( 
									{...currentRegiment, 
										[day]:currentRegiment[day].filter((name)=>(
											name!=exercise)
										)}

								)}>remove</button>
						</div>
					</div>
				))}

			</div>
		</form> 
	)
}
export default RegimentForm
