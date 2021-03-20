import React,{useState} from "react"
import {CSSTransition, TransitionGroup} from "react-transition-group"
import Container from "react-bootstrap/Container" 
import clientService from "../Services/clients" 

const OnBoardTrainer = () => {
	const [clients, setClients]=useState([]) 
	const [currentClient, setCurrentClient]=useState({name:"",username:"",password:"", validatePassword:""})

	const addClient=()=>{ 
		if( currentClient.name && currentClient.username && currentClient.password &&
		(currentClient.password===currentClient.validatePassword))
		{ setClients(clients.concat(currentClient))
			setCurrentClient({name:"",username:"",password:"", validatePassword:""})}
	} 

	const finaliseClient = async(client) => {
		const updatedTrainer = await clientService.sendClient(client)
		console.log(updatedTrainer)

		//const returnedRegiment=await exerciseService.setRegiment(currentRegiment) 
		//const loggedUser=JSON.parse(window.localStorage.getItem("loggedUser")) 
		//setUser({...user, regIsSet:true}) //update local data
		//window.localStorage.setItem("currentRegiment",JSON.stringify(returnedRegiment))
		//window.localStorage.setItem("loggedUser",JSON.stringify({...loggedUser,regIsSet:true}))
		//history.push("/")
	} 
	return (
		<div className="pageContainer" style={{flexDirection:"column"}}>
			<TransitionGroup style={{height:"100%"}}>
				<CSSTransition 
					key={location}
					timeout={{ enter: 500, exit: 200 }}> 
					<Container className="regimentForm" >
						<form className="regimentForm__fadeContainer HomeRoute a-routeFadeIn" onSubmit={(event)=>{event.preventDefault();addClient()}} > 
							<h1>Add some of your clients </h1>
							<div style={{marginTop:"40px",display:"flex", flexDirection:"column",alignItems:"center",}}>

								<div>
									<input onChange={(event)=>{ setCurrentClient({...currentClient,name:event.target.value}) }} 
										placeholder={currentClient.name || "client name"}
										value={currentClient.name} /> 
									<input onChange={(event)=>{setCurrentClient({...currentClient,password:event.target.value}) }} 
										placeholder={currentClient.password || "client password"}
										value={currentClient.password}/> 

								</div>
								<div>
									<input onChange={(event)=>{ setCurrentClient({...currentClient,username:event.target.value}) }} 
										placeholder={currentClient.username || "client username"}
										value={currentClient.username} /> 

									<input onChange={(event)=>{ setCurrentClient({...currentClient,validatePassword:event.target.value}) }}
										placeholder={currentClient.validatePassword || "repeat client password"} 
										value={currentClient.validatePassword} /> 
								</div>		
								<button type="submit" 
									className="themed" style={{margin:"20px",width:"50px", height:"50px"}}>
										add
								</button>
							</div>

							<h1 style={{marginTop:"140px"}}>Clients added:</h1>
							{clients.map((client,i)=>(
								<div key={i}>
									{client.name}
									<button onClick={()=>{finaliseClient(client)} } style={{marginTop:"140px"}}>Register</button>
								</div>
							))}
							

						</form>
					</Container>
				</CSSTransition>
			</TransitionGroup>
		</div>
	) 
}
 
export default OnBoardTrainer