import React from "react"
import {useHistory} from "react-router-dom"
import Banner from "../Components/Banner"
import Container from "react-bootstrap/Container"

const DayForm=({setNotification,currentRegiment,setCurrentRegiment})=>{
	const history=useHistory()

	const toggleRegimentDay=(dayKey)=>{  //toggles a specific day between null/empty array
		if (currentRegiment[dayKey]){
			setCurrentRegiment({...currentRegiment, [dayKey]:null})
			return
		}
		setCurrentRegiment({...currentRegiment, [dayKey]:[]})
	} 
	return(
		<div style={{overflow:"auto"}}>
			<Banner/>
			<Container>
				<form  className="dayForm"> 
					<h1 style={{fontWeight:"bold"}}>
						Which days will you be working out on?</h1>
					<div className="dayForm__dayContainer">
						{Object.keys(currentRegiment).map((item,i)=>( 
							<div className="dayForm__dayBox"key={i}>
								<h2 >{item}</h2>
								<input  type="checkbox"  checked={currentRegiment[item]||""}
									onChange={()=>{console.log(currentRegiment);toggleRegimentDay(item)}}/>
							</div>
						))}
					</div>
					<button className="themed" style={{marginTop:"20px"}}
						onClick={(event)=>{
							event.preventDefault()
							let hasAtLeastOne=false
							for (const key in currentRegiment){
								if(currentRegiment[key]){
									hasAtLeastOne=true }
							}
							if (hasAtLeastOne) {
								history.push("/athlete/setTargetWorkout") 
							}
							else{
								setNotification({color:"red", message:"Pick at least one day to exercise!"})
							}
						}}>Next</button> 
				</form>
			</Container>
		</div> 
	)
}

export default DayForm