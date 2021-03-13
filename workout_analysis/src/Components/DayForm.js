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
				<form style={{backgroundColor:"white",margin:"40px",padding:"50px",borderRadius:"5px",display:"flex",flexDirection:"column", alignItems:"center"}}> {/*one checkbox for each day, to toggle if it will be an active day or not*/}
					<h1 style={{borderRadius:"20px",padding:"20px",fontWeight:"bold",color:"black",marginTop:"40px"}}>Which days will you be working out on?</h1>
					<div style={{flexWrap:"wrap",marginTop:"20px",display:"flex", justifyContent:"center",justifyItems:"center"}}>
						{Object.keys(currentRegiment).map((item,i)=>( 
							<div style ={{display:"flex", flexDirection:"column",alignItems:"center",width:"150px",margin:"10px",padding:"10px",borderRadius:"5px",border:"1px solid black"}}key={i}>
								<h2 >{item}</h2>
								<input className="themedCheckbox" type="checkbox"  checked={currentRegiment[item]||""}
									onChange={()=>{console.log(currentRegiment);toggleRegimentDay(item)}}/>
							</div>
						)
						)}
					</div>
					<button style={{height:"40px",marginTop:"20px",backgroundColor:"#FF8933",border:"none", borderRadius:"5px"}}
						onClick={(event)=>{
							event.preventDefault()
							let hasAtLeastOne=false
							for (const key in currentRegiment){
								if(currentRegiment[key]){ hasAtLeastOne=true 
								}}
							if (hasAtLeastOne) {
								history.push("/setTargetWorkout") 
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