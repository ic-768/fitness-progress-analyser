import React from "react" 
import {Switch,Route,useHistory} from "react-router-dom"
import { GoPlusSmall } from "react-icons/go"
import ClientsPage from "./ClientsPage"
import TrainerAnalysis from "./TrainerAnalysis.js"

const TrainerHeadquarters=({user,setUser,clients,setClients,setNotification })=>{ 
	const history=useHistory()

	return (
		<Switch>
			<Route path="/clients">
				<ClientsPage user={user}setUser={setUser} clients={clients} setClients={setClients} setNotification={setNotification}/>
			</Route>
			<Route path="/analysis">
				<TrainerAnalysis user={user}setUser={setUser} clients={clients} setClients={setClients} setNotification={setNotification}/>
			</Route>
			<Route path="/routines">
				<div>
					Your routines!
				</div>
			</Route>
			<Route path="/">
				<div className="pageContainer">
					<div className="HQ__menu">
						<div className="HQ__item" onClick={()=>{history.push("/clients")}}>
							<h2>  {/*Everything within HQ__items gets styled in CSS*/}
								<a> <GoPlusSmall/> My Clients </a>
							</h2> 
						</div>
						<div className="HQ__item" onClick={()=>{history.push("/analysis")}}>
							<h2>  {/*Everything within HQ__items gets styled in CSS*/}
								<a> <GoPlusSmall/> Analysis </a>
							</h2> 
						</div>
						<div className="HQ__item" onClick={()=>{history.push("/routines")}} > 
							<h2>
								<a> <GoPlusSmall/> My Routines </a>
							</h2>
						</div> 
					</div>
				</div>
			</Route>
		</Switch>
	)
}

export default TrainerHeadquarters 