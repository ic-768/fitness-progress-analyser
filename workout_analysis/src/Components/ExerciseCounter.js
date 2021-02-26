import React,{useEffect,useState} from "react"
import Button from "react-bootstrap/Button"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import {useAccordionToggle} from "react-bootstrap/AccordionToggle"
import { MdDone } from "react-icons/md"
import { MdClear } from "react-icons/md"

/**************STYLE*****************
 * 
 **************STYLE****************/

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
					<Card.Header>
						<h3>{exerciseName} </h3>
						<CustomToggle finished={finished} setFinished={setFinished} eventKey="0"> 
							{finished 
								?<MdClear/>
								:<MdDone/>} 
						</CustomToggle> {/*CHECKMARK AS TOGGLE*/}
					</Card.Header>
					<Accordion.Collapse  eventKey="0">
						<Card.Body>
							{exercise &&
				<>
					<div>
						<h3>{exercise.reps} reps</h3>

						<Button onClick={()=>{ //set e.g. newWorkout[pullups] equal to exercise dummy variable reps and or sets
							if(finished){
								setExercise({...exercise, reps:decrement(exercise.reps)})
							}}}>-</Button>

						<Button onClick={()=>{
							if(finished){
								setExercise({...exercise, reps:exercise.reps+1})
							}}}>+</Button>

					</div>

					<div>
						<h3>{exercise.sets} sets</h3>
						<Button onClick={()=>{ 
							if(finished){
								setExercise({...exercise, sets:decrement(exercise.sets)}) 
							}}}>-</Button>

						<Button onClick={()=>{ 
							if(finished){
								setExercise({...exercise, sets:exercise.sets+1}) 
							}}}>+</Button>

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
