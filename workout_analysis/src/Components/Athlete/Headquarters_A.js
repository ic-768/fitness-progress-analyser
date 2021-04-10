import React,{useEffect,useState} from "react" 
import {Switch,Route,useHistory} from "react-router-dom"
import { GoPlusSmall } from "react-icons/go"
import AthleteHistory from "./History_A"
import AthleteExerciseSubmission from "./ExerciseSubmission_A"
import AccountPage from "../AccountPage"
import Analysis_A from "./Analysis_A"
import { getTodaysExercises } from "../../Functions/workoutFunctions"

const AthleteHeadquarters=({ user, setUser,setNotification,})=>{ 
	const [daysExercises, setDaysExercises] = useState([]) // today's target exercises
	const [currentRegiment, setCurrentRegiment] = useState({}) // whole week target exercises
	const [workouts, setWorkouts] = useState(null) // whole week target exercises 
	const history=useHistory()

	useEffect(()=>{ //set athlete's workouts and regiment
		if(user){ 
			setWorkouts(JSON.parse(window.localStorage.getItem("userWorkouts")))
			setCurrentRegiment( JSON.parse(window.localStorage.getItem("currentRegiment")) )
		} 
	},[user])

	useEffect(()=>{
		if(user){
			setDaysExercises(getTodaysExercises(currentRegiment)) 
		} 
	},[currentRegiment])
	
	return (
		<Switch>
			<Route path="/account">
				<AccountPage  setNotification={setNotification} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment} 
					user={user}setUser={setUser}/> 
			</Route>
			<Route path="/dailySubmission">
				<AthleteExerciseSubmission setNotification={setNotification} setWorkouts={setWorkouts} 
					daysExercises={daysExercises} />
			</Route>
			<Route path="/history"> 
				<AthleteHistory workouts={workouts}/> 
			</Route>
			<Route path="/analysis" style = {{ height:"100%"}}> 
				<Analysis_A workouts={workouts}/> 
			</Route>
			<Route path="/">
				<div className="pageContainer">
					<div className="HQ__menu">
						<div className="HQ__item" onClick={()=>{history.push("/dailySubmission")}}>
							<h2>  {/*Everything within HQ__items gets styled in CSS*/}
								<a> <GoPlusSmall/>Submit a Workout</a>
							</h2> 
						</div>
						<div className="HQ__item" onClick={()=>{history.push("/history")}} > 
							<h2>
								<a> <GoPlusSmall/>My Workout History</a>
							</h2>
						</div> 
						<div className="HQ__item" onClick={()=>{history.push("/analysis")}} >
							<h2> 
								<a> <GoPlusSmall/>Performance Analysis</a>
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

export default AthleteHeadquarters
