import React from "react"
import {IoIosArrowBack} from "react-icons/io"
import {useHistory} from "react-router-dom"

const MenuCard = ({callback, header, body}) => { 
	const history=useHistory()
	return(
		<div style={{minWidth:"300px",borderRadius:"5px",marginBottom:"57px",marginLeft:"20px",marginTop:"80px",padding:"40px",backgroundColor:"white",display:"flex",flexDirection:"column"}}>
			<h1 style={{marginBottom:"57px"}}> 
				<a onClick={()=>{
					history.push("/") 
					callback && callback() //optional callback
				}}>
					<IoIosArrowBack style={{cursor:"pointer"}} /> 
					{header}
				</a>
			</h1> 
			{body()}
		</div>
	)
}

export default MenuCard