import React,{useState,useEffect} from "react" 
import {useHistory,
	Switch,
	Route,
} from "react-router-dom"
import RegimentForm from "./RegimentForm"
import DayForm from "./DayForm"
import exerciseService from "../Services/exercises"
import Button from "react-bootstrap/Button"

const LandingPage=({currentRegiment,setCurrentRegiment,user,setUser})=>{ //Responsible for weekly regiment setup
	const history = useHistory() 
	const [submissionVisibility,setVisibility]=useState("hidden") 
	//Submission button only visible after all active days have exercises assigned

	const regimentHasEmptyDay=()=>{
		let hasEmpty=false 
		for (const key in currentRegiment){
			if(currentRegiment[key]&&currentRegiment[key].length===0){
				hasEmpty=true //if any of the entries is empty, set flag
				return hasEmpty}
		}
		return hasEmpty
	}

	useEffect(()=>{
		regimentHasEmptyDay() 
			? setVisibility("hidden")
			: setVisibility("visible")
	},[currentRegiment]) //Make submission button appear only once everything is filled

	useEffect(()=>{  
		const regiment=JSON.parse(window.localStorage.getItem("currentRegiment"))
		setCurrentRegiment(regiment)
	},[]) 
	
	//TODO put inside dayForm
	const toggleRegimentDay=(dayKey)=>{  //toggles a specific day between null/empty array
		if (currentRegiment[dayKey]){
			setCurrentRegiment({...currentRegiment, [dayKey]:null})
			return
		}
		setCurrentRegiment({...currentRegiment, [dayKey]:[]})
	} 

	const finaliseRegiment=async()=>{ //when regiment form has been filled out
		if (!regimentHasEmptyDay()){
			const returnedRegiment=await exerciseService.setRegiment(currentRegiment) //use server's response as data to be set. Also sets regIsSet in server
			const loggedUser=JSON.parse(window.localStorage.getItem("loggedUser"))

			setUser({...user, regIsSet:true}) //update local data
			window.localStorage.setItem("currentRegiment",JSON.stringify(returnedRegiment))
			window.localStorage.setItem("loggedUser",JSON.stringify({...loggedUser,regIsSet:true}))
			history.push("/")
		}
	}
	
	
	return (  
		<Switch>

			<Route path="/setTargetWorkout"> {/*second page*/} {/* TODO Show button only when each day is filled*/}
				<Button style={{visibility:submissionVisibility,marginBottom:"80px",width:"80px",height:"80px",borderRadius:"20px",paddingRight:"0px",paddingLeft:"0px"}}onClick={()=>{finaliseRegiment()}}>
					<h4>DONE</h4>
				</Button>   
				<Button style={{backgroundColor:"green",marginBottom:"80px",width:"80px",height:"80px",borderRadius:"20px",paddingRight:"0px",paddingLeft:"0px"}}onClick={()=>{history.push("/")}}>
					<h4>BACK</h4>
				</Button>   
				<div style={{display:"flex", flexWrap:"wrap",justifyContent:"center", alignItems:"flex-start"}}> 
					{/*for each  (non-null) array in currentRegiment, create a RegimentForm to fill in target exercises
					Important: We render one RegimentForm for each active day, whereas DayForm is one unit */}
					{Object.keys(currentRegiment).map((item,i)=>(  
						<RegimentForm key={i} day={item} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/>
					))} 
				</div >
				<div style={{display:"flex",alignItems:"center", flexDirection:"column"}}>

				</div>
			</Route> 

			<Route path="/"> {/*initial page*/}
				<DayForm currentRegiment={currentRegiment} toggleRegimentDay={toggleRegimentDay}/> 
			</Route>
		</Switch>
	)
} 

export default LandingPage
