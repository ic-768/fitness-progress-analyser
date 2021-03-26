import React,{useState,useEffect} from "react"
import MenuCard from "./MenuCard"
import AddClient from "./AddClient"
import clientService from "../Services/clients"
import {GrAddCircle} from "react-icons/gr"

const ClientsPage=({user,setUser,clients,setClients,setNotification })=>{ //TODO add a new client
	const [selectedClient,setSelectedClient]=useState(null) //use this state to send update request to backend if changes happen
	const [clientIndex,setClientIndex]=useState(null)  //Keep track of client index in clients state
	const [editable,setEditable]=useState(false) //Allow editing client 

	useEffect(()=>{
		clients && editable==false &&  // On cancel
		selectedClient!==clients[clientIndex] && setSelectedClient(clients[clientIndex])  //If differences, revert state to original
	},[editable])

	useEffect(()=>{ 
		setEditable(false)
	},[selectedClient && selectedClient.username]) //everytime username changes, set editable to false - otherwise would change on every edit

	const toggleDay=(day)=>{ // workout day or rest day
		editable && 
		(day[1]
			? setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment,[day[0]]:null}})
			: setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment,[day[0]]:[""]}})
		)} 

	const editExercise=(day,index,newExercise)=>{ 
		editable && 
		setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment,
			[day[0]]:day[1].map((currentExercise,i)=>( 
				i==index
					? (newExercise.charAt(0).toUpperCase()+ // compare formatted entry
					newExercise.slice(1))
					: currentExercise
			))}})} 

	const addExercise=(day)=>{ 
		editable && 
		setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment,
			[day[0]]:day[1].concat("")}})}

	const removeExercise=(day,index)=>{ 
		if (editable){ 
			const updatedDay=selectedClient.currentRegiment[day[0]].filter((_,i)=>index!==i)
			if(updatedDay.length===0)
			{  //set day to null
				setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment, [day[0]]:null}})
			} 
			else{ //set day to filtered array
				setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment, [day[0]]:updatedDay}})}} 
	} 
	
	const submitClient=async()=>{ 
		let containsDuplicate=false
		const regiment=Object.entries(selectedClient.currentRegiment) 
			.map((day)=>{
				if(day[1] && new Set(day[1]).size != day[1].length){ //If duplicate exercise on same day
					containsDuplicate=true  //set Notification
				}
				else{
					if(day[1]){ //filter whitespace entries
						const exercises = day[1].filter((exercise)=>(exercise.trim()))
						return [day[0], exercises.length===0 
							? null // no valid entries?
							: exercises ] //exercise array 
					}
					else{ //rest day
						return [day[0],null]
					}
				}
			})
		if (containsDuplicate){
			setNotification({color:"red",message:"Looks like you've assigned the same exercise twice in the same day :)"})
		}
		else{  //submit
			//TODO try catch
			setSelectedClient({...selectedClient,currentRegiment:Object.fromEntries(regiment)})
			const updatedClient=await clientService.updateClient({...selectedClient,currentRegiment:Object.fromEntries(regiment)}) 
			const updatedClients=clients.filter((client)=>client._id!==updatedClient._id).concat(updatedClient)
			window.localStorage.setItem("clients",JSON.stringify(updatedClients))
			setClients(updatedClients) 
			setEditable(false)
			setNotification({color:"green",message:"Client updated successfully"})
		}
	}
	
	{if(!clients){return (<div>No clients</div>)}}
	return(
		<div className="pageContainer"> 
			<MenuCard header={"My Clients"} body={ 
				()=>
					<div style={{flexWrap:"wrap",display:"flex"}}>

						<div
							onClick={()=>{ 
								setSelectedClient({username:"",currentRegiment:{Mon:null,Tue:null,Wed:null,Thu:null,Fri:null,Sat:null,Sun:null}})
							}}
							style={{
								margin:"10px",
								boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.45)", borderRadius: "5px",
								cursor:"pointer",display:"flex",flexDirection:"column", alignItems:"center",
								height:"200px", width:"155px", }}>
							<GrAddCircle style={{color:"orange",fontSize:"60px"}}/>
						</div>

						{clients.map((client,i)=>( 
							<div onClick={()=>{if(editable){console.log("Are you sure?")}
								setSelectedClient(client)
								setClientIndex(i)}}
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
			{selectedClient && selectedClient.username
				? //edit existing client
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
						<button onClick={()=>{setEditable(!editable)}}>
							{editable
								? "Cancel" 
								: "Edit"}</button>  
						{editable && <button onClick={()=>{ submitClient() }} className="themed">Save</button>}
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
								<div style={{marginTop:"20px",display:"flex",alignItems:"center",}}>
									<h5 style={{display:"inline",margin:"0px"}}>	{day[0] } </h5>
									{editable && 
								<button onClick={()=>{addExercise(day)}}
									className="themed"style={{marginLeft:"15px",display:"inline"}}>
									Add
								</button>}
								</div>
								<ul>
									{day[1].map((exercise,i)=>
										editable
											?
											<div key={i} style={{margin:"5px",display:"flex"}}>
												<input style={{display:"block"}} 
													onBlur={(event)=>{editExercise(day,i,event.target.value.trim())} } //on unfocus, remove trailing whitespace
													onChange={(event)=>editExercise(day,i,event.target.value)}
													value={exercise}/>
												<button onClick={()=>{removeExercise(day,i)}}>remove</button> 
											</div>
											: <li key={i}>{exercise}</li>
									)} 
								</ul> 
							</div>)}
						{//TODO  analysis plots - filter by name, select analysis. Be able to add multiple plots for side by side ( vertical ) analysis
						}


					</div> 
				</div> 
				: //new client
				<div>
					<AddClient setClients={setClients} clients={clients} setUser={setUser} user={user} />
				</div>
			}
		</div> 
	)
}
export default ClientsPage