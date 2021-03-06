import React from "react"
import Table from "react-bootstrap/Table"

const HistoryWorkout = ({workout}) => {
	/*Single workout table in History*/

	if(workout){
		const workoutDate=new Date(workout.date)
		const workoutMins= workoutDate.getMinutes() < 10
			? "0"+workoutDate.getMinutes() // to make double digit
			: workoutDate.getMinutes()
		return( 
			<>
				<h1 style={{backgroundColor:"",color:"black",padding:"10px",borderRadius:"20px",
					marginTop:"40px"}}>{workoutDate.toDateString() +", " 
								+ workoutDate.getHours()+ ":" 
								+ workoutMins}</h1>
				<Table striped bordered hover variant="dark">
					<tbody>
						<tr style={{backgroundColor:"black"}}> 
							<th className="col-1"><h2>Exercise</h2></th>
							<th className="col-1"><h2>Repetitions</h2></th>
							<th className="col-1"><h2>Sets</h2></th>
							<th className="col-1"><h2>Weight</h2></th>
						</tr>
						{workout.exercises.map((exercise,index) => (
							<tr key={index}>
								<td className="col-1"><h3 style={{color:"white"}}>{exercise.name}</h3></td>
								<td className="col-1"><h3 style={{color:"white"}}>{exercise.reps}</h3></td>
								<td className="col-1"><h3 style={{color:"white"}}>{exercise.sets}</h3></td>
								<td className="col-1"><h3 style={{color:"white"}}>{exercise.weight || 0}</h3></td>
							</tr>
						))}
					</tbody>
				</Table>
			</>
		)}
}
export default HistoryWorkout