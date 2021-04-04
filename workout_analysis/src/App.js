import React,{useState,useEffect} from "react"
import {
	Switch,
	Route,
} from "react-router-dom"

import LoginForm from "./Components/LoginForm"
import RegisterForm from "./Components/RegisterForm"
import Banner from "./Components/Banner"
import LandingPage from "./Components/LandingPage"
import TutorialPage from "./Components/TutorialPage"
import Headquarters_A from "./Components/Athlete/Headquarters_A"
import Headquarters_T from "./Components/Trainer/Headquarters_T"
import Notification from "./Components/Notification"

import registerService from "./Services/register"
import tokenService from "./Services/token"
import {login,logout}from "./Functions/userFunctions" 

function App(){ 
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
							<Headquarters_T user={user} setUser={setUser} setNotification={setNotification} />
						</>
						: //user is an athlete
						<>
							{user.regIsSet 
								?  //User isn't new - allow submissions, performance analysis & workout history view
								<>
									<Banner user={user} logout={()=>{logout(setUser) }}/>  
									<Headquarters_A  user={user} setUser={setUser} setNotification={setNotification}  />
								</>
								:  //if user hasn't set a regiment, do that. 
								<LandingPage  user={user} setUser={setUser} setNotification={setNotification}/>
							}
						</> 
					}
				</>
				: //if no user, register or login
				<div style={{height:"100%",display:"flex",  justifyItems:"flex-start"}}>
					<Switch>
						<Route path="/tutorial">
							<TutorialPage/>
						</Route>
						<Route path="/register">
							<RegisterForm setNotification={setNotification} submitCredentials={registerService.register}/>
						</Route>
						<Route path="/">
							<LoginForm setNotification={setNotification} submitCredentials={login} setUser={setUser}/> 
							<div style={{ padding:"40px",marginTop:"auto",marginLeft:"auto",marginBottom:"57px",

								borderRadius:"20px 0px 0px 20px",
								display:"flex",alignItems:"center",backgroundColor:"white"}}>
								<div>
									<h3 style={{marginBottom:"20px"}}>Demo Accounts:</h3>
									<h4 style={{marginBottom:"10px"}}>Trainer:</h4>
									<h5 style={{marginBottom:"10px"}}>username:ski</h5>
									<h5 style={{marginBottom:"20px"}}>password:ski</h5>
									<h4>Athlete:</h4>
									<h5>username:ic768</h5>
									<h5>password:a</h5>
								</div>
							</div>
						</Route>
					</Switch> 
				</div>
			}
		</div>
	) 
} 

export default App
