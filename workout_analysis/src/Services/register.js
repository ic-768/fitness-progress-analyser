import axios from "axios"
const baseurl = "/api/users"

const register = async credentials => {
	try{
		const response = await axios.post(baseurl, credentials)
		return response.data
	}
	catch{
		return false
	}
}

export default {register}
