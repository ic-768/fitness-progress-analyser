import ExerciseService from "../Services/exercises"
import LoginService from "../Services/login"

export const login = async(username, password) => {
	const user = await LoginService.login(username, password)
	ExerciseService.setToken(user.token) 

	/*initialise local storage*/
	window.localStorage.setItem("loggedUser",JSON.stringify(user)) // set user's details
	window.localStorage.setItem("userWorkouts",JSON.stringify(user.days)) // set user workouts
	return user
}

export const logout = (setUser)=>{
	window.localStorage.removeItem("loggedUser")
	window.localStorage.removeItem("userWorkouts")
	setUser(null)
}
