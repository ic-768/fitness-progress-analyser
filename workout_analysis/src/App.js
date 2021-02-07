import React,{useState,useEffect} from "react"
import AddExercise from "./Components/AddExercise"
import ExerciseList from "./Components/ExerciseList"
import LoginForm from "./Components/LoginForm"
import LoginService from "./Services/login"
import ExerciseService from "./Services/exercises"

function App() { 
	const [user, setUser] = useState(null)

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

	const [totalExercises,setTotalExercises]=useState([]) //exercises appended here 

	const submitWorkout=(event)=>{
		event.preventDefault()
		ExerciseService.sendWorkout(totalExercises)
		/*TODO clean up weight field if unWeighted exercise before sending
		 */
	}
	console.log(totalExercises)
	return (
		<div className="App">
			<h2>
		user:ic768 <br/>
		pass:a
			</h2>
			{user === null 
				?
				<LoginForm submitCredentials={login}/> 
				:
				<>
					<h2>Logged in as {user.username}</h2>
					<ExerciseList totalExercises={totalExercises} setTotalExercises={setTotalExercises}/> 
					<AddExercise totalExercises={totalExercises} setTotalExercises= { setTotalExercises }/>
					<button onClick={submitWorkout}>Workout Finished</button> 
				</> 
			}
		</div>
	) 
} 
export default App
