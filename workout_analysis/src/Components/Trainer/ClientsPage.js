import React,{useEffect,useState} from "react"
import MenuCard from "../MenuCard"
import AddClient from "./AddClient"
import ProfilePicture from "../ProfilePicture"
import ClientCard from "./ClientCard"
import {IoIosAddCircle} from "react-icons/io"


const ClientsPage=({clients,setClients,routines,setNotification })=>{ 
	/*For trainer to view and edit his clients workout details */ 

	const [selectedClient,setSelectedClient]=useState(null) //current client, including any edits
	const [clientIndex,setClientIndex]=useState(null)  //Keep track of selectedClient index in clients state 

	const [choice,setChoice]=useState(false) //message for interactive yes or no notification - false if none,otherwise message string

	const [initials,setInitials]=useState([]) // Each client's initials
	const [profileColors,setProfileColors]=useState([]) // Each client's profile colors

	const stringToColour = function(str) { // Turn client name into hex code ( for profile picture colors )
		var hash = 0
		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash)
		}
		var colour = "#"
		for (var j = 0; j < 3; j++) {
			var value = (hash >> (j * 8)) & 0xFF
			colour += ("00" + value.toString(16)).substr(-2)
		}
		return colour
	} 


	useEffect(()=>{
		if (clients){
			setInitials(clients.map((client)=>client.name.split(" ").map((name)=>name[0]).join(""))) 
			setProfileColors(clients.map(
				(client)=>	stringToColour(client.name) ))
		}
	},[clients])


	
	useEffect(()=>{ 
		setChoice && setChoice(false)  // if notification is active when client switched - disable 
	},[selectedClient])
	
	
	{if(!clients){return (<div>No clients</div>)}}
	return(
		<div className="pageContainer"> 
			<MenuCard header={()=> 
				<div style={{display:"inline-flex",flexDirection:"column",justifyItems:"center"}}>
					<div>
						<p style={{display:"inline",padding:"0px",margin:"0px"}}>My Clients</p> 
						< IoIosAddCircle	style={{cursor:"pointer",marginLeft:"70px",color:"orange",width:"60px",height:"60px"}}
							onClick={()=>{  
								setSelectedClient({username:"",currentRegiment:{Mon:null,Tue:null,Wed:null,Thu:null,Fri:null,Sat:null,Sun:null}})
							}} /> 
					</div>
				</div>
			} 
			body={ 
				()=>
					<div style={{flexWrap:"wrap",display:"flex"}}> 

						{clients.map((client,i)=>(  // cards for existing clients
							<a key={i} 
								onClick={()=>{
									setSelectedClient(client)
									setClientIndex(i) 
								}}
							>

								<div style={{
									margin:"10px",
									textAlign:"center",
									boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.45)", borderRadius: "5px",
									cursor:"pointer",display:"flex",flexDirection:"column", alignItems:"center",
									height:"200px", width:"155px", }}>
									<ProfilePicture color={profileColors[i]} size={105} radius={40}font={"30px Arial"} initials={initials[i]}/>
									<h5>
										{client.name }
									</h5>
								</div>
							</a>
						)) 
						}
					</div>
			}/> 

			{selectedClient && selectedClient.username
				? //edit existing client
				<ClientCard  
					initials={initials[clientIndex]}
					color={profileColors[clientIndex]}
					choice={choice}
					setChoice={setChoice}
					clientIndex={clientIndex}
					selectedClient={selectedClient} setSelectedClient={setSelectedClient} 
					clients={clients} setClients={setClients} 
					routines={routines} 
					setNotification={setNotification} /> 
				: //new client
				<AddClient setClients={setClients} setNotification={setNotification} />
			}
		</div> 
	)
}
export default ClientsPage