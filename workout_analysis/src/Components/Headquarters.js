import React from "react" 
import {Switch,Route,useHistory} from "react-router-dom"
import Button  from "react-bootstrap/Button"
import Analysis from "./Analysis"
import History from "./History"
import ExerciseSubmission from "./ExerciseSubmission"

const HeadQuarters=({setWorkouts,workouts, daysExercises})=>{
	const history = useHistory()
	
	return (
		<>
			<Switch>
				<Route path="/dailySubmission">
					<ExerciseSubmission setWorkouts={setWorkouts} daysExercises={daysExercises}/>
				</Route>
				<Route path="/history"> 
					<History workouts={workouts}/> 
				</Route>
				<Route path="/analysis"> 
					<Analysis workouts={workouts}/> 
				</Route>
				<Route path="/">
					<div> 
						<p>Welcome! This is the home page. From here you can submit
			a new exercise, see your workout history,or head over to the analysis page and see your progress.
						</p>
						<div>
						</div>
						<div>
							<Button variant="dark" onClick={()=>{history.push("/dailySubmission")}}>
				Submit today&apos;s workout
							</Button>
						</div>
						<Button variant="dark" onClick={()=>{history.push("/analysis")}}>
				See your performance!
						</Button>
						<Button variant="dark" onClick={()=>{history.push("/history")}}>
				See your workout history!
						</Button>
						<div>
							<div>
							</div>
		HeadQuarters
						</div>
					</div>
				</Route>
			</Switch>
		</>
	)
}

export default HeadQuarters
