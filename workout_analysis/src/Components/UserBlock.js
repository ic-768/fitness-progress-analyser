import React from "react"
import {useHistory} from "react-router-dom"

const UserBlock=({user,logout})=>{ 
	const history = useHistory()
	return(
		<>
			<h2>Logged in as {user.username}</h2>
			<button onClick={()=>{logout();history.push("/")}}
			>Disconnect</button>
		</>
	)
}

export default UserBlock
