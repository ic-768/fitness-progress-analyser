import React,{useState,useEffect} from "react"
import {CSSTransition, TransitionGroup} from "react-transition-group"
import Container from "react-bootstrap/Container" 
import clientService from "../Services/clients" 
import {useHistory} from "react-router-dom"

const OnBoardTrainer = ({setUser}) => {
	const [trainer, setTrainer]=useState(null)  //To hold newly created "user" data, until the "next" button is pressed
	const [clients, setClients]=useState([]) 
	const [currentClient, setCurrentClient]=useState({name:"",username:"",password:"", validatePassword:""})
	const history = useHistory()

	useEffect(()=>{
		if (trainer){
			window.localStorage.setItem("clients",JSON.stringify(trainer.clients)) 
		}
	},[trainer])

	const clearClient=()=>{ 
		if( currentClient.name && currentClient.username && currentClient.password &&
		(currentClient.password===currentClient.validatePassword))
		{ setClients(clients.concat(currentClient))
			setCurrentClient({name:"",username:"",password:"", validatePassword:""})}
	} 

	const addClient = async(client,index) => { //register client, ID is appended to trainer.
		const updatedTrainer = await clientService.addClient(client) 
		setTrainer(updatedTrainer)
		setClients(clients.filter((client,i)=>index!=i)) //remove client from list after successful creation 
	} 

	const finaliseBoarding=()=> { 
		window.localStorage.removeItem("currentRegiment")
		window.localStorage.removeItem("userWorkouts")
		setUser(trainer)
		history.push("/")
	} 

	return (
		<div className="pageContainer" style={{flexDirection:"column"}}>
			<TransitionGroup style={{height:"100%"}}>
				<CSSTransition 
					key={location}
					timeout={{ enter: 500, exit: 200 }}> 
					<Container className="regimentForm" >
						<form className="regimentForm__fadeContainer HomeRoute a-routeFadeIn" 
							onSubmit={(event)=>{event.preventDefault();clearClient()}} > 
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
									<button onClick={()=>{addClient(client,i)} } style={{marginTop:"140px"}}>Register</button>
								</div>
							))} 
						</form>

						{/*TODO  if refresh and click next when no clients in state-> setUser(trainer) sets to null -> redirects to home. 
						If log in again, should work.*/} 
						<button onClick={()=>{ finaliseBoarding() }}>next</button> 
					</Container>
				</CSSTransition>
			</TransitionGroup>
		</div>
	) 
}
 
export default OnBoardTrainer