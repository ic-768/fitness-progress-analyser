import React,{useState} from "react" 
import {useHistory,Link} from "react-router-dom"

const RegisterForm=({submitCredentials})=>{ 
	const history=useHistory()
	const [username, setUsername]=useState("")
	const [password, setPassword]=useState("")

	const inputStyle={margin:"20px"}
	return ( 
		<>
			<form style={{display:"flex", flexDirection:"column",alignItems:"center"}} onSubmit={(event)=>{
				event.preventDefault()
				submitCredentials({username,password})
				history.push("/")
			}}> 
				<div style={{marginTop:"10vh",display:"flex", flexDirection:"column",
					backgroundColor: "rgba(100, 100, 100, 0.5)", borderRadius:"5px",padding:"20px",
					justifyContent:"center", alignItems:"center"}}>
					<h1>Register</h1>
					<div>
						<input style={inputStyle}value={username} placeholder="username" onChange={(event)=>{
							setUsername(event.target.value) }}/>
						<input style={inputStyle}value={password} placeholder="password" onChange={(event)=>{
							setPassword(event.target.value) }}/> 
					</div>
					<button>submit</button> 
				</div>
				<h2 style={{marginTop:"auto"}}>Back to <Link style={{color:"turquoise"}} to="/"> Login </Link></h2>
			</form>	
		</>
	)
}





export default RegisterForm
