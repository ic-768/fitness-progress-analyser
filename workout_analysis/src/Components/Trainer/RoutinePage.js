import React,{useState,useEffect} from "react"
import MenuCard from "../MenuCard"
import exerciseService from "../../Services/exercises"
import {BsFillTrashFill} from "react-icons/bs"

const RoutinePage = ({routines,setRoutines }) => {
	/*Trainer can create/edit/remove routines - Workouts frequently assigned to clients , e.g. "Backday-basic" */
	const [localRoutines,setLocalRoutines]=useState(routines || JSON.parse(window.localStorage.getItem("routines"))) // To modify temporarily without changes to outside state until save
	const [selectedRoutine,setSelectedRoutine]=useState(null)
	const [routineIndex,setRoutineIndex]=useState(null) //index of selectedRoutine in routines array
	const [isEditable,setIsEditable]=useState(false) 

	const editRoutine=(index,exercise)=>{ //edit a routine exercise
		isEditable && 
		setSelectedRoutine({...selectedRoutine,exercises: 
			selectedRoutine.exercises.map((name,i)=>
				i===index 
					? exercise.charAt(0).toUpperCase()+exercise.slice(1)
					: name
			)})} 

	const addRoutine = ()=>{  //brand new routine 
		setLocalRoutines(localRoutines.concat({name:"New Routine", exercises:[""]}))
	} 

	const removeRoutine = async(index)=>{  
		const updatedRoutines=localRoutines.filter((_,i)=>index!=i)
		const validatedRoutines=await exerciseService.setRoutines(updatedRoutines)
		setLocalRoutines(validatedRoutines)
		setRoutines(validatedRoutines)
		window.localStorage.setItem("routines",JSON.stringify(validatedRoutines))
		index===routineIndex && setSelectedRoutine(null) //if removing currently viewed routine, set view to null
	} 

	const removeFromRoutine = (exercise)=>{ //remove exerise from routine
		setSelectedRoutine({...selectedRoutine, exercises:selectedRoutine.exercises.filter((name)=>name!=exercise)})
	} 

	console.log(selectedRoutine)

	const saveRoutines= async() =>{
		setIsEditable(false)
		const updatedRoutines=localRoutines.map((routine,i)=>
			i===routineIndex  // find currently edited routine
				? {...selectedRoutine,
					exercises:selectedRoutine.exercises.filter((exercise)=>exercise && exercise)} //filter empty exercises
				: routine)
		const validatedRoutines=await exerciseService.setRoutines(updatedRoutines) //
		setRoutines(validatedRoutines)
		setLocalRoutines(validatedRoutines)
		window.localStorage.setItem("routines",JSON.stringify(validatedRoutines))
		setSelectedRoutine(validatedRoutines[routineIndex])
	} 

	useEffect(()=>{
		localRoutines && isEditable==false &&  // On cancel
		selectedRoutine!==localRoutines[routineIndex] && setSelectedRoutine(localRoutines[routineIndex])  //If differences, revert state to original
	},[isEditable]) 

	return ( 
		<div className="pageContainer">
			<MenuCard header="My Routines" body ={()=>
				<>
					<button style={{marginBottom:"30px",}}className="themed--2" onClick={()=>{addRoutine()}}>Add routine </button>
					{localRoutines && localRoutines.map((routine,index)=>
						<div key={`${routine.name}${index}`} className="menuItem__removable">
							<a  onClick={()=>{setSelectedRoutine(routine); setRoutineIndex(index);setIsEditable( false )}}
								className="menuItem__text">  
								{ routine.name }
							</a> 

							<a style={{cursor:"pointer"}}
								onClick={()=>{
									removeRoutine(index)
								}}>
								<BsFillTrashFill style={{marginLeft:"auto",marginRight:"15px"}}/>
							</a>
						</div>
					)}
				</> 
			}/>

			{selectedRoutine &&  
					<div style={{ marginTop:"80px"}}>  
						<div className="a-fade itemCard">  
							{isEditable 
								? 
								<>
									<div style={{alignContent:"flexStart",justifyItems:"flexStart",justifyContent:"flexStart",alignItems:"flexStart",display:"flex",}}>
										<div style={{display:"flex-inline", flexDirection:"column"}}>
											<h2>Routine name</h2>
											<input 
												style={{marginBottom:"30px"}}
												onChange={(event)=>{setSelectedRoutine({...selectedRoutine,name:event.target.value})}}value={selectedRoutine.name || ""} /> 
										</div>
										<div style={{marginLeft:"auto"}}>
											<button style={{marginRight:"2px",display:"inline"}}className="themed--1" onClick={()=>{saveRoutines() }}>Save</button> 
											<button  className="themed--2"
												onClick={()=>{setIsEditable(!isEditable)}}>Cancel</button>
										</div>
									</div>
									<h2 style={{marginBottom:"0px"}}>Routine exercises</h2>
									<div style={{display:"flex"}}>
										<button className="themed--1"style={{marginLeft:"auto"}}
											onClick={()=>{setSelectedRoutine({...selectedRoutine,exercises:selectedRoutine.exercises.concat("")})}}>Add</button> 
									</div>
									{
										selectedRoutine && selectedRoutine.exercises.map((exercise,index)=> 
											<div style={{marginBottom:"2px"}}key={index}>
												<input 
													autoFocus={true}
													onBlur={(event)=>{editRoutine(index,event.target.value.trim())}} //Trim white space when input loses focus
													onChange={(event)=>{editRoutine(index,event.target.value)}}value={exercise} /> 
												<button className="themed--2"style={{marginLeft:"10px"}}onClick={()=>{removeFromRoutine(exercise)}}>Remove</button>
											</div> 
										)
									}
								</>
								:
								<>
									<div style={{marginBottom:"10px",display:"flex"}}>
										<h2 style={{marginBottom:"0px",}} >{selectedRoutine.name}</h2>
										<button  className="themed--1" style={{marginLeft:"auto",display:"inline"}} onClick={()=>{setIsEditable(!isEditable)}}>
											Edit</button>
									</div>
									{
										selectedRoutine && selectedRoutine.exercises.map((exercise,i)=> 
											<h5  key={i}> 
												{exercise }
											</h5> 
										) 
									} 
								</>
							}
							<div  style={{width:"100%",borderBottom:"0.5px solid #CECECE",padding:"40px",display:"flex"}}></div>
						</div>
					</div>
			} 
		</div> 
	) 
}

export default RoutinePage