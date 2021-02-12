import React,{useState,useEffect} from "react"
import {BrowserRouter as Router,
	Switch,
	Route,
	Link,
} from "react-router-dom"

import LoginForm from "./Components/LoginForm"
import RegisterForm from "./Components/RegisterForm"
import UserBlock from "./Components/UserBlock"
import ExerciseSubmission from "./Components/ExerciseSubmission"

import registerService from "./Services/register"
import exerciseService from "./Services/exercises"
import {login,logout} from "./Functions/userFunctions"
import {getDaysWorkout} from "./Functions/workoutFunctions"

function App(){ 
	const [user, setUser] = useState(null) //holds token, username, and all workout days
	const [AppendedExercises,setAppendedExercises]=useState([]) //fresh workout exercises to be sent to backend
	const [daysExercises, setDaysExercises] = useState([]) // all of todays exercises

	useEffect(()=>{  //Check to see if user is already logged in
		const loggedUser = window.localStorage.getItem("loggedUser")
		if (loggedUser){ 
			const user = JSON.parse(loggedUser) 
			setUser(user)
			exerciseService.setToken(user.token) //token will be set on each render
		}	
	},[]) 

	useEffect(()=>{ //set workout local storage
		if(user){
			const userWorkouts = window.localStorage.getItem("userWorkouts") //retrieve from local storage
			const workouts = JSON.parse(userWorkouts)
			setDaysExercises(getDaysWorkout(workouts)) //all exercises that were submitted today
		}}
	,[user,AppendedExercises])

	return (
		<Router>
			<div className="App">
				<h2>
					user:ic768 <br/>
					pass:a
				</h2>
				{user ? //if user is logged in
					<Switch>
						<Route path ="/">
							{/*logged user and disconnect button*/}
							<UserBlock user={user} logout={()=>{logout(setUser); setAppendedExercises([])}}/>  
							<ExerciseSubmission AppendedExercises={AppendedExercises} setAppendedExercises={setAppendedExercises} /> 
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
