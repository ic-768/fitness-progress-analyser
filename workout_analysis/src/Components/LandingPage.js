import React,{useEffect} from "react" 
import {useHistory,
	Switch,
	Route,
} from "react-router-dom"
import RegimentForm from "./RegimentForm"
import DayForm from "./DayForm"
import exerciseService from "../Services/exercises"
import Button from "react-bootstrap/Button"

const LandingPage=({currentRegiment,setCurrentRegiment,user,setUser})=>{ //TODO make pretty 
	const history = useHistory() 

	/* need this effect so state doesn't break on maniacal refreshing or back's.*/
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

	const finaliseRegiment=async()=>{ //when regiment form has been filled out
		if (currentRegiment.length>0){
			const returnedRegiment=await exerciseService.setRegiment(currentRegiment) //use server's response as data to be set. Also sets regIsSet in server
			const loggedUser=JSON.parse(window.localStorage.getItem("loggedUser"))

			setUser({...user, regIsSet:true}) //update local data
			window.localStorage.setItem("currentRegiment",JSON.stringify(returnedRegiment))
			window.localStorage.setItem("loggedUser",JSON.stringify({...loggedUser,regIsSet:true}))
			history.push("/")}

		else{console.log("You didn't input any exercises :(")}
	}
	
	return (  
		<Switch>

			<Route path="/setTargetWorkout"> {/*second page*/}
				<div style={{display:"flex", justifyContent:"center", alignItems:"flex-start"}}>

					{/*for each  (non-null) array in currentRegiment, create a RegimentForm to fill in target exercises
					Important: We render one RegimentForm for each active day, whereas DayForm is one unit */}
					{Object.keys(currentRegiment).map((item,i)=>(  
						<RegimentForm key={i} day={item} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/>
					))} 
				</div >
				<div style={{display:"flex",alignItems:"center", flexDirection:"column"}}>
					<Button style={{position:"absolute",bottom:"0",marginBottom:"80px",width:"100px",height:"100px",borderRadius:"20px",paddingRight:"0px",paddingLeft:"0px"}}onClick={()=>{finaliseRegiment()}}>
						<h4>DONE</h4>
					</Button>   

				</div>
			</Route> 

			<Route path="/"> {/*initial page*/}
				<DayForm currentRegiment={currentRegiment} toggleRegimentDay={toggleRegimentDay}/> 
			</Route>
		</Switch>
	)
} 

export default LandingPage
