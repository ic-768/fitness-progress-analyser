import React,{useState,useEffect} from "react"
import Button from "react-bootstrap/Button" 
import exerciseService from "../Services/exercises"
import {useHistory} from "react-router-dom"
import DayGrid from "./DayGrid"

const RegimentForm=({user,setUser,currentRegiment, setCurrentRegiment})=>{ 
	const [submissionVisibility,setVisibility]=useState("hidden") 
	const history = useHistory() 

	const regimentHasEmptyDay=()=>{  //returns true if any entry is empty
		for (const key in currentRegiment){
			if(currentRegiment[key]&&currentRegiment[key].length===0){
				return true
			}
		}
		return false
	}

	const finaliseRegiment=async()=>{ //when regiment form has been filled out
		if (!regimentHasEmptyDay()){ // Don't allow submission unless all active days are filled 
			const returnedRegiment=await exerciseService.setRegiment(currentRegiment) //use server's response as data to be set. Also sets regIsSet in server
			const loggedUser=JSON.parse(window.localStorage.getItem("loggedUser"))

			setUser({...user, regIsSet:true}) //update local data
			window.localStorage.setItem("currentRegiment",JSON.stringify(returnedRegiment))
			window.localStorage.setItem("loggedUser",JSON.stringify({...loggedUser,regIsSet:true}))
			history.push("/")
		}
	}

	useEffect(()=>{
		regimentHasEmptyDay() 
			? setVisibility("hidden")
			: setVisibility("visible")

	},[currentRegiment]) //Make submission button appear only once everything is filled

	return(
		<div>
			<Button style={{visibility:submissionVisibility,
				marginBottom:"80px",width:"80px",height:"80px",
				borderRadius:"20px",paddingRight:"0px",paddingLeft:"0px"}}
			onClick={()=>{finaliseRegiment()}}>
				<h4>DONE</h4>
			</Button>   

			<Button style={{backgroundColor:"green",
				marginBottom:"80px",width:"80px",height:"80px",
				borderRadius:"20px",paddingRight:"0px", paddingLeft:"0px"}}
			onClick={()=>{history.push("/")}}>
				<h4>BACK</h4>
			</Button>   

			<div style={{display:"flex", flexWrap:"wrap",justifyContent:"center", alignItems:"flex-start"}}> 
				{/*for each  (non-null) array in currentRegiment, create a DayGrid to fill in target exercises*/}
				{Object.keys(currentRegiment).map((item,i)=>(  
					<DayGrid key={i} day={item} currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/>
				))} 
			</div >
			<div style={{display:"flex",alignItems:"center", flexDirection:"column"}}>

			</div>
		</div>
	)
}
export default RegimentForm
