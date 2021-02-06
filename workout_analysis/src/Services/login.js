import axios from "axios"
const baseurl = "/api/login"

const login = async credentials => {
	const response = await axios.post(baseurl, credentials)
	console.log(response.data)
	return response.data
}

export default { login }

