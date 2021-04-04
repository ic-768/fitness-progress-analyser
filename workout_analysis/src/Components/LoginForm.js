import React,{useState} from "react" 
import {Link } from "react-router-dom"

const LoginForm=({setNotification,submitCredentials, setUser})=>{ 

	const [username, setUsername]=useState("")
	const [password, setPassword]=useState("")

	const inputStyle={width:"400px",padding:"0",marginBottom:"55px", border:"none", borderBottom:"1px solid black"}

	return ( 
		<form  style={{paddingTop:"40px",display:"flex", alignItems:"center"}}
			onSubmit={async (event)=>{
				event.preventDefault()
				const user=await submitCredentials({username,password})
				if(user){
					setUser(user) 
				}
				else{
					setNotification({color:"red",message:"Wrong username or password :("}) 
				}
			}}> 
			<div className="credentialBox" >
				<div className="credentialBox__inputContainer">
					<h1 style ={{marginBottom:"80px"}} className="HomeRoute a-routeFadeIn">Log in</h1>
					<input style={inputStyle} value={username} placeholder="Username" 
						onChange={(event)=>{setUsername(event.target.value) }}/>
					<input type="password"style={inputStyle} value={password} placeholder="Password" 
						onChange={(event)=>{setPassword(event.target.value) }}/> 
				</div>
				<div className="credentialBox__submission" >
					<button className="themed--1" style={{width:"400px",height:"40px"}}>Log in</button>
					<p> Don&apos;t have an account? <Link style={{color:"#ff8933"}} to="/register"> Sign up </Link></p>
					<p> Want a quick <Link style={{color:"#ff8933"}} to="/tutorial">tutorial </Link>?</p>
				</div>
			</div>
		</form>	
	)
} 

export default LoginForm
