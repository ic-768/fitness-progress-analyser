import React,{useEffect} from "react" 
import {
	Switch,
	Route,
	useLocation
} from "react-router-dom"
import RegimentForm from "./RegimentForm"
import DayForm from "./DayForm"
import {CSSTransition, TransitionGroup} from "react-transition-group"

const LandingPage=({setNotification, currentRegiment,setCurrentRegiment,user,setUser})=>{ //Responsible for weekly regiment setup
	const location=useLocation()

	useEffect(()=>{  
		const regiment=JSON.parse(window.localStorage.getItem("currentRegiment"))
		setCurrentRegiment(regiment)
	},[]) 
	
	return (  
		<TransitionGroup style={{height:"100%",flexGrow:"1",display:"flex", flexDirection:"column"}}>
			<CSSTransition
			
				key={location}
				timeout={{ enter: 500, exit: 200 }}>
				<Switch location={location}>
					<Route path="/setTargetWorkout"> {/*second page*/}
						<RegimentForm user={user} setUser={setUser} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/>)
					</Route> 
					<Route path="/"> {/*initial page*/}
						<DayForm setNotification={setNotification} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/> 
					</Route>
				</Switch>
			</CSSTransition>
		</TransitionGroup>
	)
} 

export default LandingPage