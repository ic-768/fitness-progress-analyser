import axios from "axios"
import tokenService from "./token"
const baseUrl = "/api/workout"

const resetRegiment=async()=> {
	const config = {
		headers:{Authorization:tokenService.getToken(),
		}}
	const response = await axios.put(`${baseUrl}/regiment`, null, config)
	return response.data
}

const setRegiment=async(regiment)=> {
	const config = {
		headers:{Authorization:tokenService.getToken(),
		}}
	const response = await axios.patch(`${baseUrl}/regiment`, regiment, config)
	return response.data
}

const sendWorkout=async(workout)=> {
	const config = {
		headers:{Authorization:tokenService.getToken()}
	}
	try{
		const response = await axios.post(baseUrl, workout, config)
		return response.data 
	}
	catch{
		return false 
	}
}

const getUserWorkouts=async()=>{
	const config ={
		headers:{Authorization:tokenService.getToken()}
	}
	const response = await axios.get(baseUrl, config)
	console.log(response.data)
	return response.data
}

export default {resetRegiment,sendWorkout,getUserWorkouts,setRegiment}