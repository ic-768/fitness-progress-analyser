import React,{useState} from "react" 
import {useHistory,Link} from "react-router-dom"

const RegisterForm=({setNotification, submitCredentials})=>{ 
	const history=useHistory()
	const [username, setUsername]=useState("")
	const [password, setPassword]=useState("") 

	return ( 
		<form style={{paddingTop:"40px",display:"flex", alignItems:"center"}}
			onSubmit={async (event)=>{
				event.preventDefault()
				if(!username || !password){
					setNotification({color:"red",message:"Please fill out both fields"})

				}
				else if( await	submitCredentials({username,password})){ //Account creation succeeded
					history.push("/")
					setNotification({color:"white",message:"User created!"})
				}
				else{setNotification({color:"red",message:"Username already exists"})}
			}}> 
			<div className="credentialBox">
				<div className="credentialBox__inputContainer">
					<h1 style ={{marginBottom:"80px"}} className="HomeRoute a-routeFadeIn"> Register</h1>
					<input className="credentialBox__input" value={username} placeholder="Username" 
						onChange={(event)=>{setUsername(event.target.value) }}/>
					<input className="credentialBox__input" value={password} placeholder="Password" 
						onChange={(event)=>{setPassword(event.target.value) }}/> 
				</div>
				<div className="credentialBox__submission">
					<button className="themed" style={{width:"400px",height:"40px"}}>Register</button> 
					<p> Have an account? <Link style={{color:"#ff8933"}} to="/"> Log in </Link></p>
				</div>
			</div>
		</form>	
	)
} 


export default RegisterForm
