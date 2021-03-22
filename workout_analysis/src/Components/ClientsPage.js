import React,{useState,useEffect} from "react"
import MenuCard from "./MenuCard"

const ClientsPage=({clients})=>{
	const [selectedClient,setSelectedClient]=useState(null) //use this state to send update request to backend if changes happen
	const [editable,setEditable]=useState(false) //Allow editing client 

	useEffect(()=>{ 
		setEditable(false)
	},[selectedClient && selectedClient.username]) //everytime username changes, set editable to false - otherwise would change on every edit

	const toggleDay=(day)=>{
		editable && 
		(day[1]
			? setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment,[day[0]]:null}})
			: setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment,[day[0]]:["New Exercise"]}})
		)} 

	const editExercise=(day,index,newExercise)=>{ 
		editable && 
		setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment,
			[day[0]]:day[1].map((currentExercise,i)=>( 
				i==index
					? newExercise 
					: currentExercise
			))}})} 

	const addExercise=(day)=>{ 
		editable && 
		setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment,
			[day[0]]:day[1].concat("newExercise")}})}

	const removeExercise=(day,index)=>{ 
		editable && 
		setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment,
			[day[0]]:day[1].filter((_,i)=>index!=i)}})}
	
	{if(!clients){return (<div>No clients</div>)}}
	return(
		<div className="pageContainer"> 
			<MenuCard header={"My Clients"} body={ 
				()=>
					<div style={{flexWrap:"wrap",display:"flex"}}>
						{clients.map((client,i)=>( 
							<div onClick={()=>{setSelectedClient(client)}}
								key={i} 
								style={{
									margin:"10px",
									boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.45)", borderRadius: "5px",
									cursor:"pointer",display:"flex",flexDirection:"column", alignItems:"center",
									height:"200px", width:"155px", }}>
								<h5>
									{client.username }
								</h5>
							</div>
						)) }
					</div>
			}/> 
			{selectedClient &&
			<div style={{display:"flex",flexDirection:"column",}} className="resultPage clientView" >
				<div className="client__header" style={{borderBottom:"0.5px solid #CECECE",padding:"40px",display:"flex",}} > 
					<div className="client__details" style={{marginRight:"25px",display:"flex",flexDirection:"column"}}>
						<h5 style={{display:"inline"}}> Username </h5>
						<p style={{display:"inline"}}> {selectedClient.username}</p>
					</div>
					<div className="client__details" style={{display:"flex",flexDirection:"column"}}>
						<h5 style={{display:"inline"}}> Email </h5>
						<p style={{display:"inline"}}> example@example.com</p>
					</div>
					<button onClick={()=>{setEditable(!editable)}}className="themed"> {/*Save function */}
						{editable? "Save" : "Edit"}</button> 
				</div>
				<div className="client__regiment" style={{borderBottom:"0.5px solid #CECECE",padding:"40px",display:"flex",}} > 
					{ Object.entries(selectedClient.currentRegiment)
						.map((day)=>
						{
							const value=day[1]||""
							return (
								<div key={day[0]} style={{display:"flex",flexDirection:"column",margin:"5px"}}>
									<h5> {day[0]} </h5> 
									<input value={value} type="checkbox" onChange={()=>{toggleDay(day)}}readOnly={false} checked={value} />
								</div>)}) 
					}
				</div>
				<div> {/* component class so each has "collapsed" state */}
					{ Object.entries(selectedClient.currentRegiment)
						.map((day)=>
							day[1] &&
							<div key={day[0]}>
								<div style={{marginTop:"20px",display:"flex"}}>
									<h5 style={{display:"inline"}}>	{day[0] } </h5>
									{editable && 
								<button onClick={()=>{addExercise(day)}}className="themed"style={{marginLeft:"auto",display:"inline"}}>Add</button>} {/*To add a new exercise*/}
								</div>
								<ul>
									{day[1].map((exercise,i)=>
										editable
											?
											<div key={i}>
												<input style={{display:"block"}} 
													onChange={(event)=>editExercise(day,i,event.target.value)}
													value={exercise}/>
												<button onClick={()=>{removeExercise(day,i)}}>remove</button> 
											</div>
											: <li key={i}>{exercise}</li>
									)} 
								</ul> 
							</div>)}
				</div> 
			</div> 
			}
		</div> 
	)
}
export default ClientsPage