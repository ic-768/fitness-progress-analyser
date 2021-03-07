import React,{useState} from "react"
import {useHistory} from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav" 

const Banner=({user,logout})=>{ 
	const history = useHistory()
	const [expanded,setExpanded]=useState(true) 
	const logoStyle={width:100}
	// Because clicking on a link in navbar would leave it expanded
	return user
		? (
			<Navbar style={{position:"fixed", width:"100%"}}expanded ={expanded} bg="light" variant="light" expand="sm">
				<Navbar.Brand onClick={()=>{setExpanded(false); history.push("/")}}><img style={logoStyle} src="https://svgsilh.com/svg_v2/1539614.svg"/></Navbar.Brand>
				<Navbar.Text>{user.username}</Navbar.Text>
				<Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")}  
					aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link onClick={()=>{setExpanded(false);history.push("/")}}> Home</Nav.Link>
						<Nav.Link onClick={()=>{setExpanded(false);history.push("/analysis")}}> Analysis</Nav.Link>
						<Nav.Link onClick={()=>{setExpanded(false);history.push("/history")}}> History</Nav.Link>
						<Nav.Link onClick={()=>{logout();history.push("/")}}>Disconnect</Nav.Link>
					</Nav>
				</Navbar.Collapse >
			</Navbar>
		)
		:(
			<Navbar style={{display:"flex", justifyContent:"center",backgroundColor:"#eeeeee", color:"black"}}>
				<Navbar.Brand><img style={logoStyle} src="https://svgsilh.com/svg_v2/1539614.svg"/></Navbar.Brand>
				<Navbar.Text><h2 style={{display:"inline"}} >Welcome to </h2><h2 style={{color:"#ff8933",display:"inline"}}>Fitness Express</h2></Navbar.Text>
			</Navbar>
		)
}


export default Banner
