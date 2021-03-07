import React from "react"

const DaySubmissions=({currentRegiment,setCurrentRegiment, day})=>{

	return(
		<div key={day} style={{padding:"10px",display:"flex", flexDirection:"column",alignItems:"center",
		}}>
			<ul style={{padding:"0",margin:"0",width:"100%", display:"flex" ,flexDirection:"column"}}>
				{currentRegiment[day].map((exercise,i)=>( 
					<div  key={`${exercise}${i}`} style={{paddingTop:"4px",width:"100%",display:"flex",flexGrow:"1", 
						flexDirection:"column",
					}}> {/*show each submitted exercise*/}
						<div style={{width:"100%",display:"flex",alignItems:"center", alignContent:"center", justifyContent:"center",justifyItems:"center"}}>
							<p style={{margin:"0", marginRight:"4px"}}>
								{exercise}
							</p> 
							{/*remove exercise*/}
							<button  style={{border:"none",borderRadius:"5px",marginLeft:"auto"}}type="button" onClick={()=>
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