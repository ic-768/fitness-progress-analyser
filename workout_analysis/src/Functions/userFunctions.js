import ExerciseService from "../Services/exercises"
import LoginService from "../Services/login"

export const login = async(username, password) => {
	const user = await LoginService.login(username, password)
	ExerciseService.setToken(user.token)
	window.localStorage.setItem("loggedUser",JSON.stringify(user))
	return user
}

export const logout = (setUser)=>{
	window.localStorage.removeItem("loggedUser")
	setUser(null)
}
