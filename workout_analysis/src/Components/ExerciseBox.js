import React,{useEffect,useState} from "react"
import Button from "react-bootstrap/Button"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import ExerciseCounter from "./ExerciseCounter"
import {useAccordionToggle} from "react-bootstrap/AccordionToggle"
import {GoEyeClosed} from "react-icons/go"
import {AiFillEye} from "react-icons/ai"
import {GiWeightLiftingUp} from "react-icons/gi"

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

const ExerciseBox=({newWorkout, setNewWorkout,indexInArray,exerciseName})=>{ 
	const [exercise,setExercise] = useState({name:exerciseName, reps:1, sets:1,weight:null})
	const weightColor = exercise.weight? "green" : "red"
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
						<Button style={{color:weightColor}} onClick={()=>{setExercise({...exercise, weight:
							exercise.weight ? null : 1}); console.log(exercise)}}><GiWeightLiftingUp/></Button>
					</Card.Header>
					<Accordion.Collapse  eventKey="0">
						<Card.Body style={{borderRadius:"20px",backgroundColor:"rgb(0,0,0,0.8)", display:"flex"}}>
							{exercise &&
				<>
					<ExerciseCounter exercise={exercise}  setExercise={setExercise} property="reps"/>
					<ExerciseCounter exercise={exercise}  setExercise={setExercise} property="sets"/>
					{exercise.weight &&(
						<ExerciseCounter exercise={exercise}  setExercise={setExercise} property="weight"/>
					)}
				</>} 
						</Card.Body>
					</Accordion.Collapse>
				</Card>
			</Accordion>

		</div>
	) 
}
export default ExerciseBox
