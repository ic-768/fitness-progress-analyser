import React from "react"
import ToggleButton from "react-bootstrap/ToggleButton"
import Button from "react-bootstrap/Button"
import {useHistory} from "react-router-dom"
import  Container from "react-bootstrap/Container"
import Banner from "../Components/Banner"

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
		<div style={{ display:"flex", flexDirection:"column", flexGrow:"1"}}className="HomeRoute a-routeFadeIn">
			<Banner/>
			<Container style={{ flexGrow:"1",display:"flex",flexDirection:"column", justifyContent:"center"}}>
				<form style={{padding:"50px",borderRadius:"20px",backgroundColor:"rgb(255,255,255,0.35)",display:"flex",flexDirection:"column", alignItems:"center"}}> {/*one checkbox for each day, to toggle if it will be an active day or not*/}
					<h1 style={{borderRadius:"20px",padding:"20px",backgroundColor:"rgb(255,255,255,0.95)",fontWeight:"bold",color:"black",marginTop:"40px"}}>Which days will you be working out on?</h1>
					<div style={{flexWrap:"wrap",marginTop:"20px",display:"flex", justifyContent:"center",justifyItems:"center"}}>
						{Object.keys(currentRegiment).map((item,i)=>{ 
							return(
								<div key={i} style={{ 
									backgroundColor:currentRegiment[item]
										? "rgb(0,200,0)"
										: "rgb(172,100,100)", margin:"20px",borderRadius:"10px",border:"1px solid white",display:"flex",flexDirection:"column", alignItems:"center", }}>
									<h2 style={{color:"white"}}>{item}</h2>
									<ToggleButton size="lg"style={{backgroundColor:"white",borderRadius:"50%",margin:"20px"}}key={i} checked={currentRegiment[item]} 
										value="" type="checkbox" onChange={()=>{toggleRegimentDay(item)}}>
									</ToggleButton>
								</div>
							)
						})}
					</div>
					<Button size="lg"style={{marginTop:"20px",backgroundColor:"green"}}onClick={(event)=>{
						event.preventDefault();history.push("/setTargetWorkout")}}>Next</Button> 
				</form>
			</Container>
		</div>

	)
}

export default DayForm