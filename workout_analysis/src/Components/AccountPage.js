import React,{useState} from "react"
import {useHistory} from "react-router-dom"
import MenuCard from "./MenuCard"
import RegimentForm from "./RegimentForm"
import exerciseService from "../Services/exercises"
import passwordService from "../Services/password"

const AccountPage = ({ setNotification,currentRegiment,setCurrentRegiment, user,setUser}) => {

	const [view,setView] = useState("")//"Reset"/"Edit"/Password 
	const [currentPassword,setCurrentPassword] = useState("")

	const [newPassword,setNewPassword] = useState("") // Let user change password
	const [validatePassword,setValidatePassword] = useState("") // If these two passwords match
	const history = useHistory()
	return( 
		<div style={{display:"flex",height:"100%"}}> 
			<MenuCard  callback={()=>{setCurrentRegiment(JSON.parse(window.localStorage.getItem("currentRegiment")) 
			//If unsaved changes, revert currentRegiment
			)} } header={"My Account"}body={()=> (
				<>
					<div style={{height:"36px",display:"flex",alignItems:"center", justifyContent:"center",
						margin:"5px",borderRadius:"5px",boxShadow:"0px 0px 4px rgba(0, 0, 0, 0.45)"}} > 
						<a style ={{cursor:"pointer"}} onClick ={()=>{setView("Reset")}}>
							Reset weekly regiment</a>
					</div>

					<div style={{height:"36px",display:"flex",alignItems:"center", justifyContent:"center",
						margin:"5px",borderRadius:"5px",boxShadow:"0px 0px 4px rgba(0, 0, 0, 0.45)"}} > 
						<a onClick={()=>{setView("Edit")}}style ={{cursor:"pointer"}} >Edit weekly regiment </a> 
					</div>

					<div style={{height:"36px",display:"flex",alignItems:"center", justifyContent:"center",
						margin:"5px",borderRadius:"5px",boxShadow:"0px 0px 4px rgba(0, 0, 0, 0.45)"}} > 
						<a onClick={()=>{setView("Password")}}>Change password</a>
					</div>
				</> 
			)}/>

			{view && 
			<div style={{ marginTop:"80px",display:"flex",flexDirection:"column"}}> 
				<div style={{marginBottom:"57px",overflowY:"auto",minWidth:"500px",padding:"36px 58px 36px 58px",boxShadow: ("0px 0px 4px rgba(0, 0, 0, 0.45)"),borderRadius:"5px",
					backgroundColor:"white",marginLeft:"58px",marginRight:"58px"}}>
					{view==="Edit" && (
						<RegimentForm  user={user} setUser={setUser} currentRegiment={currentRegiment} 
							setCurrentRegiment={setCurrentRegiment}/>)}
					{view==="Reset" && (
						<div>
							<h2>Are you sure you want to reset your weekly regiment?</h2> 
							<h5 style={{marginTop:"20px"}}>You&apos;ll be redirected to fill out all your weekly exercises from scratch. Alternatively, you can simply edit your existing regiment
						from the other option in the menu.</h5> 
							<button onClick ={async()=>{
								const updatedUser = await exerciseService.resetRegiment()
								localStorage.setItem("currentRegiment", JSON.stringify(updatedUser.currentRegiment))
								setUser(updatedUser)
								history.push("/") }}>Yes</button> 
						</div> )}

					{view==="Password" && (
						<form onSubmit={async(event)=>{
							event.preventDefault()
							if (newPassword===validatePassword ){
								const updatedUser = await passwordService
									.changePassword({username:user.username,currentPassword,newPassword})
								if(updatedUser){
									setUser(updatedUser)
									setNotification({color:"green",message:"Password changed successfully"}) 
								}
								else{ 
									setNotification({color:"red",message:"Process failed. Wrong password maybe?"}) 
								}
							}
						}} style={{alignItems:"center",width:"100%",display:"flex",flexDirection:"column"}} >
							<div>
								<h5>Current password</h5>
								<input type="password" value={currentPassword} onChange={(event)=>{setCurrentPassword(event.target.value)}}placeholder="current password"/>
							</div>
							<div>
								<h5>New password</h5>
								<input type="password" value={validatePassword} onChange={(event)=>{setValidatePassword(event.target.value)}}placeholder="new password"/>
							</div>
							<div>
								<h5>Repeat new password</h5>
								<input type="password" value={newPassword} onChange={(event)=>{setNewPassword(event.target.value)}}placeholder="new password"/>
							</div>
							<button style={{marginTop:"15px",borderRadius:"5px",border:"none"}} type="submit">Change my password</button>
							<div style={{width:"100%",paddingBottom:"25px",borderBottom:"0.5px solid #C4C4C4"}}>
							</div> 
						</form>  
					)}
			
				</div> 
			</div> 
			}
		</div> 
	)
}

export default AccountPage