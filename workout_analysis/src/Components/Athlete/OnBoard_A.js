import React,{useState,useEffect} from "react" 
import {
	Switch,
	Route,
	useLocation
} from "react-router-dom"

import RegimentForm from "./RegimentForm"
import DayForm from "./DayForm"

const OnBoardAthlete=({setNotification, user,setUser})=>{ 
	//Responsible for weekly regiment setup
	const location=useLocation()
	const [currentRegiment, setCurrentRegiment]=useState({})

	useEffect(()=>{  
		const regiment=JSON.parse(window.localStorage.getItem("currentRegiment"))
		setCurrentRegiment(regiment)
	},[]) 
	
	return (  
		<Switch location={location}>
			<Route path="/athlete/setTargetWorkout"> {/*second page*/}
				<RegimentForm backButton={true} user={user} setUser={setUser} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/>)
			</Route> 
			<Route path="/"> {/*initial page*/}
				<DayForm setNotification={setNotification} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/> 
			</Route>
		</Switch>
	)
} 

export default OnBoardAthlete