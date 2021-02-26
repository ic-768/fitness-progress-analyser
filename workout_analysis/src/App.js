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
import Headquarters from "./Components/Headquarters"
import Container from "react-bootstrap/Container"

import registerService from "./Services/register"
import exerciseService from "./Services/exercises"
import {login,logout}from "./Functions/userFunctions"


function App(){ 

	/*user contains authorization token, username, and flag to show if a target regiment has been set.
	 User workouts history is sent to localStorage on log-in*/
	const [user, setUser] = useState(null) 	
	const [daysExercises, setDaysExercises] = useState([]) // today's target exercises
	const [currentRegiment, setCurrentRegiment] = useState({}) // whole week target exercises
	const [workouts, setWorkouts] = useState() // whole week target exercises

	useEffect(()=>{  //Check to see if user is already logged in
		const user = JSON.parse(window.localStorage.getItem("loggedUser"))
		if (user){ 
			setWorkouts(JSON.parse(window.localStorage.getItem("userWorkouts")))
			setUser(user)
			exerciseService.setToken(user.token) //token will be set on each render
		}	
	},[]) 

	useEffect(()=>{ //Set user's target workout (for a whole week)
		if(user){
			setWorkouts(JSON.parse(window.localStorage.getItem("userWorkouts")))
			const regiment=JSON.parse(window.localStorage.getItem("currentRegiment"))
			setCurrentRegiment(regiment) 
		}
	}
	,[user])

	useEffect(()=>{ //Set exercises of today's workout
		if(user){ 
			const day=(new Date()).getDay() //Sunday starts at 0 with Date method - with currentRegiment array at 6.
			if (day===0){ //Case when Sunday
				const exercisesForToday=(Object.values(currentRegiment)[6]) 
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
				{user ? //if user is logged in
					<>
						{user.regIsSet
							?  //User isn't new and has a regiment set - allow submissions, performance analysis & workout history view
							<>
								<UserBlock user={user} logout={()=>{logout(setUser) }}/>  
								<Container>
									<Headquarters setWorkouts={setWorkouts} workouts={workouts} daysExercises={daysExercises}/>
								</Container>
							</>
							:  //if user hasn't set a regiment, do that.
							<LandingPage currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment} user={user} setUser={setUser}/>
						}
					</>
					: //if no user, register or login
					//TODO different header than if user is logged in
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
