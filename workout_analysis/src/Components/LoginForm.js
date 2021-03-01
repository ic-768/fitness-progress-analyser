import React,{useState} from "react" 
import {Link } from "react-router-dom"
const LoginForm=({submitCredentials, setUser})=>{ 

	const [username, setUsername]=useState("")
	const [password, setPassword]=useState("")

	const inputStyle={margin:"20px"}
	return ( 
		<>
			<form  style={{display:"flex", flexDirection:"column",alignItems:"center"}}onSubmit={async (event)=>{
				event.preventDefault()
				const user=await submitCredentials({username,password})
				setUser(user)
			}}> 
				<div style={{marginTop:"10vh",display:"flex", flexDirection:"column",
					backgroundColor: "rgba(100, 100, 100, 0.5)", borderRadius:"5px",padding:"20px",
					justifyContent:"center", alignItems:"center"}}>
					<h1 style={{color:"white"}}>Log in</h1>
					<div>
						<input style={inputStyle} value={username} placeholder="username" onChange={(event)=>{
							setUsername(event.target.value) }}/>
						<input style={inputStyle}  value={password} placeholder="password" onChange={(event)=>{
							setPassword(event.target.value) }}/> 
					</div>
					<div>
						<button style={{width:"80px",height:"40px",padding:"5px"}}>submit</button> 
					</div>
				</div>
				<h2 style={{marginTop:"auto",color:"white"}}>New? <Link style={{color:"turquoise"}} to="/register"> Register </Link></h2>
			</form>	
		</>
	)
} 

export default LoginForm
