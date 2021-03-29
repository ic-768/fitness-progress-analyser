import axios from "axios"
import tokenService from "./token"
const baseUrl = "/api/workout"

const getUserWorkouts=async()=>{
	const config ={
		headers:{Authorization:tokenService.getToken()}
	}
	const response = await axios.get(baseUrl, config)
	console.log(response.data)
	return response.data
}

const sendWorkout=async(workoutData)=> {  //TODO if trainer, {exercises: {}, _id:} else just {workout:}
	const config = {
		headers:{Authorization:tokenService.getToken()}
	}

	try{
		const response = await axios.post(baseUrl, workoutData, config)
		return response.data 
	}
	catch{
		return false 
	}
}

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

const addRoutine = async(routine)=>{ 
	const config = {
		headers:{Authorization:tokenService.getToken(),
		}}
	const response = await axios.post(`${baseUrl}/routines`, routine, config)
	return response.data 
}

const setRoutines=async(routines)=> {
	const config = {
		headers:{Authorization:tokenService.getToken(),
		}}
	const response = await axios.put(`${baseUrl}/routines`, routines, config)
	return response.data
}


export default {resetRegiment,sendWorkout,getUserWorkouts,setRegiment,addRoutine,setRoutines}