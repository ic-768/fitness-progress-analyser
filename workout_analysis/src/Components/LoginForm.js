import React,{useState} from "react" 
import {Link } from "react-router-dom"

const LoginForm=({setNotification,submitCredentials, setUser})=>{ 

	const [username, setUsername]=useState("")
	const [password, setPassword]=useState("")

	const inputStyle={width:"400px",padding:"0",marginBottom:"55px", border:"none", borderBottom:"1px solid black"}
	//TODO notification on wrong credentials

	return ( 
		<form  style={{paddingTop:"40px",display:"flex", alignItems:"center"}}
			onSubmit={async (event)=>{
				event.preventDefault()
				const user=await submitCredentials({username,password})
				if(user){
					console.log(user)
					setUser(user) 
				}
				else{
					setNotification({color:"red",message:"Wrong username or password :("})

				}
			}}> 
			<div style={{borderRadius:"0 20px 20px 0",backgroundColor:"white",padding:"90px 0 0 60px",height:"624px",width:"608px",
				marginRight:"auto",display:"flex", flexDirection:"column",
				alignItems:"center",
			}}>
				<div style = {{ marginBottom:"50px",padding:"0px",display:"flex", flexDirection:"column", justifyItems:"flex-start"}}>
					<h1 style ={{marginBottom:"80px"}} className="HomeRoute a-routeFadeIn">Log in.</h1>
					<input style={inputStyle} value={username} placeholder="Username" 
						onChange={(event)=>{setUsername(event.target.value) }}/>
					<input style={inputStyle} value={password} placeholder="Password" 
						onChange={(event)=>{setPassword(event.target.value) }}/> 
				</div>
				<div style = {{display:"flex", flexDirection:"column",alignItems:"center"}}>
					<button style={{border:"none", borderRadius:"5px",backgroundColor:"#ff8933",width:"400px",height:"40px",padding:"5px"}}>Log in</button> 
					<p> Don&apos;t have an account? <Link style={{color:"#ff8933"}} to="/register"> Sign up </Link></p>
				</div>
			</div>
		</form>	
	)
} 

export default LoginForm
