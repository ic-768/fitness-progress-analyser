import React from "react" 
const LandingPage=({currentRegiment,setCurrentRegiment})=>{ 

	const toggleRegimentDay=(dayKey)=>{ 
		if (currentRegiment[dayKey]){
			setCurrentRegiment({...currentRegiment, [dayKey]:null})
			return
		}
		setCurrentRegiment({...currentRegiment, [dayKey]:[]})
	}
	
	console.log(currentRegiment)

	return (  //Add whole Routing point here to take over to exercise Submissions
		<>
			<h2>Welcome to my app!</h2>
		Please select the days that you plan on working out:

			<form>
				{/*//Monday's checkbox*/}
				<input defaultChecked value="" type="checkbox" onChange={()=>{toggleRegimentDay("Mon")}}/>
				<input defaultChecked value="" type="checkbox" onChange={()=>{toggleRegimentDay("Tue")}}/>
				<input defaultChecked value="" type="checkbox" onChange={()=>{toggleRegimentDay("Wed")}}/>
				<input defaultChecked value="" type="checkbox" onChange={()=>{toggleRegimentDay("Thu")}}/>
				<input defaultChecked value=""type="checkbox" onChange={()=>{toggleRegimentDay("Fri")}}/>
				<input defaultChecked value=""type="checkbox" onChange={()=>{toggleRegimentDay("Sat")}}/>
				<input defaultChecked value=""type="checkbox" onChange={()=>{toggleRegimentDay("Sun")}}/>
				
			</form>

		</>
	)
} 

export default LandingPage
