import axios from "axios"
import tokenService from "./token"

const baseUrl = "/api/clients"

const addClient=async(client)=> { 
	const config = {
		headers:{Authorization:tokenService.getToken()}
	}
	try{
		const response = await axios.post(baseUrl, client, config)
		return response.data  //returns whole trainer
	}
	catch{
		return false 
	}
}

const updateClient=async(client)=> {
	const config = {
		headers:{Authorization:tokenService.getToken()}
	}
	try{
		const response = await axios.patch(baseUrl, client, config)
		return response.data 
	}
	catch{
		return false 
	}
}

const removeClient=async(id)=> {
	const config = {
		headers:{Authorization:tokenService.getToken()}
	}
	try{
		const response = await axios.patch(`${baseUrl}/removeClient`, id, config)
		return response.data 
	}
	catch{
		return false 
	}
}

export default {addClient,updateClient,removeClient}