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

function App(){ 

	/*user contains authorization token, username, and flag to show if a target regiment has been set.
	 User workouts history is sent to localStorage on log-in*/ 
	const [user, setUser] = useState(null) 	
	const [daysExercises, setDaysExercises] = useState([]) // today's target exercises
	const [currentRegiment, setCurrentRegiment] = useState({}) // whole week target exercises

	useEffect(()=>{  //Check to see if user is already logged in
		const user = JSON.parse(window.localStorage.getItem("loggedUser"))
		if (user){ 
			setUser(user)
			exerciseService.setToken(user.token) //token will be set on each render
		}	
	},[]) 

	useEffect(()=>{ //Set user's target workout (whole week)
		if(user){
			const regiment=JSON.parse(window.localStorage.getItem("currentRegiment"))
			setCurrentRegiment(regiment) 
		}
	}
	,[user])

	useEffect(()=>{ //Set today's workout
		if(user){ 
			const day=(new Date()).getDay() //Sunday starts at 0 with this method - with currentRegiment it starts at 7.
			if (day===0){ //Case when Sunday
				const exercisesForToday=(Object.values(currentRegiment)[7]) 
				setDaysExercises(exercisesForToday)
			}
			else{ //For all other days we can just -1.
				const exercisesForToday=(Object.values(currentRegiment)[day-1]) 
				setDaysExercises(exercisesForToday) 
			}}
	}
	,[currentRegiment])

	return (
		<Router>
			<div className="App">
				<h2>
					user:ic768 <br/>
					pass:a
				</h2>
				{user ? //if user is logged in
					<Switch>
						{user.regIsSet || //if user hasn't set a regiment
							<LandingPage currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment} user={user} setUser={setUser}/>
						}
						<Route path ="/">
							<UserBlock user={user} logout={()=>{logout(setUser) }}/>  
							<h2>Today&apos;s exercises</h2>

							<ExerciseSubmission daysExercises={daysExercises}/>

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
