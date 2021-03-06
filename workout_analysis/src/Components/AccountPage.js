import React,{useState} from "react"
import {useHistory} from "react-router-dom"
import MenuCard from "./MenuCard"
import RegimentForm from "./Athlete/RegimentForm"
import exerciseService from "../Services/exercises"
import passwordService from "../Services/password"
import nameService from "../Services/name"

const AccountPage = ({ setNotification,currentRegiment,setCurrentRegiment, user,setUser}) => {
	/*Edit Account details */

	const [view,setView] = useState("")//"Reset"/"Edit"/"Password" /"Name"
	const [currentPassword,setCurrentPassword] = useState("")

	const [newPassword,setNewPassword] = useState("") // Let user change password
	const [newName,setNewName] = useState("") // Let user change password
	const [validatePassword,setValidatePassword] = useState("") // If these two passwords match
	const history = useHistory()

	return( 
		<div className="pageContainer">  {/*!if athlete, will setCurrentRegiment on going back. Should refactor somewhere better */}
			<MenuCard  callback={()=>{!user.isTrainer && setCurrentRegiment(JSON.parse(window.localStorage.getItem("currentRegiment")) 
			//If unsaved changes, revert currentRegiment
			)} } header={()=>"My Account"}body={()=> (
				<>
					{ !user.isTrainer && // only if athlete
				<>   
					<a className="menuCard__account"onClick={()=>{setView("Reset")}}>
							Reset weekly regiment
					</a>
 
					<a  className="menuCard__account"onClick={()=>{setView("Edit")}}> 
						Edit weekly regiment 
					</a>
				</>
					}
					
					<a className="menuCard__account" onClick={()=>{setView("Name")}}>  {/*for both athlete and trainer */}
						Change name 
					</a>

					<a className="menuCard__account" onClick={()=>{setView("Password")}}>  {/*for both athlete and trainer */}
						Change password 
					</a>

				</> 
			)}/>

			{view && 
				<div className="resultPage account" style={{display:"flex"}}>
					{view==="Reset" && ( //reset regiment entirely
						<div style={{display:"flex", flexDirection:"column",alignItems:"center",marginTop:"20px"}}>
							<h2>Are you sure you want to reset your weekly regiment?</h2> 
							<h5 style={{marginTop:"20px"}}>You&apos;ll be redirected to fill out all your weekly exercises from scratch. 
								<br/>
							Alternatively, you can simply edit your existing regiment
						from the other option in the menu.</h5> 
							<button className="themed--2" style={{width:"80px",marginTop:"50px"}}onClick ={async()=>{
								const updatedUser = await exerciseService.resetRegiment()
								localStorage.setItem("currentRegiment", JSON.stringify(updatedUser.currentRegiment))
								setUser(updatedUser)
								history.push("/") }}>Yes</button> 
						</div> )}

					{view==="Edit" && ( //Edit current regiment
						<RegimentForm  user={user} setUser={setUser} 
							currentRegiment={currentRegiment} setCurrentRegiment={setCurrentRegiment}/>)}

					{view==="Name" && ( //reset regiment entirely
						<form 
							onSubmit={async(event)=>{
								event.preventDefault()
								const updatedUser = await nameService.changeName({name:newName})
								if (updatedUser){
									setUser(updatedUser)
									setNotification({color:"green",message:`Name changed successfully to ${updatedUser.name}!`}) 
									setNewName("")
								}
								else{
									setNotification({color:"red",message:"Oops! Something went wrong :("}) 
								} 
							}}

							style={{marginTop:"20px"}}>
							<h2>Change your name</h2> 
							<input value={newName} onChange={(event)=>{setNewName(event.target.value)}}/>
							<button className="themed--1" type="submit" style={{marginLeft:"5px"}} >Confirm</button> 
						</form> )} 

					{view==="Password" && ( //change password
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
									setNewPassword(event.target.value)}}placeholder="repeat password"/>
							</div>
							<button className="themed--1"style={{marginTop:"15px"}} type="submit">Change my password</button>
						</form>  
					)}

				</div> 
			} 
		</div> 
	)
}

export default AccountPage