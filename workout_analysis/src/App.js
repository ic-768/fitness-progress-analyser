import React,{useState} from "react"
import AddExercise from "./Components/AddExercise"
import ExerciseList from "./Components/ExerciseList"
import LoginForm from "./Components/LoginForm"
import LoginService from "./Services/login"

function App() { 

	const login=async(username, password)=> {
		await LoginService.login(username,password)
		//TODO set token to localStorage
	}

	const [totalExercises,setTotalExercises]=useState([]) //exercises appended here 

	const submitWorkout=(event)=>{
		event.preventDefault()
		/*TODO send workout to backend
		 * clean up weight field if unWeighted exercise before sending
		*/
	}

	//TODO user login
	return (
		<div className="App">
			<h2>
		user:ic768 <br/>
		pass:a
			</h2>
			<LoginForm submitCredentials={login}/>
			<ExerciseList totalExercises={totalExercises} setTotalExercises={setTotalExercises}/> 
			<AddExercise totalExercises={totalExercises} setTotalExercises= { setTotalExercises }/>
			<button onClick={submitWorkout}>Workout Finished</button> 
		</div>
	) 
} 
export default App
