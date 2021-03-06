import React,{useState,useEffect} from "react"
import {
	Switch,
	Route,
	useLocation
} from "react-router-dom"
import {CSSTransition, TransitionGroup} from "react-transition-group"

import LoginForm from "./Components/LoginForm"
import RegisterForm from "./Components/RegisterForm"
import Banner from "./Components/Banner"
import LandingPage from "./Components/LandingPage"
import Headquarters from "./Components/Headquarters"
import Container from "react-bootstrap/Container"

import registerService from "./Services/register"
import exerciseService from "./Services/exercises"
import {login,logout}from "./Functions/userFunctions"
import { setTodaysExercises } from "./Functions/workoutFunctions"


function App(){ 
	const location=useLocation()

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
			setTodaysExercises(currentRegiment, setDaysExercises)
		}
	}
	,[currentRegiment])

	return ( 
		<div className="App" style={{display:"flex",flexDirection:"column",height:"100vh", backgroundImage:"url(/Media/kicking.jpg)"}}>
			{user ? //if user is logged in
				<>
					{user.regIsSet
						?  //User isn't new and has a regiment set - allow submissions, performance analysis & workout history view
						<>
							<Banner user={user} logout={()=>{logout(setUser) }}/>  
							<Container style={{height:"100%",marginTop:"120px",overflow:"auto",backgroundColor:"rgb(255,255,255,0.94",flexGrow:"1",display:"flex",flexDirection:"column", alignItems:"center" }}>
								<Headquarters currentRegiment={currentRegiment}setWorkouts={setWorkouts} workouts={workouts} daysExercises={daysExercises} setDaysExercises={setDaysExercises}/>
							</Container>
						</>
						:  //if user hasn't set a regiment, do that.
						<LandingPage currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment} user={user} setUser={setUser}/>
					}
				</>
				: //if no user, register or login
				<div style={{backgroundImage:("url(/Media/kicking.jpg"), //in public folder
					height:"100%",display:"flex", justifyContent:"center", alignItems:"flex-start"}}>
					<TransitionGroup style={{flexGrow:"1",display:"flex", flexDirection:"column"}}>
						<CSSTransition
							key={location}
							timeout={{ enter: 500, exit: 200 }}>
							<Switch>
								<Route path="/register">
									<RegisterForm submitCredentials={registerService.register}/>
								</Route>
								<Route path="/">
									<LoginForm submitCredentials={login} setUser={setUser}/> 
								</Route>
							</Switch> 
						</CSSTransition>
					</TransitionGroup>
				</div>
			}
		</div>
	) 
} 

export default App
