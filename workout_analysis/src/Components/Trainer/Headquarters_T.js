import React,{useEffect,useState} from "react" 
import {Switch,Route,useHistory} from "react-router-dom"
import { GoPlusSmall } from "react-icons/go"

import Analysis_T from "./Analysis_T.js"
import History_T from "./History_T.js"
import ExerciseSubmission_T from "./ExerciseSubmission_T"
import ClientsPage from "./ClientsPage"
import RoutinePage from "./RoutinePage.js"
import AccountPage from "../AccountPage.js"

const TrainerHeadquarters=({user,setUser,setNotification })=>{ 
	const history=useHistory()

	const [clients, setClients] = useState(null) 
	const [routines, setRoutines] = useState(null)

	useEffect(()=>{ //set trainer's clients
		if(user && user.isTrainer){ 
			const storedClients=JSON.parse(window.localStorage.getItem("clients"))
			storedClients && setClients(storedClients)  
			setRoutines(JSON.parse(window.localStorage.getItem("routines"))) 
		}
	},[user])

	return (
		<Switch>
			<Route path="/dailySubmission">
				<ExerciseSubmission_T clients={clients} setClients={setClients} 
					setNotification={setNotification}/>
			</Route>
			<Route path="/history">
				<History_T clients={clients} setClients={setClients} />
			</Route>
			<Route path="/clients">
				<ClientsPage user={user}setUser={setUser} clients={clients} 
					setClients={setClients} routines={routines} setNotification={setNotification}/>
			</Route>
			<Route path="/analysis">
				<Analysis_T clients={clients} />
			</Route>
			<Route path="/routines"> 
				<RoutinePage user={user}setUser={setUser} routines={routines} setRoutines={setRoutines}/> 
			</Route>
			<Route path="/account"> 
				<AccountPage setNotification={setNotification} user={user}setUser={setUser} routines={routines} setRoutines={setRoutines}/> 
			</Route>
			<Route path="/">
				<div className="pageContainer">
					<div className="HQ__menu">
						<div className="HQ__item" onClick={()=>{history.push("/clients")}}>
							<h2>  {/*Everything within HQ__items gets styled in CSS*/}
								<a> <GoPlusSmall/>My Clients</a>
							</h2> 
						</div>
						<div className="HQ__item" onClick={()=>{history.push("/dailySubmission")}}>
							<h2>  {/*Everything within HQ__items gets styled in CSS*/}
								<a> <GoPlusSmall/>Workout Submission</a>
							</h2> 
						</div>
						<div className="HQ__item" onClick={()=>{history.push("/analysis")}}>
							<h2>  
								<a> <GoPlusSmall/>Analysis</a>
							</h2> 
						</div>
						<div className="HQ__item" onClick={()=>{history.push("/history")}}>
							<h2>  
								<a> <GoPlusSmall/>History</a>
							</h2> 
						</div>
						<div className="HQ__item" onClick={()=>{history.push("/routines")}} > 
							<h2>
								<a> <GoPlusSmall/>My Routines </a>
							</h2>
						</div> 
						<div className="HQ__item" onClick={()=>{history.push("/account")}} >
							<h2> 
								<a> <GoPlusSmall/>My Account</a>
							</h2> 
						</div>
					</div>
				</div>
			</Route>
		</Switch>
	)
}

export default TrainerHeadquarters 