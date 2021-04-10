import React,{useState,useEffect} from "react"
import CollapsableList from "./CollapsableList"
import clientService from "../../Services/clients"
import {BsFillTrashFill} from "react-icons/bs"
import NotificationChoice from "../NotificationChoice"
import ProfilePicture from "../ProfilePicture"
import { RiPencilLine} from "react-icons/ri"
import {GiCancel} from "react-icons/gi"
import CheckBox from "../CheckBox"


const ClientCard = ({ color,initials,choice,setChoice,clientIndex,clients,setClients,setNotification,setSelectedClient,routines,selectedClient}) => {
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

	const removeClient = async() =>{
		const updatedTrainer=await clientService.removeClient({id:selectedClient._id})
		if(updatedTrainer){ //if operation successful
			setClients(clients.filter((client)=>client._id !=selectedClient._id))
			const storedClients=JSON.parse(window.localStorage.getItem("clients")) 
			const updatedClients=storedClients.filter((client)=>client._id!=selectedClient._id)
			window.localStorage.setItem("clients",JSON.stringify(updatedClients))
			setNotification({color:"green",message:"Client was removed from your account successfully"})
			setSelectedClient(null)
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
		<div style={{ 
			display:"flex",flexDirection:"column",}} className="resultPage clientView" > 
			{choice && 
			<NotificationChoice 
				message={`Are you sure you want to remove ${selectedClient.name} from your supervision?`} 
				yesCallback={()=>{removeClient();setChoice(false)}} 
				noCallback={()=>{setChoice(false)}}
			/>
			}

			<div className="client__header"
				style={{ 
					minHeight:"230px", 
					margin:"20px",alignItems:"center",width:"100%",
					borderBottom:"0.5px solid #CECECE",
					marginBottom:"0px",
					padding:"40px",paddingLeft:"0px",display:"flex",}} > 
				<ProfilePicture color={color} font={"30px Arial"} radius={70} size={150} initials={initials}/>
				<div className="client__details" style={{marginLeft:"30px",flexGrow:"1",marginRight:"25px",display:"flex",flexDirection:"column"}}>
					<p style={{display:"inline"}}> Name </p>
					<h5 style={{display:"inline"}}> {selectedClient.name}</h5>
				</div>


				<div className="client__details" style={{flexGrow:"1",marginRight:"25px",display:"flex",flexDirection:"column"}}>
					<p style={{display:"inline"}}> Username </p>
					<h5 style={{display:"inline"}}> {selectedClient.username}</h5>
				</div>

				<div style={{display:"flex", flexDirection:"column",}}>

					<button className={isEditable
						? "themed--2"  
						: "themed--1"}
					style ={{marginBottom:"40px",alignSelf:"start",borderRadius:"50%",width:"40px",height:"40px",marginLeft:"40px",marginRight:"10px"}} 
					onClick={()=>{setIsEditable(!isEditable)}}> 
						{isEditable 
							? <GiCancel size="30px"/>
							: <RiPencilLine size="30px"/>
						}
					</button>  
					<button className="themed--2" style={{backgroundColor:"white",color:"#ff8933",
						boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
						width:"40px",height:"40px",borderRadius:"50%",marginLeft:"40px"}} onClick={()=>{ setChoice(true) }} >
						<BsFillTrashFill size="20px"/>
					</button>

				</div>
			</div>
			<div style={{width:"100%"}}>{/*two divs because safari makes life unbearable*/}
				<div className="grayLine" > 
					{ Object.entries(selectedClient.currentRegiment)
						.map((day)=>
						{
							const value=day[1]||""
							return (
								<div key={day[0]} style={{display:"flex",flexDirection:"column",width:"100%"}} > {/*safari...*/}
									<div style={{display:"flex",flexDirection:"column",alignItems:"center",margin:"0px"}}>
										<h5> {day[0]} </h5> 
										<CheckBox callback={()=>{toggleDay(day)}} value={value}/>
									</div>
								</div>)}) 
					}
				</div>
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
			{isEditable && 
			<div style={{width:"100%",display:"flex"}}>
				<button style={{margin:"20px",marginLeft:"auto",width:"60px"}}className="themed--1" 
					onClick={()=>{ submitClient() }} >Save</button>
			</div>
			}
		</div> 
	) 
}

export default ClientCard
