import React,{useEffect,useState} from "react"
import Button from "react-bootstrap/Button"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import {useAccordionToggle} from "react-bootstrap/AccordionToggle"
import {GoEyeClosed} from "react-icons/go"
import {AiFillEye} from "react-icons/ai"

const CounterButtonStyle={margin:"10px", height:"60px", width:"60px", borderRadius:"50%" }
const CounterContainerStyle={alignItems:"center", margin:"5px",backgroundColor:"white", borderRadius:"30px", display:"flex",flexDirection:"column"}

function CustomToggle({ children, eventKey,open, setOpen }) { 
	const decoratedOnClick = useAccordionToggle(
		eventKey,
		() => setOpen(!open)
	) 
	return (
		<Button
			style={{ color:"white",backgroundColor: open ? "red" : "green" }}
			onClick={decoratedOnClick}
		>
			{children}
		</Button>)}

const ExerciseCounter=({newWorkout, setNewWorkout,indexInArray,exerciseName})=>{ 
	const [exercise,setExercise] = useState({name:exerciseName, reps:1, sets:1})
	const [open,setOpen] = useState(false) // if counter is expanded 

	console.log(newWorkout)

	useEffect(()=>{ // To handle outside changes to newWorkout (can trigger itself, but if statement returns it)
		if (newWorkout[indexInArray]==exercise){return} //is up to date
		else{
			const oldWorkout=[...newWorkout] // mutably update oldWorkout
			oldWorkout[indexInArray]=exercise
			setNewWorkout(oldWorkout) //to immutably update state
		}
	},[newWorkout])

	useEffect(()=>{ // update newWorkout
		if(exercise){ 
			if(newWorkout.length>0){
				const oldArray=[...newWorkout]
				oldArray[indexInArray]=exercise
				setNewWorkout(oldArray)
			} 
			else{ //If first exercise
				setNewWorkout([exercise]) 
			} 
		} 
	},[exercise]) 

	const decrement=(number)=>( //1 set of 1 reps is minimum submittable 
		number-1 || 1) 

	return(
		<div> 
			<Accordion>
				<Card>
					<Card.Header style={{border:"none",width:"100%"}}>
						<h3 style={{color:"black"}}>{exerciseName} </h3>
						<CustomToggle open={open} setOpen={setOpen} eventKey="0"> 
							{open 
								?<GoEyeClosed/>
								:<AiFillEye/>} 
						</CustomToggle> 
					</Card.Header>
					<Accordion.Collapse  eventKey="0">
						<Card.Body style={{borderRadius:"20px",backgroundColor:"rgb(0,0,0,0.8)", display:"flex"}}>
							{exercise &&
				<>
					<div style={CounterContainerStyle}> 
						<Button style={CounterButtonStyle} onClick={()=>{
							if(open){
								setExercise({...exercise, reps:exercise.reps+1})
							}}}><h1>+</h1>
						</Button>
						<h3>{exercise.reps} </h3>

						<Button style={CounterButtonStyle} onClick={()=>{
							if(open){
								setExercise({...exercise, reps:decrement(exercise.reps)})
							}}}><h1>-</h1>
						</Button>
						<h3>reps</h3> 
					</div>

					<div className="d-flex" style={CounterContainerStyle}> 
						<Button style={CounterButtonStyle} onClick={()=>{
							if(open){ 
								setExercise({...exercise, sets:exercise.sets+1}) }}} ><h1>+</h1>
						</Button> 
						<h3>{exercise.sets}</h3>
						<Button style={CounterButtonStyle} onClick={()=>{ 
							if(open){
								setExercise({...exercise, sets:decrement(exercise.sets)}) 
							}}} ><h1>-</h1>
						</Button> 
						<h3>sets</h3> 
					</div> 
				</>}
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>

		</div>
	) 
}
export default ExerciseCounter
