import React,{useState,useEffect} from "react"
import clientService from "../Services/clients" 

const AddClient=({setClients,clients,setUser,user})=>{ 

	useEffect(()=>{
		window.localStorage.setItem("clients",JSON.stringify(user.clients)) 
	},[user])

	const submitClient=async ()=>{ //TODO  UPDATE LOCAL STORAGE
		if( currentClient.name 
			&& currentClient.username 
			&& currentClient.password 
			&&
		(currentClient.password===currentClient.validatePassword)){
			const updatedTrainer=await clientService.addClient(currentClient)
			setUser(updatedTrainer)
			setClients(clients.concat(currentClient))
			setCurrentClient({username:"", password:"",validatePassword:""})
		}
	} 

	const [currentClient,setCurrentClient]=
	useState({username:"", password:"",validatePassword:""})

	return(
		<form className="resultPage" style={{display:"flex", flexDirection:"column",alignItems:"center"}}
			onSubmit={(event)=>{event.preventDefault(); submitClient(currentClient)}
			}> 
			<h1>Add a client </h1>
			<div style={{marginTop:"40px",display:"flex", flexDirection:"column",alignItems:"center",}}>

				<div style={{display:"flex",flexDirection:"column"}}>
					<h1>Username</h1>
					<input onChange={(event)=>{ setCurrentClient({...currentClient,name:event.target.value}) }} 
						placeholder={currentClient.name || "client name"} //TODO set value to user name - changing from uncontrolled to controlled
						value={currentClient.name} /> 
					<input onChange={(event)=>{ setCurrentClient({...currentClient,username:event.target.value}) }} 
						placeholder={currentClient.username || "client username"}
						value={currentClient.username} /> 

				</div>
				<div style={{marginTop:"20px",display:"flex",flexDirection:"column"}}>
					<h1>Password</h1>
					<input onChange={(event)=>{setCurrentClient({...currentClient,password:event.target.value}) }} 
						placeholder={currentClient.password || "client password"}
						value={currentClient.password}/> 

					<input onChange={(event)=>{ setCurrentClient({...currentClient,validatePassword:event.target.value}) }}
						placeholder={currentClient.validatePassword || "repeat client password"} 
						value={currentClient.validatePassword} /> 
				</div>		
				<button type="submit"  
					className="themed" style={{margin:"20px",width:"50px", height:"50px"}}>
										add
				</button>
			</div> 
		</form>

	)
}
export default AddClient