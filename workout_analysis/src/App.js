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
import Notification from "./Components/Notification"

import registerService from "./Services/register"
import exerciseService from "./Services/exercises"
import {login,logout}from "./Functions/userFunctions"
import { setTodaysExercises } from "./Functions/workoutFunctions"


function App(){ 
	const location=useLocation()
	const [backgroundImage,setBackgroundImage] = useState("Media/weightLiftingGirl.png")
	const [notification,setNotification] = useState(null) //Action feedback + Error messages
	//will be object e.g. {color:"red",message:"text"}

	/*user contains authorization token, username, and flag to show if a target regiment has been set.
	 User workouts history is sent to localStorage on log-in*/
	const [user, setUser] = useState(null) 	
	const [daysExercises, setDaysExercises] = useState([]) // today's target exercises
	const [currentRegiment, setCurrentRegiment] = useState({}) // whole week target exercises
	const [workouts, setWorkouts] = useState(null) // whole week target exercises


	useEffect(()=>{ //Turn off notification after 3 sec
		if(notification){
			setTimeout(() => { 
				setNotification(null)
			}, 3000)
		} 
	},[notification])

	useEffect(()=>{  //Check to see if user is already logged in
		const user = JSON.parse(window.localStorage.getItem("loggedUser"))
		if(Object.entries(user).length>0){ //if no user, will return empty object
			setWorkouts(JSON.parse(window.localStorage.getItem("userWorkouts")))
			setUser(user)
			exerciseService.setToken(user.token) //token will be set on each render
		}}
	,[]) 

	useEffect(()=>{ //Set user's target workout (for a whole week)
		if(user){
			setBackgroundImage("Media/weights_dark_flipped.jpeg")
			setWorkouts(JSON.parse(window.localStorage.getItem("userWorkouts")))
			const regiment=JSON.parse(window.localStorage.getItem("currentRegiment"))
			setCurrentRegiment(regiment) 
		}
		else{
			setBackgroundImage("Media/weightLiftingGirl.png") 
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
		<div className="App" style={{height:"100vh", backgroundImage:`url(${backgroundImage})`,
			backgroundSize:"cover"}}>
			{notification && <Notification color={notification.color} message={notification.message}/>}

			{user ? //if user is logged in
				<>
					{user.regIsSet
						?  //User isn't new and has a regiment set - allow submissions, performance analysis & workout history view
						<div style={{height:"100%",}}>
							<Banner user={user} logout={()=>{logout(setUser) }}/>  
							<Headquarters currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment} user={user} setUser={setUser} setNotification={setNotification} setWorkouts={setWorkouts} workouts={workouts}
								daysExercises={daysExercises} />
						</div>
						:  //if user hasn't set a regiment, do that.
						<LandingPage setNotification={setNotification} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment} user={user} setUser={setUser}/>
					}
				</>
				: //if no user, register or login
				<TransitionGroup style={{height:"100%",display:"flex",  justifyItems:"flex-start"}}>
					<CSSTransition
						key={location}
						timeout={{ enter: 500, exit: 200 }}>
						<Switch>
							<Route path="/register">
								<RegisterForm setNotification={setNotification} submitCredentials={registerService.register}/>
							</Route>
							<Route path="/">
								<LoginForm setNotification={setNotification} submitCredentials={login} setUser={setUser}/> 
							</Route>
						</Switch> 
					</CSSTransition>
				</TransitionGroup>
			}
		</div>
	) 
} 

export default App
