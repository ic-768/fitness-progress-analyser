import React from "react" 
import {Switch,Route,useHistory} from "react-router-dom"
import { GoPlusSmall } from "react-icons/go"
import Analysis from "./Analysis"
import History from "./History"
import ExerciseSubmission from "./ExerciseSubmission"
import AccountPage from "./AccountPage"

const HeadQuarters=({currentRegiment, setCurrentRegiment, user, setUser,setNotification,setWorkouts,workouts, daysExercises})=>{ 
	const history=useHistory()
	
	return (
		<Switch>
			<Route path="/account">
				<AccountPage  setNotification={setNotification} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment} 
					user={user}setUser={setUser}/> 
			</Route>
			<Route path="/dailySubmission">
				<ExerciseSubmission setNotification={setNotification} setWorkouts={setWorkouts} 
					daysExercises={daysExercises} />
			</Route>
			<Route path="/history"> 
				<History workouts={workouts}/> 
			</Route>
			<Route path="/analysis" style = {{ height:"100%"}}> 
				<Analysis workouts={workouts}/> 
			</Route>
			<Route path="/">
				<div className="pageContainer">
					<div className="HQ__menu">
						<div className="HQ__item" onClick={()=>{history.push("/dailySubmission")}}>
							<h2>  {/*Everything within HQ__items gets styled in CSS*/}
								<a> <GoPlusSmall/> Submit a Workout </a>
							</h2> 
						</div>
						<div className="HQ__item" onClick={()=>{history.push("/history")}} > 
							<h2>
								<a> <GoPlusSmall/> My Workout History </a>
							</h2>
						</div> 
						<div className="HQ__item" onClick={()=>{history.push("/analysis")}} >
							<h2> 
								<a> <GoPlusSmall/> Performance Analysis </a>
							</h2> 
						</div>
						<div className="HQ__item" onClick={()=>{history.push("/account")}} >
							<h2> 
								<a> <GoPlusSmall/>My Account</a>
							</h2> 
						</div>
					</div>
				</div>
				{workouts && workouts.length>0 
					?(<h1 className="HQ__greeting">Welcome Back</h1>) 
					: <h1 className="HQ__greeting">Welcome!</h1>
				}</Route>
		</Switch>
	)
}

export default HeadQuarters
