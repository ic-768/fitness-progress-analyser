import React from "react"

const Notification = ({message,color}) => { 
	if(message){
		return(
			<div style={{textAlign:"center",zIndex:"1",width:"100vw",position:"absolute", top:"0",backgroundColor:color}}> 
				<h1>{message}</h1>
			</div>
		)
	}
	return(null)
}
export default Notification