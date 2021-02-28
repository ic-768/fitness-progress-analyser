import React, {useState} from "react"
import {filterExercises} from "../Functions/workoutFunctions"
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"
import FormControl from "react-bootstrap/FormControl"

const History=({workouts})=>{ 
	const [filteredWorkouts,setFilteredWorkouts]=useState(workouts) 
	//Will be using filteredWorkouts for everything.

	const filterWorkouts=(workouts,filter)=>{ 
		setFilteredWorkouts(
			workouts.map((workout)=>{ 
				/* If no match, result will be empty array. */
				const result= filterExercises(workout.exercises,filter)
				if(result.length!==0){return(workout)}  //if non-empty array
			}).filter((value)=>value!=undefined))
	}

	return(
		<div style={{padding:"20px 90px 0 90px",flexGrow:"1",display:"flex", 
			flexDirection:"column", alignContent:"center",justifyContent:"center",
			alignItems:"center",justifyItems:"center",}}>
			<Form  onSubmit={(event)=>{event.preventDefault()}}>
				<FormControl type="text" placeholder="Search exercises" className="mr-sm-2" onChange={(event)=>{ 
					filterWorkouts(workouts,event.target.value)
				}} />
			</Form>

			{ filteredWorkouts.length>0 && 
			<ul style={{backgroundColor:"white",borderRadius:"20px",margin:"10px",padding:"20px",border:"2px solid black",display:"flex", flexDirection:"column", }}>
				{filteredWorkouts.map((workout,index)=>{ 
					if(workout){
						const workoutDate=new Date(workout.date)
						const workoutMins= workoutDate.getMinutes() < 10
							? "0"+workoutDate.getMinutes() // to make double digit
							: workoutDate.getMinutes()
						return( 
							<div style={{display:"flex", flexDirection:"column",alignItems:"center"}}key={index}>
								<h1 style={{backgroundColor:"",color:"black",padding:"10px",borderRadius:"20px",
									marginBottom:"40px", marginTop:"40px"}}>{workoutDate.toDateString() +", " 
								+ workoutDate.getHours()+ ":" 
								+ workoutMins}</h1>
								<Table striped bordered hover variant="dark">
									<tbody>
										<tr style={{backgroundColor:"black", }}> 
											<th className="col-1"><h2 style={{color:"cornflowerblue"}}>Exercise</h2></th>
											<th className="col-1"><h2 style={{color:"cornflowerblue"}}>Repetitions</h2></th>
											<th className="col-1"><h2 style={{color:"cornflowerblue"}}>Sets</h2></th>
										</tr>
										{workout.exercises.map((exercise,index) => (
											<tr key={index}>
												<td className="col-1"><h3 style={{color:"white"}}>{exercise.name}</h3></td>
												<td className="col-1"><h3 style={{color:"white"}}>{exercise.sets}</h3></td>
												<td className="col-1"><h3 style={{color:"white"}}>{exercise.reps}</h3></td>
											</tr>
										))}
									</tbody>
								</Table>
							</div>
						)}})}
			</ul>}
		</div>

	)
}

export default History