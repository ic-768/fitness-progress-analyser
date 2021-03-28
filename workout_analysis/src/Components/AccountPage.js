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
		<div className="pageContainer"> 
			<MenuCard  callback={()=>{setCurrentRegiment(JSON.parse(window.localStorage.getItem("currentRegiment")) 
			//If unsaved changes, revert currentRegiment
			)} } header={"My Account"}body={()=> (
				<>
					<a className="menuCard__account"onClick={()=>{setView("Reset")}}>
							Reset weekly regiment
					</a>

					<a  className="menuCard__account"onClick={()=>{setView("Edit")}}> 
						Edit weekly regiment 
					</a>

					<a className="menuCard__account" onClick={()=>{setView("Password")}}> 
						Change password
					</a>
				</> 
			)}/>

			{view && 
				<div className="resultPage account" style={{display:"flex"}}>
					{view==="Edit" && (
						<RegimentForm  user={user} setUser={setUser} 
							currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/>)}

					{view==="Reset" && (
						<div style={{marginTop:"20px"}}>
							<h2>Are you sure you want to reset your weekly regiment?</h2> 
							<h5 style={{marginTop:"20px"}}>You&apos;ll be redirected to fill out all your weekly exercises from scratch. 
								<br/>
							Alternatively, you can simply edit your existing regiment
						from the other option in the menu.</h5> 
							<button style={{border:"none", borderRadius:"5px"}}onClick ={async()=>{
								const updatedUser = await exerciseService.resetRegiment()
								localStorage.setItem("currentRegiment", JSON.stringify(updatedUser.currentRegiment))
								setUser(updatedUser)
								history.push("/") }}>Yes</button> 
						</div> )}

					{view==="Password" && (
						<form 
							style={{marginTop:"40px",alignItems:"center",width:"100%",display:"flex",flexDirection:"column"}}
							onSubmit={async(event)=>{
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
							}}  >
							<div>
								<h5 >Current password</h5>
								<input style={{marginBottom:"20px"}}type="password" value={currentPassword} onChange={(event)=>{
									setCurrentPassword(event.target.value)}}placeholder="current password"/>
							</div>
							<div>
								<h5 >New password</h5>
								<input style={{marginBottom:"20px"}}type="password" value={validatePassword} onChange={(event)=>{
									setValidatePassword(event.target.value)}}placeholder="new password"/>
							</div>
							<div>
								<h5 >Repeat new password</h5>
								<input style={{marginBottom:"20px"}}type="password" value={newPassword} onChange={(event)=>{
									setNewPassword(event.target.value)}}placeholder="new password"/>
							</div>
							<button style={{marginTop:"15px",borderRadius:"5px",border:"none"}} type="submit">Change my password</button>
							<div style={{marginTop:"auto",marginBottom:"20px",width:"100%",borderBottom:"0.5px solid #C4C4C4"}}>
							</div> 
						</form>  
					)}
			
				</div> 
			}
		</div> 
	)
}

export default AccountPage