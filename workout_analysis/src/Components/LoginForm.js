import React,{useState} from "react" 
const LoginForm=({submitCredentials, setUser})=>{ 

	const [username, setUsername]=useState("")
	const [password, setPassword]=useState("")

	return ( 
		<>
	Log in please
			<form onSubmit={async (event)=>{
				event.preventDefault()
				const user=await submitCredentials({username,password})
				setUser(user)
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

export default LoginForm
