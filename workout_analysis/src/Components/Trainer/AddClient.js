import React,{useState} from "react"
import clientService from "../../Services/clients" 

const AddClient=({setNotification,setClients})=>{  
	/*form for trainer to add a new client after on Boarding*/

	const submitClient=async ()=>{
		if (currentClient.name  //all fields filled in
			&& currentClient.username 
			&& currentClient.password 
			&& (currentClient.password===currentClient.validatePassword)){ //password typed correctly twice
			const updatedTrainer=await clientService.addClient(currentClient)
			if (updatedTrainer){ 
				window.localStorage.setItem("clients",JSON.stringify(updatedTrainer.clients))
				setClients(updatedTrainer.clients)
				setCurrentClient({name:"",username:"", password:"",validatePassword:""})
				setNotification({color:"green",message:"Client added successfully!"}) 
			}
			else{
				setNotification({color:"red",message:"Something went wrong. Try a different username"}) 
			}

		}
	} 

	const [currentClient,setCurrentClient]=
	useState({name:"",username:"", password:"",validatePassword:""})

	return(
		<form className="resultPage" style={{display:"flex", flexDirection:"column",alignItems:"center"}}
			onSubmit={(event)=>{event.preventDefault(); submitClient(currentClient)}
			}> 
			<h1>Add a client </h1>
			<div style={{marginTop:"40px",display:"flex", flexDirection:"column",alignItems:"center",}}>

				<div style={{display:"flex",flexDirection:"column"}}>
					<h1>Username</h1>
					<input onChange={(event)=>{ setCurrentClient({...currentClient,name:event.target.value}) }} 
						placeholder={currentClient.name || "client name"} 
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
					className="themed--1" style={{marginTop:"60px",width:"60px", height:"40px"}}>
										add
				</button>
			</div> 
		</form>

	)
}
export default AddClient