let token = null 

const setToken = newToken=> {
	token = `bearer ${newToken}`
}

const getToken=()=>token 

export default {setToken,getToken}