import React,{useState} from "react"
import {BsChevronUp} from "react-icons/bs"
import {BsChevronDown} from "react-icons/bs"


const CollapsableList=({day,isEditable,addExercise,editExercise,removeExercise})=>{
	const [isExpanded, setIsExpanded]=useState(false)
	
	return (	
		<div style={{ marginTop:"20px",borderBottom:"0.5px solid #CECECE"}}>
			<div 
				style={{cursor:"pointer",marginTop:"20px",display:"flex",margin:"0px"}} >
				<div 
					onClick={()=>setIsExpanded(!isExpanded)}
					style={{ display:"flex",width:"100%"}}>
					<h5 >	
						{day[0]} 
					</h5>
					{isExpanded
						? <BsChevronDown style={{marginLeft:"auto"}}/> 
						: <BsChevronUp style={{marginLeft:"auto"}}/>}
				</div>

				{isEditable && isExpanded &&  
								<button onClick={()=>{addExercise(day)}}
									className="themed"style={{marginLeft:"15px",display:"inline"}}>
									Add
								</button>}
			</div>
			<ul style={{listStyle:"none"}}>
				{day[1].map((exercise,i)=>
					isEditable
						?
						<div key={i} style={{margin:"5px", display:"flex"}}>
							{isExpanded && 
							<>
								<input style={{display:"block"}} 
									autoFocus={true}
									onBlur={(event)=>{editExercise(day,i,event.target.value.trim())} } //on unfocus, remove trailing whitespace
									onChange={(event)=>editExercise(day,i,event.target.value)}
									value={exercise}/>
								<button onClick={()=>{removeExercise(day,i)}}>remove</button> 
							</>
							}
						</div>
						: 
						<div key={i}>
							{isExpanded && <li>{exercise}</li> }
						</div>
				)} 
			</ul> 
		</div>
	)
	
}
export default CollapsableList