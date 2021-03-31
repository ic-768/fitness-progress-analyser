import axios from "axios"
import tokenService from "./token"
const baseurl = "/api/users/name"

const changeName = async name => {
	const config = {
		headers:{Authorization:tokenService.getToken()}
	}
	try{
		const response = await axios.post(baseurl, name,config)
		return response.data
	}
	catch{
		return false
	}
}

export default {changeName}