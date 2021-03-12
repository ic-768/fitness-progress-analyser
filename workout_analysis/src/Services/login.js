import axios from "axios"
const baseurl = "/api/login"

const login = async credentials => {
	try{
		const response = await axios.post(baseurl, credentials)
		return response.data
	}
	catch{
		return false
	}
}

export default { login }

