import React,{useEffect} from "react" 
import {useHistory,
	Switch,
	Route,
} from "react-router-dom"
import DayForm from "./DayForm"
import exerciseService from "../Services/exercises"

const LandingPage=({currentRegiment,setCurrentRegiment,user,setUser})=>{
	const history = useHistory() 

	/* need this effect so state doesn't break on refresh or "back".
	 * Fix by giving explicit checkbox On and Off commands instead of toggling?*/
	useEffect(()=>{  
		const regiment=JSON.parse(window.localStorage.getItem("currentRegiment"))
		setCurrentRegiment(regiment)
	},[]) 
	
	const toggleRegimentDay=(dayKey)=>{  //toggles a specific day between null/empty array
		if (currentRegiment[dayKey]){
			setCurrentRegiment({...currentRegiment, [dayKey]:null})
			return
		}
		setCurrentRegiment({...currentRegiment, [dayKey]:[]})
	} 

	const finaliseRegiment=()=>{ //when regiment form has been filled out
		const returnedRegiment=exerciseService.setRegiment(currentRegiment) //use server's response as data to be set. Also sets regIsSet in server
		const loggedUser=JSON.parse(window.localStorage.getItem("loggedUser"))

		setUser({...user, regIsSet:true}) //update local data
		window.localStorage.setItem("currentRegiment",JSON.stringify(returnedRegiment))
		window.localStorage.setItem("loggedUser",JSON.stringify({...loggedUser,regIsSet:true}))
		history.push("/")
	}
	
	return (  
		<Switch>

			<Route path="/setTargetWorkout"> {/*second page*/}
				{Object.keys(currentRegiment).map((item,i)=>(  //for each  (non-null) array in currentRegiment, create a dayForm to fill in target exercises
					<DayForm key={i} day={item} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/>
				))} 
				<button onClick={()=>{finaliseRegiment()}}>All set!</button>   
			</Route> 

			<Route path="/"> {/*initial page*/}
				<>
					<h2>Welcome!</h2>
		Please select only the days that you plan on working out on:

					<form> {/*one checkbox for each day, to toggle if it will be an active day or not*/}
						{Object.keys(currentRegiment).map((item,i)=>( 
							<div key={i}>
								{item} <input key={i} defaultChecked value="" type="checkbox" onChange={()=>{toggleRegimentDay(item)}}/>
							</div>
						))}
						<button onClick={(event)=>{event.preventDefault();history.push("/setTargetWorkout")}}>Submit</button>
					</form>

				</>
			</Route>
		</Switch>
	)
} 

export default LandingPage
