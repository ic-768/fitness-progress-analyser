import React from "react"

const UserBlock=({user,logout})=>( 
	<>
		<h2>Logged in as {user.username}</h2>
		<button onClick={logout}
		>Disconnect</button>
	</>
)

export default UserBlock
