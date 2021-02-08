import axios from "axios"
const baseurl = "/api/users"

const register = async credentials => {
	console.log(credentials,"credentials")
	const response = await axios.post(baseurl, credentials)
	console.log(response.data)
	return response.data
}

export default { register }

