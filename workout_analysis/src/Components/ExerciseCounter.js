import React,{useEffect,useState} from "react"
import Button from "react-bootstrap/Button"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import {useAccordionToggle} from "react-bootstrap/AccordionToggle"
import {MdDone} from "react-icons/md"
import {MdClear} from "react-icons/md"

const CounterButtonStyle={margin:"10px", height:"60px", width:"60px", borderRadius:"50%" }
const CounterContainerStyle={alignItems:"center", margin:"5px",backgroundColor:"white", borderRadius:"30px", display:"flex",flexDirection:"column"}

function CustomToggle({ children, eventKey,finished, setFinished }) { 
	const decoratedOnClick = useAccordionToggle(
		eventKey,
		() => setFinished(!finished)
	) 
	return (
		<Button
			style={{ color:"white",backgroundColor: finished ? "red" : "green" }}
			onClick={decoratedOnClick}
		>
			{children}
		</Button>
	)
}

const ExerciseCounter=({newWorkout, setNewWorkout,exerciseName})=>{ 
	const [exercise,setExercise] = useState(undefined) // dummy to hold values
	const [finished,setFinished] = useState(false) // finished workout (or skipped)

	const decrement=(number)=>( //1 set of 1 reps is minimum submittable 
		number-1 || 1
	)

	useEffect(()=>{ //Every time a change happens to exercise, update newWorkout
		setNewWorkout({...newWorkout,[exerciseName]:exercise}) 
	},[exercise])

	useEffect(()=>{ // Same for finished
		finished 
			? setExercise({reps:1,sets:1})
			: setExercise(undefined)
		setNewWorkout({...newWorkout,[exerciseName]:exercise}) 
	},[finished])

	return(
		<div> 
			<Accordion>
				<Card>
					<Card.Header style={{border:"none",width:"100%"}}>
						<h3 style={{color:"black"}}>{exerciseName} </h3>
						<CustomToggle finished={finished} setFinished={setFinished} eventKey="0"> 
							{finished 
								?<MdClear/>
								:<MdDone/>} 
						</CustomToggle> 
					</Card.Header>
					<Accordion.Collapse  eventKey="0">
						<Card.Body style={{borderRadius:"20px",backgroundColor:"rgb(0,0,0,0.8)", display:"flex"}}>
							{exercise &&
				<>
					<div style={CounterContainerStyle}> 

						<Button style={CounterButtonStyle} onClick={()=>{
							if(finished){
								setExercise({...exercise, reps:exercise.reps+1})
							}}}><h1>+</h1></Button>
						<h3>{exercise.reps} </h3>

						<Button style={CounterButtonStyle} onClick={()=>{
							if(finished){
								setExercise({...exercise, reps:decrement(exercise.reps)})
							}}}><h1>-</h1></Button>
						<h3>reps</h3>

					</div>
					<div style={{color:"white"}}>
					</div>

					<div className="d-flex" style={CounterContainerStyle}> 

						<Button style={CounterButtonStyle} onClick={()=>{
							if(finished){
								setExercise({...exercise, sets:exercise.sets+1}) 
							}}}><h1>+</h1></Button>
						<h3>{exercise.sets}</h3>
						<Button style={CounterButtonStyle} onClick={()=>{
							if(finished){
								setExercise({...exercise, sets:decrement(exercise.sets)}) 
							}}}><h1>-</h1></Button>

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
