import React,{useState} from "react"

const RegimentForm=({day,currentRegiment, setCurrentRegiment})=>{
	const [exercise,setExercise] = useState("") //individual exercise (to control input)

	if (!currentRegiment[day]) {return(null)} //make forms only for active days
	return( 
		<form onSubmit={(event)=>{event.preventDefault()
			{/*Append submitted exercise to one of day arrays in currentRegiment*/}
			setCurrentRegiment({...currentRegiment, [day]:currentRegiment[day].concat(
				(exercise.charAt(0).toUpperCase()+exercise.slice(1)).trim()) }) //Capitalise first letter, and trim whitespace off ends
			setExercise("")
		}}> 
			<h2>{day}</h2> 
			{currentRegiment[day].map((exercise,i)=>(
				<div key={i}> {/*show each submitted exercise*/}
					<li >
						{exercise}
					</li>

					<div >
						{/*remove exercise*/}
						<button  type="button" onClick={()=>setCurrentRegiment( 
							{...currentRegiment, 
								[day]:currentRegiment[day].filter((name)=>(
									name!=exercise)
								)}

						)}>remove</button>
					</div>
				</div>
			))}
			<input value={exercise} name={day} placeholder={day} onChange={(event)=>{
				setExercise(event.target.value)
			}}/>
			<button type="submit">add</button>
		</form> 
	)
}
export default RegimentForm
