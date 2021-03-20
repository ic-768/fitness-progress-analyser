import axios from "axios"
import tokenService from "./token"

const baseUrl = "/api/clients"

const sendClient=async(clients)=> {
	const config = {
		headers:{Authorization:tokenService.getToken()}
	}
	try{
		const response = await axios.post(baseUrl, clients, config)
		return response.data 
	}
	catch{
		return false 
	}
}

export default {sendClient}