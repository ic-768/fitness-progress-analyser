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
import AthleteHeadquarters from "./Components/AhleteHeadquarters"
import TrainerHeadquarters from "./Components/TrainerHeadquarters"
import Notification from "./Components/Notification"

import registerService from "./Services/register"
import tokenService from "./Services/token"
import {login,logout}from "./Functions/userFunctions" 

function App(){ 
	const location=useLocation()
	const [backgroundImage,setBackgroundImage] = useState("Media/weightLiftingGirl.png")
	const [notification,setNotification] = useState(null) //Action feedback + Error messages
	//will be object e.g. {color:"red",message:"text"}

	const [user, setUser] = useState(null) 	
	/*user contains authorization token, username, and bool flag to show if trainer or athlete. 
	Athletes have 1) currentRegiment obj, showing target exercises for each day of week.
								2) days array, showing their whole workout history

	Trainers have 1) clients array
								2) routines array, to save frequently prescribed workout routines for easy access 
	 */ 

	useEffect(()=>{ //Turn off notification after 3 sec
		if(notification){
			setTimeout(() => { 
				setNotification(null)
			}, 3000)
		} 
	},[notification])

	useEffect(()=>{  //Check to see if user is already logged in
		const user = JSON.parse(window.localStorage.getItem("loggedUser"))
		if(user){
			setUser(user)
			tokenService.setToken(user.token) //token will be set on each render
		}}
	,[]) 

	useEffect(()=>{  //different background if logged in
		if (user){ setBackgroundImage("Media/weights_dark_flipped.jpeg") }
		else { setBackgroundImage("Media/weightLiftingGirl.png") }
	}
	,[user]) 

	return ( 
		<div className="App" style={{height:"100vh", backgroundImage:`url(${backgroundImage})`,backgroundSize:"cover"}}>
			{notification && <Notification color={notification.color} message={notification.message}/>}

			{user ? //if user is logged in
				<>
					{user.isTrainer //user is a trainer
						?<>
							<Banner user={user} logout={()=>{logout(setUser) }}/>  
							<TrainerHeadquarters user={user} setUser={setUser} setNotification={setNotification} />
						</>
						: //user is an athlete
						<>
							{user.regIsSet 
								?  //User isn't new - allow submissions, performance analysis & workout history view
								<>
									<Banner user={user} logout={()=>{logout(setUser) }}/>  
									<AthleteHeadquarters  user={user} setUser={setUser} setNotification={setNotification}  />
								</>
								:  //if user hasn't set a regiment, do that. 
								//TODO fix CSS on trainer side
								<LandingPage  user={user} setUser={setUser} setNotification={setNotification}/>
							}
						</> 
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
