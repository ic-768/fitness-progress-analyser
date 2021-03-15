import axios from "axios"
const baseurl = "/api/users/password"

const changePassword = async credentials => {
	try{
		const response = await axios.patch(baseurl, credentials)
		return response.data
	}
	catch{
		return false
	}
}

export default {changePassword}