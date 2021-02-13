import React,{useState,useEffect} from "react"
import {BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom"

import LoginForm from "./Components/LoginForm"
import RegisterForm from "./Components/RegisterForm"
import UserBlock from "./Components/UserBlock"
import LandingPage from "./Components/LandingPage"
import ExerciseSubmission from "./Components/ExerciseSubmission"

import registerService from "./Services/register"
import exerciseService from "./Services/exercises"
import {login,logout} from "./Functions/userFunctions"
import {getDaysWorkout} from "./Functions/workoutFunctions"

function App(){ 
	const [user, setUser] = useState(null) //contains authorization token, username, and flag to show if a target regiment has been set
	// collection of all user workouts are sent to localStorage on log-in
	const [appendedExercises,setAppendedExercises]=useState([]) //fresh workout exercises to be sent to backend
	const [daysExercises, setDaysExercises] = useState([]) // all of todays exercises
	const [currentRegiment, setCurrentRegiment] = useState({})


	useEffect(()=>{  //Check to see if user is already logged in
		const user = JSON.parse(window.localStorage.getItem("loggedUser"))
		if (user){ 
			const regiment=JSON.parse(window.localStorage.getItem("currentRegiment"))
			setUser(user)
			setCurrentRegiment(regiment)
			exerciseService.setToken(user.token) //token will be set on each render
		}	
	},[]) 

	useEffect(()=>{ //set workout local storage
		if(user){
			const userWorkouts = window.localStorage.getItem("userWorkouts") //retrieve from local storage
			const workouts = JSON.parse(userWorkouts)
			setDaysExercises(getDaysWorkout(workouts)) //all exercises that were submitted today
		}}
	,[user,appendedExercises])

	return (
		<Router>
			<div className="App">
				<h2>
					user:ic768 <br/>
					pass:a
				</h2>
				{user ? //if user is logged in
					<Switch>
						{user.regIsSet
							?
							console.log("is set")
							:
							<LandingPage currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/>
							/*TODO change user.regIsSet */
						}
						<Route path ="/">
							{/*logged user and disconnect button*/}
							<UserBlock user={user} logout={()=>{logout(setUser); setAppendedExercises([])}}/>  
							<ExerciseSubmission appendedExercises={appendedExercises} setAppendedExercises={setAppendedExercises} /> 
							<h2>Today&apos;s exercises</h2>

							<ul>
								{daysExercises.map((exercise,index)=>(
									<li key={index}>{exercise.name} </li>
								))}
							</ul> 

						</Route>
					</Switch>
					: //if no user, register or login
					<Switch>
						<Route path="/register">
							<RegisterForm submitCredentials={registerService.register}/>
							<Link to="/">back to login</Link>
						</Route>
						<Route path="/">
							<LoginForm submitCredentials={login} setUser={setUser}/> 
							<h2>New? Register<Link to="/register"> here </Link> :)</h2>
						</Route>
					</Switch> 
				}
			</div>
		</Router>
	) 
} 

export default App
