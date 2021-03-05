import axios from "axios"
const baseUrl = "/api/workout"

let token = null 
const setToken = newToken=> {
	token = `bearer ${newToken}`
}

const setRegiment=async(regiment)=> {
	const config = {
		headers:{Authorization:token,
		}}
	const response = await axios.patch(`${baseUrl}/regiment`, regiment, config)
	return response.data
}

const sendWorkout=async(workout)=> {
	const config = {
		headers:{Authorization:token}
	}
	console.log("response to ", workout)
	const response = await axios.post(baseUrl, workout, config)
	console.log(response.data)
	return response.data
}

const getUserWorkouts=async()=>{
	const config ={
		headers:{Authorization:token}
	}
	const response = await axios.get(baseUrl, config)
	console.log(response.data)
	return response.data
}

export default {setToken,sendWorkout,getUserWorkouts,setRegiment}

