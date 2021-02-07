import axios from "axios"
const baseUrl = "/api/workout"

let token = null 
const setToken = newToken=> {
	token = `bearer ${newToken}`
}

const sendWorkout= async (workout)=> {
	const config = {
		headers:{Authorization:token}
	}
	const response = await axios.post(baseUrl, workout, config)
	return response.data
}

export default {setToken,sendWorkout}

