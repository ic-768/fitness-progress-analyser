import React,{useState} from "react"

const AddExercise = (props) =>{ 
	const [exercise,setExercise]=useState({ // individual exercises
		name:"",
		reps:0,
		sets:1,
	}) 

	const submitExercise=(event) =>{
		event.preventDefault()
		exercise.name===""||exercise.reps<1|| exercise.sets<1 
			? console.log("something missing in input")
			: props.setTotalExercises(props.totalExercises.concat({...exercise}))//don't change this to (exercise), will break deleting by id if item has same name
	}

	return( 
		<>
		Add new exercise 
			<form onSubmit={(event)=>submitExercise(event)}> 
				{/*each input changes one of exercise fields*/}
				<input value={exercise.name} placeholder="exercise" onChange={(event)=>{
					setExercise({...exercise, name:event.target.value}) }}/>	name 

				<input value={exercise.reps} placeholder="reps" type="number" onChange={(event)=>{
					setExercise({...exercise, reps:event.target.value})}}/> reps 

				<input value={exercise.sets} placeholder="sets" type="number" onChange={(event)=>
				{setExercise({...exercise, sets:event.target.value})}}/> sets 

				<button>submit</button> 
			</form>	
		</>
	) 
} 

export default AddExercise
