import React,{useState,useEffect} from "react"
import Container from "react-bootstrap/Container" 
import clientService from "../../Services/clients" 
import {useHistory} from "react-router-dom"

const OnBoardTrainer = ({setNotification,setUser}) => {
	const [trainer, setTrainer]=useState(null)  //To hold newly created "user" data, until the "next" button is pressed

	const [clients, setClients]=useState([]) //clients added, but pending registration
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
	console.log(trainer)

	const finaliseBoarding=()=> { 
		if (trainer){ //trainer will only be non-null after a client is submitted
			setUser(trainer)
			history.push("/")

		}
	} 

	return (
		<div className="pageContainer" style={{flexDirection:"column"}}>
			<Container className="regimentForm" >
				<form className="regimentForm__fadeContainer HomeRoute a-routeFadeIn" 
					style={{display:"flex",}}
					onSubmit={(event)=>{
						event.preventDefault()
						clearClient()}} > 
					<h1>Add some clients ?</h1> {/*TODO hoverable info tooltip explaining what each field is*/}
					<h4>Write down their info so they can access their accounts :)</h4>
					<div style={{
						marginTop:"40px",display:"flex", 
							
						justifyContent:"center",
					}}>

						<div style={{display:"flex", flexDirection:"column"}}>
							<h2>Name</h2>
							<input  style={{marginBottom:"5px"}}
								onChange={(event)=>{ setCurrentClient({...currentClient,name:event.target.value}) }} 
								placeholder={currentClient.name || "client name"}
								value={currentClient.name} /> 
							<h2>Username</h2>
							<input style={{marginBottom:"30px"}}onChange={(event)=>{ setCurrentClient({...currentClient,username:event.target.value}) }} 
								placeholder={currentClient.username || "client username"}
								value={currentClient.username} /> 
							<h2>Password</h2>
							<input style={{marginBottom:"5px"}}
								onChange={(event)=>{setCurrentClient({...currentClient,password:event.target.value}) }} 
								placeholder={currentClient.password || "client password"}
								value={currentClient.password}/> 

							<h2>Repeat password</h2>
							<input onChange={(event)=>{ setCurrentClient({...currentClient,validatePassword:event.target.value}) }}
								placeholder={currentClient.validatePassword || "repeat client password"} 
								value={currentClient.validatePassword} /> 
							<button type="submit" 
								className="themed--1" style={{alignSelf:"center",display:"block",margin:"20px",width:"50px", height:"50px"}}>
										add
							</button>
						</div>		
						<div style={{display:"flex",flexDirection:"column",marginLeft:"100px"}}>
							<h1 >Clients pending:</h1> 
							{clients.map((client,i)=>(
								<div style={{display:"flex",flexDirection:"column",alignItems:"center"}}key={i}>
									<h4 style={{marginTop:"20px"}}>{client.name}</h4>
									<button className="themed--2" onClick={()=>{addClient(client,i)} } >Register</button>
								</div>
							))} 
						</div>
					</div>

				</form>

				<button className="themed--1" style={{marginBottom:"40px",height:"50px",width:"50px"}}onClick={()=>{ finaliseBoarding() }}>next</button> 
			</Container>
		</div>
	) 
}
 
export default OnBoardTrainer