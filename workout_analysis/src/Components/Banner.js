import React from "react"
import {useHistory} from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"

const Banner=({user,logout})=>{ 
	const history = useHistory()
	const logoStyle={width:100}
	// Because clicking on a link in navbar would leave it expanded
	return user
		? (
			<div style={{position:"fixed",display:"flex", alignItems:"center",height:"80px",width:"100%"}}> 
				<h3 style={{marginLeft:"80px",marginRight:"22px",color:"white"}}>{user.username}</h3>
				<h3 style={{paddingLeft:"22px",color:"white",borderLeft:"1px solid white",cursor:"pointer",}}onClick={()=>{logout();history.push("/")}}>Sign out</h3>

			</div>
		
		)
		:(
			<Navbar style={{display:"flex", justifyContent:"center",backgroundColor:"#eeeeee", color:"black"}}>
				<Navbar.Brand><img style={logoStyle} src="https://svgsilh.com/svg_v2/1539614.svg"/></Navbar.Brand>
				<Navbar.Text><h2 style={{display:"inline"}} >Welcome to </h2><h2 style={{color:"#ff8933",display:"inline"}}>Fitness Express</h2></Navbar.Text>
			</Navbar>
		)
}


export default Banner
