import React from "react"
import ToggleButton from "react-bootstrap/ToggleButton"
import Button from "react-bootstrap/Button"
import {useHistory} from "react-router-dom"

const DayForm=({toggleRegimentDay,currentRegiment})=>{
	const history=useHistory()
	return(
		<form style={{display:"flex",flexDirection:"column", alignItems:"center"}}> {/*one checkbox for each day, to toggle if it will be an active day or not*/}
			<h2>Please select only the days that you plan on working out on:</h2>
			<div style={{display:"flex"}}>
				{Object.keys(currentRegiment).map((item,i)=>{ 
					return(
						<div key={i} style={{display:"flex",flexDirection:"column", marginTop:"20px",alignItems:"center"}}>
							<h2>{item}</h2>
							<ToggleButton style={{margin:"5px"}}key={i} checked={currentRegiment[item]} 
								value="" type="checkbox" onChange={()=>{toggleRegimentDay(item)}}/>
						</div>
					)
				})}
			</div>
			<Button onClick={(event)=>{event.preventDefault();history.push("/setTargetWorkout")}}>Next</Button> 
		</form>

	)
}

export default DayForm