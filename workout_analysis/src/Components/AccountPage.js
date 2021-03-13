import React,{useState} from "react"
import {useHistory} from "react-router-dom"
import MenuCard from "./MenuCard"
import RegimentForm from "./RegimentForm"
import exerciseService from "../Services/exercises"

const AccountPage = ({ currentRegiment,setCurrentRegiment, user,setUser}) => { 
	const [view,setView] = useState("") //"Reset"/"Edit"/Password
	const history = useHistory()
	return( 
		<div style={{display:"flex",height:"100%"}}> 
			<MenuCard header={"My Account"}body={()=> (
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
					<div style={{paddingBottom:"25px",borderBottom:"0.5px solid #C4C4C4"}}>
					</div> 
				</div> 
			</div>  
			}
			
		</div>
	)
}
export default AccountPage