import React,{useState,useEffect} from "react"
import exerciseService from "../../Services/exercises"
import {useHistory} from "react-router-dom"
import DayGrid from "./DayGrid"
import DaySubmissions from "./DaySubmissions"
import Container from "react-bootstrap/Container" 

const RegimentForm=({backButton,user,setUser,currentRegiment, setCurrentRegiment})=>{ 
	/*lists each active day declared by athlete ,and allows appending exercises to them*/

	const [submissionVisibility,setVisibility]=useState("hidden") 
	const history = useHistory() 

	const regimentHasEmptyDay=()=>{  //returns true if any entry is empty
		for (const key in currentRegiment){
			if(currentRegiment[key]&&currentRegiment[key].length===0) 
				return true 
		}
		return false
	}
	

	const finaliseRegiment=async()=>{ //when regiment form has been filled out
		if (!regimentHasEmptyDay()){ // Don't allow submission unless all active days are filled 
			const returnedRegiment=await exerciseService.setRegiment(currentRegiment) 
			//use server's response as data to be set. Also sets regIsSet in server
			const loggedUser=JSON.parse(window.localStorage.getItem("loggedUser"))

			setUser({...user, regIsSet:true}) //update local data
			window.localStorage.setItem("currentRegiment",JSON.stringify(returnedRegiment))
			window.localStorage.setItem("loggedUser",JSON.stringify({...loggedUser,regIsSet:true}))
			history.push("/")
		}
	}
	useEffect(()=>{
		if(!Object.entries(currentRegiment).length){ //No days (happens on refresh), redirect back to selection
			history.push("/") 
		}
	},[])

	useEffect(()=>{
		regimentHasEmptyDay() 
			? setVisibility("hidden")
			: setVisibility("visible") 
	},[currentRegiment]) //Make submission button appear only once everything is filled

	return(
		<div className="pageContainer">
			<Container className="regimentForm" >
				<div className=" regimentForm__fadeContainer HomeRoute a-routeFadeIn"> 
					<h1>Fill out your weekly regiment</h1>
					<div className="regimentForm__weekContainer"> 
						{/*for each  (non-null) day-array in currentRegiment, create a DayGrid to fill in target exercises*/}
						{Object.keys(currentRegiment).map((item,i)=>{  
							if(!currentRegiment[item]){return null}
							return(
								<div key={i} className="regimentForm__dayContainer">
									<DayGrid day={item} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/>
									<DaySubmissions key={item} day={item} setCurrentRegiment={setCurrentRegiment}currentRegiment={currentRegiment}/> 
								</div>
							)
						})}
					</div> 
				</div>
				<div style={{marginBottom:"5px",marginTop:"auto"}}>
					<button className="themed--1" 
						style={{marginRight:"5px",width:"80px",height:"50px",border:"none", 
							visibility:submissionVisibility}}
						onClick={()=>{finaliseRegiment()}}>
					Save
					</button>   

					{backButton &&  //If editing existing regiment from AccountPage, backButton already in MenuCard =>
				<button className="themed--2" style={{width:"80px",height:"50px"}}
					onClick={()=>{history.push("/")}}>
					Back
				</button>   
					} 
				</div>
			</Container>
		</div>
	)
}
export default RegimentForm
