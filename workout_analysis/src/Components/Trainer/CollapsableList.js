import React,{useState} from "react"
import {BsChevronUp} from "react-icons/bs"
import {BsChevronDown} from "react-icons/bs" 
import Dropdown from "react-bootstrap/Dropdown"

const CollapsableList=({day,routines,isEditable,selectedClient,setSelectedClient,addExercise,editExercise,removeExercise})=>{
	/*collapsable list component used in trainer clientPage */
	const [isExpanded, setIsExpanded]=useState(false)
	
	console.log(routines)
	return (	
		<div className="grayLine" style={{display:"block",padding:"2px"}}>
			<div  className="a-fade"
				style={{cursor:"pointer",marginBottom:"10px",marginTop:"10px",display:"flex",margin:"0px"}} >
				<a onClick={()=>setIsExpanded(!isExpanded)}
					style={{ display:"flex",width:"100%"}}>
					<h5 >	
						{day[0]} 
					</h5>
					{isExpanded
						? <BsChevronDown style={{marginLeft:"auto"}}/> 
						: <BsChevronUp style={{marginLeft:"auto"}}/>}
				</a>
				{isEditable && isExpanded &&  
				<> {/*User pressed "edit" and has expanded the day list */}
					<button onClick={()=>{addExercise(day)}}
						className="themed--1"style={{marginLeft:"15px",display:"inline"}}>
									Add
					</button>
					<Dropdown style={{marginLeft:"15px"}}>{/* dropdown menu to overwrite exercises with a routine*/}
						<Dropdown.Toggle>
							Assign routine
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{routines.map((routine)=>( 
								<>
									<Dropdown.Item onClick={()=>{ 
										setSelectedClient({...selectedClient,currentRegiment:{...selectedClient.currentRegiment,
											[day[0]]:routine.exercises
										}})}}> {routine.name}</Dropdown.Item>
								</>
							))}
						</Dropdown.Menu>
					</Dropdown>
				</>
				}
			</div>

			<ul  style={{listStyle:"none"}}>
				{day[1].map((exercise,i)=>
					isEditable
						? //if editable -> allow render entries as inputs
						<div key={i} style={{margin:"5px", display:"flex"}}>
							{isExpanded && 
							<>
								<input className="a-fade" style={{display:"block"}} 
									autoFocus={true}
									onBlur={(event)=>{editExercise(day,i,event.target.value.trim())} } //on unfocus, remove trailing whitespace
									onChange={(event)=>editExercise(day,i,event.target.value)}
									value={exercise}/>
								<button className="themed--2" style={{marginLeft:"10px"}}onClick={()=>{removeExercise(day,i)}}>remove</button> 
							</>
							}
						</div>
						:  //else render as plain text
						<div key={i}>
							{isExpanded && <li className="a-fade">{exercise}</li> }
						</div>
				)} 
			</ul> 
		</div>
	)
	
}
export default CollapsableList