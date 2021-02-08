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
import LoginService from "./Services/login"
import RegisterService from "./Services/register"
import ExerciseService from "./Services/exercises"

function App() { 
	const [user, setUser] = useState(null)
	const [totalExercises,setTotalExercises]=useState([]) //exercises appended here 

	useEffect(()=>{  // Check to see if user is already logged in
		const loggedUser = window.localStorage.getItem("loggedUser")
		if(loggedUser){ 
			const user = JSON.parse(loggedUser)
			setUser(user)
			ExerciseService.setToken(user.token) // on each render, token will be set
		}	
	},[])

	const login=async(username, password)=> {
		const user=await LoginService.login(username,password)
		ExerciseService.setToken(user.token)
		window.localStorage.setItem("loggedUser",JSON.stringify(user))
		setUser(user)
	}

	const logout=()=>{
		window.localStorage.removeItem("loggedUser")
		setUser(null)
	}

	const register=async(username, password)=> {
		await RegisterService.register(username, password)
		console.log("User created :)")
	}


	const submitWorkout=(event)=>{
		event.preventDefault()
		ExerciseService.sendWorkout(totalExercises)
		/*TODO clean up weight field if unWeighted exercise before sending
		 */
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
						<h2>Logged in as {user.username}</h2>
						<button onClick={logout}>Disconnect</button>
						<ExerciseList totalExercises={totalExercises} setTotalExercises={setTotalExercises}/> 
						<AddExercise totalExercises={totalExercises} setTotalExercises= { setTotalExercises }/>
						<button onClick={submitWorkout}>Workout Finished</button> 
					</> 
					: //if not, login or register
					<Switch>
						<Route path="/register">
							<RegisterForm submitCredentials={register}/>
							<Link to="/">back to login</Link>
						</Route>
						<Route path="/">
							<LoginForm submitCredentials={login}/> 
							<h2>New? Register<Link to="/register"> here </Link> :)</h2>
						</Route>
					</Switch> 
				}
			</div>
		</Router>
	) 
} 
export default App
