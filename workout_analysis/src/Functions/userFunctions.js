import tokenService from "../Services/token"
import LoginService from "../Services/login"

export const login = async(username, password) => {
	const user = await LoginService.login(username, password)
	tokenService.setToken(user.token) 

	if (user.isTrainer) { 
		window.localStorage.setItem("clients",JSON.stringify(user.clients)) 
		window.localStorage.setItem("loggedUser",JSON.stringify({isTrainer:user.isTrainer,token:user.token, username:user.username})) 
		window.localStorage.setItem("routines",JSON.stringify(user.routines))
	}
	else{
		window.localStorage.setItem("loggedUser",JSON.stringify({token:user.token, username:user.username, regIsSet:user.regIsSet})) 
		window.localStorage.setItem("userWorkouts",JSON.stringify(user.days)) // workout history of user 
		window.localStorage.setItem("currentRegiment",JSON.stringify(user.currentRegiment)) //if not, will be object with empty arrays
	}
	return user
}

export const logout = (setUser)=>{
	window.localStorage.removeItem("loggedUser")
	window.localStorage.removeItem("userWorkouts")
	window.localStorage.removeItem("currentRegiment")
	window.localStorage.removeItem("clients")
	window.localStorage.removeItem("routines")
	setUser(null)
}
