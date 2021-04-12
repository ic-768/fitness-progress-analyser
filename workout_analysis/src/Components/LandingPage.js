import React,{useState} from "react"
import OnBoard_A from "./Athlete/OnBoard_A"
import OnBoard_T from "./Trainer/OnBoard_T"
import {
	Switch,
	Route,
	useHistory
} from "react-router-dom"
import Banner from "../Components/Banner" 
import Container from "react-bootstrap/Container"

import nameService from "../Services/name"

const LandingPage = ({setNotification,  user, setUser}) =>{ 
	const [name,setName]=useState(null) 
	const history = useHistory()

	return(
		<div style={{overflow:"auto",height:"100%"}}>
			<Switch>
				<Route path="/athlete">
					<OnBoard_A setNotification={setNotification} user={{...user,name}} setUser={setUser}/>
				</Route>
				<Route path="/trainer">
					<OnBoard_T setNotification={setNotification} setUser={setUser}/>  
				</Route>
				<Route path="/"> 
					<Banner/>
					<Container>
						<form className="dayForm"> 
							<h1 style={{fontWeight:"bold"}}>
					My name is ...</h1>
							<input style={{fontSize:"20px",textAlign:"center",marginBottom:"20px"}} 
								onChange={(event)=>{setName(event.target.value)}}/> 
							<h1 style={{fontWeight:"bold"}}>
					and I am ...</h1>
							<div className="dayForm__dayContainer">
								<button className="themed--1" style ={{marginRight:"20px",height:"50px",width:"150px"}}
									onClick={(event)=>{
										event.preventDefault()
										if(name) {
											nameService.changeName({name:name})
											history.push("/trainer")
										}
									}}
								>
									<h3 style={{color:"white"}}>A trainer</h3></button>
								<button className="themed--1" style ={{marginRight:"20px",height:"50px",width:"150px"}}
									onClick={(event)=>{ 
										event.preventDefault()
										if (name){ 
											nameService.changeName({name:name})
											history.push("/athlete")
										}
									}}
								>
									<h3 style={{color:"white"}}>An athlete</h3></button>
							</div>
						</form>
					</Container>
				</Route>
			</Switch> 
		</div>
	)
}
export default LandingPage
