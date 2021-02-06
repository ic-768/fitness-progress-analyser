import React,{useState} from "react"

const AddExercise = (props) =>{ 
	const [exercise,setExercise]=useState({ // individual exercises
		name:"",
		reps:0,
		sets:1,
		isWeighted:false,
		weight:null,
		id:null
	}) 

	const submitExercise=(event) =>{
		event.preventDefault()
		exercise.name===""||exercise.reps<1|| exercise.sets<1 
			? console.log("something missing in input")
			: props.setTotalExercises(props.totalExercises.concat({...exercise,id:props.totalExercises.length})) 
	}

	const toggleWeighted=()=>{
		setExercise({...exercise,isWeighted:!exercise.isWeighted}) 
	}

	return( 
		<>
		Add new exercise 
			<form onSubmit={(event)=>submitExercise(event)}> 

				<input value={exercise.name} placeholder="exercise" onChange={(event)=>{
					setExercise({...exercise, name:event.target.value}) }}/>	name 

				<input value={exercise.reps} placeholder="reps" type="number" onChange={(event)=>{
					setExercise({...exercise, reps:event.target.value})}}/> reps 

				<input value={exercise.sets} placeholder="sets" type="number" onChange={(event)=>
				{setExercise({...exercise, sets:event.target.value})}}/> sets

				<input type="checkbox" onChange={toggleWeighted}/> is weighted?

				{exercise.isWeighted &&  //if exercise is weighted, show extra weight input
					<>
						<input value={exercise.weight} placeholder="weight" type="number"onChange={(event)=>{
							setExercise({...exercise, weight:event.target.value})
						}}/>
					</> 
				} 
				<button>submit</button> 
			</form>	
		</>
	)


}


export default AddExercise
