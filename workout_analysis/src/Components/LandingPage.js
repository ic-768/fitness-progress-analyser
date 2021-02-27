import React,{useEffect} from "react" 
import {
	Switch,
	Route,
} from "react-router-dom"
import RegimentForm from "./RegimentForm"
import DayForm from "./DayForm"

const LandingPage=({currentRegiment,setCurrentRegiment,user,setUser})=>{ //Responsible for weekly regiment setup
	//Submission button only visible after all active days have exercises assigned


	useEffect(()=>{  
		const regiment=JSON.parse(window.localStorage.getItem("currentRegiment"))
		setCurrentRegiment(regiment)
	},[]) 
	
	//TODO put inside dayForm

	
	
	return (  
		<Switch>

			<Route path="/setTargetWorkout"> {/*second page*/} {/* TODO Show button only when each day is filled*/}
				<RegimentForm  user={user} setUser={setUser} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/>)
			</Route> 

			<Route path="/"> {/*initial page*/}
				<DayForm currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/> 
			</Route>
		</Switch>
	)
} 

export default LandingPage
