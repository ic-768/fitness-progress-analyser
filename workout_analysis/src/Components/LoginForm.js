import React,{useState} from "react" 
const LoginForm=({submitCredentials})=>{ 

	const [username, setUsername]=useState("")
	const [password, setPassword]=useState("")

	return ( 
		<>
	Log in please
			<form onSubmit={(event)=>{
				event.preventDefault()
				submitCredentials({username,password})
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
