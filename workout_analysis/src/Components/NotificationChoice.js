import React from "react"

const NotificationChoice=({message, yesCallback,noCallback })=>{
	//give user a choice 
	return(
		<div className="a-fade" style={{ 
			zIndex:"1",
			boxShadow:"1px 1px 2px rgba(0, 0, 0, 0.45)",
			display:"flex",
			flexDirection:"column",
			justifyContent:"center",
			alignItems:"center",
			top: "50%",
			left: "50%",
			width: "30em",
			height: "18em",
			marginTop: "-9em",
			marginLeft: "-15em",
			borderRadius:"5px",
			border: "1px solid #666",
			backgroundColor: "#FFFFFF",
			position: "fixed" ,
			padding:"40px"
		}}>


			<h2 style={{textAlign:"center"}}>{message}</h2>
			<div>
				<button style={{width:"90px"}}onClick={()=>{yesCallback()}} className="themed--1">Yes</button> {/**TODO themed1 themed2 */}
				<button style={{width:"90px"}}onClick={()=>{noCallback()}} className="themed--2">No</button>
			</div>
		</div>

	)
}

export default NotificationChoice