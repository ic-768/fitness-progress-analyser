import tokenService from "../Services/token"
import LoginService from "../Services/login"

export const login = async(username, password) => {
	const user = await LoginService.login(username, password)
	tokenService.setToken(user.token) 

	/*initialise local storage*/ 
	/* set user's details. Last field specifies if user has set a workout regiment (false for new users) */
	window.localStorage.setItem("loggedUser",JSON.stringify({token:user.token, username:user.username, regIsSet:user.regIsSet})) 
	window.localStorage.setItem("userWorkouts",JSON.stringify(user.days)) // workout history of user 
	window.localStorage.setItem("currentRegiment",JSON.stringify(user.currentRegiment)) //if not, will be object with empty arrays
	return user
}

export const logout = (setUser)=>{
	window.localStorage.removeItem("loggedUser")
	window.localStorage.removeItem("userWorkouts")
	window.localStorage.removeItem("currentRegiment")
	setUser(null)
}
