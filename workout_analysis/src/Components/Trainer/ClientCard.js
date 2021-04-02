import React,{useState,useEffect} from "react"
import CollapsableList from "./CollapsableList"
import clientService from "../../Services/clients"
import {BsFillTrashFill} from "react-icons/bs"

const ClientCard = ({ clientIndex,clients, setClients,setNotification,setSelectedClient, routines, selectedClient}) => {
/* Card summarising client info for trainer  */

	const [isEditable,setIsEditable]=useState(false) // if client info can be edited

	useEffect(()=>{
		clients && isEditable==false &&  // On cancel
		selectedClient!==clients[clientIndex] && setSelectedClient(clients[clientIndex])  //If differences, revert state to original
	},[isEditable])

	useEffect(()=>{ 
		setIsEditable(false)
	},[selectedClient && selectedClient.username]) //everytime client changes (not just edited), set isEditable to false

	const toggleDay=(day)=>{ // set active day or rest day
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

	const storedClients=JSON.parse(window.localStorage.getItem("clients")) 
	console.log("stored",storedClients)

	const removeClient = async() =>{
		const updatedTrainer=await clientService.removeClient({id:selectedClient._id})
		if(updatedTrainer){ //if operation successful
			setClients(clients.filter((client)=>client._id !=selectedClient._id))
			const storedClients=JSON.parse(window.localStorage.getItem("clients")) 
			const updatedClients=storedClients.filter((client)=>client._id!=selectedClient._id)
			window.localStorage.setItem("clients",JSON.stringify(updatedClients))
			setNotification({color:"green",message:"Client was removed from your account successfully"})
		}
		else{
			setNotification({color:"red",message:"Oops! Something went wrong :("})
		}

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
			try{

				setSelectedClient({...selectedClient,currentRegiment:Object.fromEntries(regiment)})
				const updatedClient=await clientService.updateClient({...selectedClient,currentRegiment:Object.fromEntries(regiment)}) 
				const updatedClients=clients.filter((client)=>client._id!==updatedClient._id).concat(updatedClient)
				window.localStorage.setItem("clients",JSON.stringify(updatedClients))
				setClients(updatedClients) 
				setIsEditable(false)
				setNotification({color:"green",message:"Client updated successfully"})
			}
			catch{ 
				setNotification({color:"red",message:"Something went wrong :("})
			}
		}
	}

	return (
		<div style={{display:"flex",flexDirection:"column",}} className="resultPage clientView" >

			<div className="client__header" 
				style={{ width:"100%",borderBottom:"0.5px solid #CECECE",padding:"40px",display:"flex",}} > 

				<div className="client__details" style={{flexGrow:"1",marginRight:"25px",display:"flex",flexDirection:"column"}}>
					<h5 style={{display:"inline"}}> Name </h5>
					<p style={{display:"inline"}}> {selectedClient.name}</p>
				</div>

				<div className="client__details" style={{flexGrow:"1",marginRight:"25px",display:"flex",flexDirection:"column"}}>
					<h5 style={{display:"inline"}}> Username </h5>
					<p style={{display:"inline"}}> {selectedClient.username}</p>
				</div>
				<div className="client__details" style={{display:"flex",flexDirection:"column"}}>
					<h5 style={{display:"inline"}}> Email </h5>
					<p style={{display:"inline"}}> example@example.com</p>
				</div>

				{isEditable && <button style={{marginLeft:"40px"}} onClick={()=>{ removeClient() }} ><BsFillTrashFill/></button>}
				<button style ={{marginLeft:"40px"}}onClick={()=>{setIsEditable(!isEditable)}}> 
					{isEditable
						? "Cancel" 
						: "Edit"}</button>  
				{isEditable && <button onClick={()=>{ submitClient() }} className="themed">Save</button>}
			</div>
			<div className="grayLine"> 

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
									day={day} 
									isEditable={isEditable} 
									addExercise={addExercise} editExercise={editExercise} 
									removeExercise={removeExercise} routines={routines}/>
					)} 
			</div> 
		</div> 


	)

}

export default ClientCard
