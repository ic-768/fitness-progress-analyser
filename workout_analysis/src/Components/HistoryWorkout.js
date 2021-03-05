import React from "react"
import Table from "react-bootstrap/Table"

const HistoryWorkout = ({workout}) => {

	if(workout){
		const workoutDate=new Date(workout.date)
		const workoutMins= workoutDate.getMinutes() < 10
			? "0"+workoutDate.getMinutes() // to make double digit
			: workoutDate.getMinutes()
		return( 
			<div style={{display:"flex", flexDirection:"column",alignItems:"center"}}>
				<h1 style={{backgroundColor:"",color:"black",padding:"10px",borderRadius:"20px",
					marginTop:"40px"}}>{workoutDate.toDateString() +", " 
								+ workoutDate.getHours()+ ":" 
								+ workoutMins}</h1>
				<Table striped bordered hover variant="dark">
					<tbody>
						<tr style={{backgroundColor:"black", }}> 
							<th className="col-1"><h2 style={{color:"cornflowerblue"}}>Exercise</h2></th>
							<th className="col-1"><h2 style={{color:"cornflowerblue"}}>Repetitions</h2></th>
							<th className="col-1"><h2 style={{color:"cornflowerblue"}}>Sets</h2></th>
							<th className="col-1"><h2 style={{color:"cornflowerblue"}}>Weight</h2></th>
						</tr>
						{workout.exercises.map((exercise,index) => (
							<tr key={index}>
								<td className="col-1"><h3 style={{color:"white"}}>{exercise.name}</h3></td>
								<td className="col-1"><h3 style={{color:"white"}}>{exercise.reps}</h3></td>
								<td className="col-1"><h3 style={{color:"white"}}>{exercise.sets}</h3></td>
								<td className="col-1"><h3 style={{color:"white"}}>{exercise.weight}</h3></td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
		)}
}
export default HistoryWorkout