import React from "react" 
import {Switch,Route,useHistory} from "react-router-dom"
import { GoPlusSmall } from "react-icons/go"
import Analysis from "./Analysis"
import History from "./History"
import ExerciseSubmission from "./ExerciseSubmission"
import AccountPage from "./AccountPage"

const HeadQuarters=({currentRegiment, setCurrentRegiment, user, setUser,setNotification,setWorkouts,workouts, daysExercises})=>{

	const centeredStyle={marginBottom:"40px",marginTop:"4px",display:"flex", alignItems:"center",}
	const linkStyle = {display:"inline", color:"white", cursor:"pointer"}

	const history=useHistory()
	
	return (
		<Switch>
			<Route path="/account">
				<AccountPage  setNotification={setNotification} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment} user={user}setUser={setUser}/>

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
				<div style={{height:"100%",display:"flex"}}>
					<div 
						style={{marginLeft:"80px",marginTop:"150px",display:"flex",flexDirection:"column", }}>
						<div onClick={()=>{history.push("/dailySubmission")}}style={centeredStyle}>
							<h2 style={linkStyle}>
								<a> <GoPlusSmall style={{color:"white"}}/> Submit a Workout </a>
							</h2> 

						</div>
						<div onClick={()=>{history.push("/history")}}
							style={centeredStyle}> 
							<h2 style={linkStyle}>
								<a> <GoPlusSmall style={{color:"white"}} /> My Workout History </a>
							</h2>
						</div> 
						<div onClick={()=>{history.push("/analysis")}}
							style={centeredStyle}>
							<h2 style={linkStyle}> 
								<a> <GoPlusSmall style={{color:"white"}}/> Performance Analysis </a>
							</h2> 
						</div>
						<div onClick={()=>{history.push("/account")}}
							style={centeredStyle}>
							<h2 style={linkStyle}> 
								<a> <GoPlusSmall style={{color:"white"}}/>My Account</a>
							</h2> 
						</div>
					</div>
				</div>
				{workouts && workouts.length>0 
					?(<h1 style={{position:"absolute", bottom:"0",marginBottom:"60px",marginLeft:"60px",color:"white"}}> Welcome Back</h1>) 
					: <h1 style={{position:"absolute", bottom:"0",marginBottom:"60px",marginLeft:"60px",color:"white"}}>Welcome!</h1>
				}</Route>
		</Switch>
	)
}

export default HeadQuarters
