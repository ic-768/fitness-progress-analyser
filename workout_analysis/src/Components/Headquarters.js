import React from "react" 
import {Switch,Route,useHistory} from "react-router-dom"
import Analysis from "./Analysis"

const HeadQuarters=()=>{
	const history = useHistory()
	const workouts=JSON.parse(window.localStorage.getItem("userWorkouts"))
	
	return (
		<>
			<Switch>
				<Route path="/analysis"> 
					<Analysis workouts={workouts}/> 
				</Route>
				<Route path="/">  {/* /home works*/}
					<div> {/*Might have to use a <Switch>*/}
						<p>Welcome, This is the home page, and from here you can either Submit
			a new exercise, or head over to the analysis page and see how you&apos;ve done!
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
