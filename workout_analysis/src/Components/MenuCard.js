import React from "react"
import {IoIosArrowBack} from "react-icons/io"
import {useHistory} from "react-router-dom"

const MenuCard = ({callback, header, body}) => { 
	const history=useHistory()
	return(
		<div className="menuCard" >
			<h1 style={{marginBottom:"57px"}}> 
				<a onClick={()=>{
					history.push("/") 
					callback && callback() //optional callback when going back --used to set currentRegiment after editing
				}}>
					<IoIosArrowBack style={{cursor:"pointer"}} /> 
				</a>
				{header()}
			</h1> 
			{body()}
		</div>
	)
}

export default MenuCard