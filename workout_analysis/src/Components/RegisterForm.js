import React,{useState} from "react" 
import {useHistory,Link} from "react-router-dom"

const RegisterForm=({setNotification, submitCredentials})=>{ 
	const history=useHistory()
	const [username, setUsername]=useState("")
	const [password, setPassword]=useState("")

	const inputStyle={width:"400px",padding:"0",marginBottom:"55px", border:"none", borderBottom:"1px solid black"}

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
			<div style={{borderRadius:"0 20px 20px 0",backgroundColor:"white",padding:"90px 0 0 60px",height:"624px",width:"608px",
				marginRight:"auto",display:"flex", flexDirection:"column",
				alignItems:"center",
			}}>
				<div style = {{ marginBottom:"50px",padding:"0px",display:"flex", flexDirection:"column", justifyItems:"flex-start"}}>
					<h1 style ={{width:"100%",marginBottom:"80px",textAlign:"left"}} className="HomeRoute a-routeFadeIn"> Register</h1>
					<input style={inputStyle} value={username} placeholder="Username" 
						onChange={(event)=>{setUsername(event.target.value) }}/>
					<input style={inputStyle} value={password} placeholder="Password" 
						onChange={(event)=>{setPassword(event.target.value) }}/> 
				</div>
				<div style = {{display:"flex", flexDirection:"column",alignItems:"center"}}>
					<button style={{border:"none", borderRadius:"5px",backgroundColor:"#ff8933",width:"400px",height:"40px",padding:"5px"}}>Register</button> 
					<p> Have an account? <Link style={{color:"#ff8933"}} to="/"> Log in </Link></p>
				</div>
			</div>
		</form>	
	)
} 


export default RegisterForm
