import React,{useState} from "react"
import MenuCard from "../MenuCard"
import AddClient from "./AddClient"
import ClientCard from "./ClientCard"
import {GrAddCircle} from "react-icons/gr"

const ClientsPage=({clients,setClients,routines,setNotification })=>{ 
	/*For trainer to view and edit his clients workout details */

	const [selectedClient,setSelectedClient]=useState(null) //current client, including any edits
	const [clientIndex,setClientIndex]=useState(null)  //Keep track of selectedClient index in clients state 
	
	{if(!clients){return (<div>No clients</div>)}}
	return(
		<div className="pageContainer"> 
			<MenuCard header={"My Clients"} body={ 
				()=>
					<div style={{flexWrap:"wrap",display:"flex"}}> 
						<a
							onClick={()=>{ 
								setSelectedClient({username:"",currentRegiment:{Mon:null,Tue:null,Wed:null,Thu:null,Fri:null,Sat:null,Sun:null}})
							}}
							style={{
								margin:"10px",
								boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.45)", borderRadius: "5px",
								cursor:"pointer",display:"flex",flexDirection:"column", alignItems:"center",
								height:"200px", width:"155px", }}>
							<GrAddCircle style={{color:"orange",fontSize:"60px"}}/>
						</a> 
						{clients.map((client,i)=>( 
							<a onClick={()=>{
								setSelectedClient(client)
								setClientIndex(i)}}
							key={i} >

								<div style={{
									margin:"10px",
									boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.45)", borderRadius: "5px",
									cursor:"pointer",display:"flex",flexDirection:"column", alignItems:"center",
									height:"200px", width:"155px", }}>
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