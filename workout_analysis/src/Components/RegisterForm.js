import React,{useState} from "react" 
import {useHistory} from "react-router-dom"

const RegisterForm=({submitCredentials})=>{ 
	const history=useHistory()
	const [username, setUsername]=useState("")
	const [password, setPassword]=useState("")

	return ( 
		<>
		Register a username and a password :)
			<form onSubmit={(event)=>{
				event.preventDefault()
				submitCredentials({username,password})
				history.push("/")
			}}> 
				<input value={username} placeholder="username" onChange={(event)=>{
					setUsername(event.target.value) }}/>
				<input value={password} placeholder="password" onChange={(event)=>{
					setPassword(event.target.value) }}/> 
				<button>submit</button> 
			</form>	
		</>
	)
}





export default RegisterForm
