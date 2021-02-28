import React from "react"
const DaySubmissions=({currentRegiment,setCurrentRegiment, day})=>{

	return(
		<div key={day} style={{borderRadius:"20px",border:"1px solid green",padding:"10px",margin:"10px", }}>
			<h2 style={{color:"white"}}>{day}</h2>
			{currentRegiment[day].map((exercise,i)=>( 
				<div key={i} style={{display:"flex" }}> {/*show each submitted exercise*/}
					<h5 style={{color:"white",marginRight:"8px"}}>
						{exercise}
					</h5> 
					{/*remove exercise*/}
					<button  style={{marginLeft:"auto"}}type="button" onClick={()=>
						setCurrentRegiment( 
							{...currentRegiment, 
								[day]:currentRegiment[day].filter((name)=>(
									name!=exercise)
								)}

						)}>remove</button>
				</div>
			))}
		</div>
						
	)

}


export default DaySubmissions