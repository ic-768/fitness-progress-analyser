import React from "react"
import OnBoard_A from "./Athlete/OnBoard_A"
import OnBoard_T from "./Trainer/OnBoard_T"
import {
	Switch,
	Route,
	useHistory
} from "react-router-dom"
import Banner from "../Components/Banner" 
import Container from "react-bootstrap/Container"

const LandingPage = ({setNotification,  user, setUser}) =>{
	const history = useHistory()

	return(
		<div style={{overflow:"auto",height:"100%"}}>
			<Switch>
				<Route path="/athlete">
					<OnBoard_A setNotification={setNotification} user={user} setUser={setUser}/>
				</Route>
				<Route path="/trainer">
					<OnBoard_T user={user}setUser={setUser}/>  {/*TODO set notifications, and fix bad css */}
				</Route>
				<Route path="/"> 
					<Banner/>
					<Container>
						<form className="dayForm">
							<h1 style={{fontWeight:"bold"}}>
					I am ...</h1>
							<div className="dayForm__dayContainer">
								<button onClick={(event)=>{
									event.preventDefault()
									history.push("/trainer")
								}}
								className="themed"style ={{marginRight:"20px",height:"50px",width:"150px"}}>
									<h3 style={{color:"white"}}>A trainer</h3></button>
								<button onClick={(event)=>{
									event.preventDefault()
									history.push("/athlete")
								}}
								className="themed"style ={{marginRight:"20px",height:"50px",width:"150px"}}>
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