import React from "react" 
import {Switch,Route,useHistory} from "react-router-dom"
import { GoPlusSmall } from "react-icons/go"
import ClientsPage from "./ClientsPage"
import TrainerAnalysis from "./TrainerAnalysis.js"
import TrainerHistory from "./TrainerHistory.js"
import RoutinePage from "./RoutinePage.js"
import TrainerExerciseSubmission from "./TrainerExerciseSubmission"

const TrainerHeadquarters=({user,setUser,clients,setClients,routines, setRoutines, setNotification })=>{ 
	const history=useHistory()

	return (
		<Switch>
			<Route path="/dailySubmission">
				<TrainerExerciseSubmission clients={clients} setClients={setClients} setNotification={setNotification}/>
			</Route>
			<Route path="/history">
				<TrainerHistory clients={clients} setClients={setClients} />
			</Route>
			<Route path="/clients">
				<ClientsPage user={user}setUser={setUser} clients={clients} setClients={setClients} routines={routines} setNotification={setNotification}/>
			</Route>
			<Route path="/analysis">
				<TrainerAnalysis clients={clients} />
			</Route>
			<Route path="/routines"> 
				<RoutinePage user={user}setUser={setUser} routines={routines} setRoutines={setRoutines}/> 
			</Route>
			<Route path="/">
				<div className="pageContainer">
					<div className="HQ__menu">
						<div className="HQ__item" onClick={()=>{history.push("/clients")}}>
							<h2>  {/*Everything within HQ__items gets styled in CSS*/}
								<a> <GoPlusSmall/> My Clients </a>
							</h2> 
						</div>
						<div className="HQ__item" onClick={()=>{history.push("/dailySubmission")}}>
							<h2>  {/*Everything within HQ__items gets styled in CSS*/}
								<a> <GoPlusSmall/> Workout Submission </a>
							</h2> 
						</div>
						<div className="HQ__item" onClick={()=>{history.push("/analysis")}}>
							<h2>  
								<a> <GoPlusSmall/> Analysis </a>
							</h2> 
						</div>
						<div className="HQ__item" onClick={()=>{history.push("/history")}}>
							<h2>  
								<a> <GoPlusSmall/> History </a>
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