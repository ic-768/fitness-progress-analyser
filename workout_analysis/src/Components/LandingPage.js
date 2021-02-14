import React,{useEffect} from "react" 
import {useHistory,
	Switch,
	Route,
} from "react-router-dom"
import DayForm from "./DayForm"

const LandingPage=({currentRegiment,setCurrentRegiment})=>{ 
	const history = useHistory() 

	/* need this so state remains stable on refresh etc. breaks if react hot reload or you press "back" in history. 
	 * Fix by giving explicit checkbox On and Off commands instead of toggling?*/
	useEffect(()=>{  
		const regiment=JSON.parse(window.localStorage.getItem("currentRegiment"))
		setCurrentRegiment(regiment)
	},[]) 
	
	const toggleRegimentDay=(dayKey)=>{ 
		if (currentRegiment[dayKey]){
			setCurrentRegiment({...currentRegiment, [dayKey]:null})
			return
		}
		setCurrentRegiment({...currentRegiment, [dayKey]:[]})
	} 
	
	return (  
		<Switch>

			<Route path="/setTargetWorkout"> {/*second page*/}
				{Object.keys(currentRegiment).map((item,i)=>(  //for each  (non-null) array in currentRegiment, create a dayForm to fill in target exercises
					<DayForm key={i} day={item} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/>
				))} 
				<button>My workout is ready! </button>   
				{/*TODO set regIsSet to true,  remote and local currentRegiment*/}
			</Route> 

			<Route path="/"> {/*initial page*/}
				<>
					<h2>Welcome!</h2>
		Please select only the days that you plan on working out on:

					<form> {/*one checkbox for each day, to toggle if it will be an active day or not*/}
						{Object.keys(currentRegiment).map((item,i)=>( 
							<>
								{item} <input key={i} defaultChecked value="" type="checkbox" onChange={()=>{toggleRegimentDay(item)}}/>
							</>
						))}
						<button onClick={(event)=>{event.preventDefault();history.push("/setTargetWorkout")}}>Submit</button>
					</form>

				</>
			</Route>
		</Switch>
	)
} 

export default LandingPage
