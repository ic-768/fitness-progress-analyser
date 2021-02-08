import React,{useState,useEffect} from "react"
import {BrowserRouter as Router,
	Switch,
	Route,
	Link 
} from "react-router-dom"

import AddExercise from "./Components/AddExercise"
import ExerciseList from "./Components/ExerciseList"
import LoginForm from "./Components/LoginForm"
import RegisterForm from "./Components/RegisterForm"
import UserBlock from "./Components/UserBlock"

import registerService from "./Services/register"
import exerciseService from "./Services/exercises"
import {login,logout} from "./Functions/userFunctions"

function App(){ 
	const [user, setUser] = useState(null)
	const [totalExercises,setTotalExercises]=useState([]) //exercises appended here 

	useEffect(()=>{  //Check to see if user is already logged in
		const loggedUser = window.localStorage.getItem("loggedUser")
		if (loggedUser){ 
			const user = JSON.parse(loggedUser)
			setUser(user)
			exerciseService.setToken(user.token) //token will be set on each render
		}	
	},[])

	const submitWorkout=(event)=>{
		event.preventDefault()
		exerciseService.sendWorkout(totalExercises)
	}

	return (
		<Router>
			<div className="App">
				<h2>
					user:ic768 <br/>
					pass:a
				</h2>
				{user ? //if user is logged in
					<>
						<UserBlock user={user} logout={()=>{logout(setUser); setTotalExercises([])}}/>  {/*show logged user*/}
						<ExerciseList totalExercises={totalExercises} setTotalExercises={setTotalExercises}/> {/*exercise list*/}
						<AddExercise totalExercises={totalExercises} setTotalExercises= {setTotalExercises}/> {/*exercise form*/}
						<button onClick={submitWorkout}>Workout Finished</button> 
					</> 
					: //if not, login or register
					<Switch>
						<Route path="/register">
							<RegisterForm submitCredentials={registerService.register}/>
							<Link to="/">back to login</Link>
						</Route>
						<Route path="/">
							<LoginForm submitCredentials={login} setUser={setUser}/> 
							<h2>New? Register<Link to="/register"> here </Link> :)</h2>
						</Route>
					</Switch> 
				}
			</div>
		</Router>
	) 
} 

export default App
