import React,{useState,useEffect} from "react"
import {CSSTransition, TransitionGroup} from "react-transition-group"
import Container from "react-bootstrap/Container" 
import clientService from "../../Services/clients" 
import {useHistory} from "react-router-dom"

const OnBoardTrainer = ({setNotification,setUser}) => {
	//TODO show added Clients to user?
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
		if (!updatedTrainer){
			setNotification({color:"red",message:"Client couldn't be added. Try a different username!" })
			setClients(clients.filter((client,i)=>index!=i)) //remove client from list after successful creation 
		}
		
		else{ 
			window.localStorage.removeItem("currentRegiment")
			window.localStorage.removeItem("userWorkouts")
			setTrainer(updatedTrainer) 
			setClients(clients.filter((client,i)=>index!=i)) //remove client from list after successful creation 
			setNotification({color:"green",message:"Client added successfully!" })
		}
	}

	const finaliseBoarding=()=> { 
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
							onSubmit={(event)=>{
								event.preventDefault()
								clearClient()}} > 
							<h1>Add some clients ?</h1> {/*TODO hoverable info tooltip explaining what each field is*/}
							<h4>Write down their info so they can access their accounts :)</h4>
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

							<div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"140px"}}>
								<h1 >Clients pending:</h1> 
								{clients.map((client,i)=>(
									<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}key={i}>
										{client.name}
										<button onClick={()=>{addClient(client,i)} } >Register</button>
									</div>
								))} 
							</div>
						</form>

						<button onClick={()=>{ finaliseBoarding() }}>next</button> 
					</Container>
				</CSSTransition>
			</TransitionGroup>
		</div>
	) 
}
 
export default OnBoardTrainer