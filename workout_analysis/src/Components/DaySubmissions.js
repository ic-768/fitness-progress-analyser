import React from "react"
import {CSSTransition, TransitionGroup} from "react-transition-group"

const DaySubmissions=({currentRegiment,setCurrentRegiment, day})=>{

	return(
		<div key={day} style={{backgroundColor:"black",display:"flex", flexDirection:"column",alignItems:"center",borderRadius:"20px",border:"1px solid green",padding:"10px",margin:"10px", }}>
			<h2 style={{color:"white"}}>{day}</h2>

			<TransitionGroup> {/*for fade effect*/}
				{currentRegiment[day].map((exercise,i)=>( 
					<CSSTransition classNames="t-daySubmission" timeout={300} key={i}>
						<div  style={{display:"flex", flexDirection:"column",alignContent:"center",alignItems:"center",
							justifyContent:"center",
							marginTop:"10px"   }}> {/*show each submitted exercise*/}
							<div style={{width:"100%",display:"flex",  alignContent:"center",alignItems:"center"}}>
								<h5 style={{color:"white",margin:"8px",marginRight:"20px"}}>
									{exercise}
								</h5> 
								{/*remove exercise*/}
								<button  style={{padding:"5px",marginLeft:"auto"}}type="button" onClick={()=>
									setCurrentRegiment( 
										{...currentRegiment, 
											[day]:currentRegiment[day].filter((name)=>(
												name!=exercise)
											)}

									)}><h5 style={{color:"white"}}>remove</h5>
								</button>
							</div>
						</div>
					</CSSTransition>
				))}
			</TransitionGroup>

		</div>
						
	)

}


export default DaySubmissions