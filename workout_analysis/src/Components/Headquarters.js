import React from "react" 
import {Switch,Route,useHistory} from "react-router-dom"
import Analysis from "./Analysis"
import History from "./History"

const HeadQuarters=()=>{
	const history = useHistory()
	const workouts=JSON.parse(window.localStorage.getItem("userWorkouts"))
	
	return (
		<>
			<Switch>
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
							<button onClick={()=>{history.push("/dailySubmission")}}>
				Submit today&apos;s workout
							</button>
						</div>
						<button onClick={()=>{history.push("/analysis")}}>
				See your performance!
						</button>
						<button onClick={()=>{history.push("/history")}}>
				See your workout history!
						</button>
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
