import React from "react"
import {useHistory} from "react-router-dom"
import MenuCard from "./MenuCard"
import exerciseService from "../Services/exercises"

const AccountPage = ({setUser}) => { 
	const history = useHistory()
	return( 
		<div style={{display:"flex",height:"100%"}}> 
			<MenuCard header={"My Account"}body={()=> (
				<>
					<div style={{height:"36px",display:"flex",alignItems:"center", justifyContent:"center",
						margin:"5px",borderRadius:"5px",boxShadow:"0px 0px 4px rgba(0, 0, 0, 0.45)"}} > 
						<a style ={{cursor:"pointer"}}onClick ={async() => { //TODO "are you sure" notification
							const updatedUser = await exerciseService.resetRegiment()
							localStorage.setItem("currentRegiment", JSON.stringify(updatedUser.currentRegiment))
							setUser(updatedUser)
							history.push("/")
						}}>
							Reset weekly regiment</a>
					</div>

					<div style={{height:"36px",display:"flex",alignItems:"center", justifyContent:"center",
						margin:"5px",borderRadius:"5px",boxShadow:"0px 0px 4px rgba(0, 0, 0, 0.45)"}} > 
					Edit weekly regiment
					</div>

					<div style={{height:"36px",display:"flex",alignItems:"center", justifyContent:"center",
						margin:"5px",borderRadius:"5px",boxShadow:"0px 0px 4px rgba(0, 0, 0, 0.45)"}} > 
					Change password
					</div>
				</>

			)}/>
		</div> 
	)
}
export default AccountPage