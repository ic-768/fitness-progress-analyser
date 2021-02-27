import React from "react"
import ToggleButton from "react-bootstrap/ToggleButton"
import Button from "react-bootstrap/Button"
import {useHistory} from "react-router-dom"

const DayForm=({currentRegiment,setCurrentRegiment})=>{
	const history=useHistory()

	const toggleRegimentDay=(dayKey)=>{  //toggles a specific day between null/empty array
		if (currentRegiment[dayKey]){
			setCurrentRegiment({...currentRegiment, [dayKey]:null})
			return
		}
		setCurrentRegiment({...currentRegiment, [dayKey]:[]})
	} 
	return(
		<form style={{padding:"50px",borderRadius:"20px",backgroundColor:"rgb(0,0,0,0.85)",display:"flex",flexDirection:"column", alignItems:"center"}}> {/*one checkbox for each day, to toggle if it will be an active day or not*/}
			<div style={{flexWrap:"wrap",marginTop:"20px",display:"flex", justifyContent:"center",justifyItems:"center"}}>
				{Object.keys(currentRegiment).map((item,i)=>{ 
					return(
						<div key={i} style={{backgroundColor:"black",margin:"20px",borderRadius:"10px",border:"1px solid white",display:"flex",flexDirection:"column", alignItems:"center", }}>
							<h2>{item}</h2>
							<ToggleButton style={{margin:"20px"}}key={i} checked={currentRegiment[item]} 
								value="" type="checkbox" onChange={()=>{toggleRegimentDay(item)}}>
							</ToggleButton>
						</div>
					)
				})}
			</div>
			<h1 style={{marginTop:"40px"}}>Which days will you be working out on?</h1>
			<Button size="lg"style={{marginTop:"20px",backgroundColor:"green"}}onClick={(event)=>{event.preventDefault();history.push("/setTargetWorkout")}}>Next</Button> 
		</form>

	)
}

export default DayForm