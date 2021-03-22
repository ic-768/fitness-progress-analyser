import React from "react" 
import {Switch,Route,useHistory} from "react-router-dom"
import { GoPlusSmall } from "react-icons/go"
import ClientsPage from "./ClientsPage"

const TrainerHeadquarters=({clients,//user, setUser,setNotification
})=>{ 
	const history=useHistory()

	return (
		<Switch>
			<Route path="/clients">
				<ClientsPage clients={clients}/>
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