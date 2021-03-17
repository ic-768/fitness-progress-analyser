import React from "react"

const DaySubmissions=({currentRegiment,setCurrentRegiment, day})=>{

	return(
		<div key={day} style={{display:"flex", flexDirection:"column"}}>
			<ul>
				{currentRegiment[day].map((exercise,i)=>( 
					<div key={`${exercise}${i}`} 
						style={{paddingBottom:"5px",display:"flex", 
							flexDirection:"column",
						}}> {/*show each submitted exercise*/}
						<div style={{display:"flex",alignItems:"center", justifyContent:"center",}}>
							<p style={{margin:"0",marginRight:"6px"}}>
								{exercise}
							</p> 
							{/*remove exercise*/}
							<button style={{borderRadius:"5px",marginLeft:"auto"}} type="button" onClick={()=>
								setCurrentRegiment( 
									{...currentRegiment, 
										[day]:currentRegiment[day].filter((name)=>(
											name!=exercise)
										)}

								)}>remove
							</button>
						</div>
					</div>
				)) }
			</ul>

		</div>
						
	)

}


export default DaySubmissions