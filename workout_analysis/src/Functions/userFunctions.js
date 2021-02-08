import ExerciseService from "../Services/exercises"
import LoginService from "../Services/login"

export const login = async(username, password, setUser) => {
	const user = await LoginService.login(username, password)
	ExerciseService.setToken(user.token)
	window.localStorage.setItem("loggedUser",JSON.stringify(user))
	setUser(user)
}

