import React,{useState,useEffect} from "react"
import MenuCard from "./MenuCard"
import CollapsableList from "./CollapsableList"
import AddClient from "./AddClient"
import clientService from "../Services/clients"
import {GrAddCircle} from "react-icons/gr"

const ClientsPage=({user,setUser,clients,setClients,routines,setNotification })=>{ 
	const [selectedClient,setSelectedClient]=useState(null) //use this state to send update request to backend if changes happen
	const [clientIndex,setClientIndex]=useState(null)  //Keep track of client index in clients state
	const [isEditable,setIsEditable]=useState(false) //Allow editing client 

	useEffect(()=>{
		clients && isEditable==false &&  // On cancel
		selectedClient!==clients[clientIndex] && setSelectedClient(clients[clientIndex])  //If differences, revert state to original
	},[isEditable])

	useEffect(()=>{ 
		setIsEditable(false)
	},[selectedClient && selectedClient.username]) //everytime user changes (NOT EDITED), set isEditable to false

	const toggleDay=(day)=>{ // workout day or rest day
		isEditable && 
		(day[1]
			? setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment,[day[0]]:null}})
			: setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment,[day[0]]:[""]}})
		)} 

	const editExercise=(day,index,newExercise)=>{ 
		isEditable && 
		setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment,
			[day[0]]:day[1].map((currentExercise,i)=>( 
				i==index
					? (newExercise.charAt(0).toUpperCase()+ // compare formatted entry
					newExercise.slice(1))
					: currentExercise
			))}})} 

	const addExercise=(day)=>{ 
		isEditable && 
		setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment,
			[day[0]]:day[1].concat("")}})}

	const removeExercise=(day,index)=>{ 
		if (isEditable){ 
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
						const exercises = day[1].filter((exercise)=>(exercise.trim())) //TODO might be redundant -> handling with onblur of inputs
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
			setIsEditable(false)
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
							<div onClick={()=>{if(isEditable){console.log("Are you sure?")}
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

					<div className="client__header" 
						style={{ width:"100%",borderBottom:"0.5px solid #CECECE",padding:"40px",display:"flex",}} > 

						<div className="client__details" style={{flexGrow:"1",marginRight:"25px",display:"flex",flexDirection:"column"}}>
							<h5 style={{display:"inline"}}> Username </h5>
							<p style={{display:"inline"}}> {selectedClient.username}</p>
						</div>
						<div className="client__details" style={{display:"flex",flexDirection:"column"}}>
							<h5 style={{display:"inline"}}> Email </h5>
							<p style={{display:"inline"}}> example@example.com</p>
						</div>
						<button style ={{marginLeft:"40px"}}onClick={()=>{setIsEditable(!isEditable)}}>
							{isEditable
								? "Cancel" 
								: "Edit"}</button>  
						{isEditable && <button onClick={()=>{ submitClient() }} className="themed">Save</button>}
					</div>
					<div className="client__regiment" style={{width:"100%",borderBottom:"0.5px solid #CECECE",padding:"40px",display:"flex"}} > 

						{ Object.entries(selectedClient.currentRegiment)
							.map((day)=>
							{
								const value=day[1]||""
								return (
									<div key={day[0]} style={{flexGrow:"1",display:"flex",flexDirection:"column",alignItems:"center",margin:"5px"}}>
										<h5> {day[0]} </h5> 
										<input value={value} type="checkbox" onChange={()=>{toggleDay(day)}}readOnly={false} checked={value} />
									</div>)}) 
						}
					</div>
					<div style ={{width:"100%"}}>
						{ Object.entries(selectedClient.currentRegiment)
							.map((day)=>
								day[1] &&  //if day has entries, render list
								<CollapsableList key={day[0]} 
									setSelectedClient={setSelectedClient}
									selectedClient={selectedClient}
									day={day} isEditable={isEditable} 
									addExercise={addExercise} editExercise={editExercise} 
									removeExercise={removeExercise} routines={routines}/>
							)} 
					</div> 
				</div> 
				: //new client
				<AddClient setClients={setClients} clients={clients} setUser={setUser} user={user} />
			}
		</div> 
	)
}
export default ClientsPage