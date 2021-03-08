import React,{useEffect,useState} from "react"


const ExerciseBox=({newWorkout, setNewWorkout,indexInArray,exerciseName})=>{ 
	const [exercise,setExercise] = useState(newWorkout[indexInArray]||{name:exerciseName, reps:1, sets:1,weight:null})
	const weightColor = exercise.weight ? "#FF8933" : "gray"

	useEffect(()=>{ // To handle outside changes to newWorkout (can trigger itself, but if statement returns it)
		if (newWorkout[indexInArray]==exercise){return} //is up to date
		else{
			const oldWorkout=[...newWorkout] // mutably update oldWorkout
			oldWorkout[indexInArray]=exercise
			setNewWorkout(oldWorkout) //to immutably update state
		}
	},[newWorkout])

	useEffect(()=>{ // update newWorkout !! THIS OVERWRITES PREVIOUS VALUES
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
		<div style={{marginBottom:"160px",width:"auto",height:"282px",boxShadow: ("0px 0px 4px rgba(0, 0, 0, 0.45)"),borderRadius:"5px",backgroundColor:"white" ,display:"flex",flexDirection:"column"}}> 
			<div style={{marginTop:"44px",marginLeft:"58px",marginRight:"58px"}}>
				<h5>Title</h5>
				<h3 style={{display:"inline",color:"black"}}>{exerciseName} </h3>
				<button style={{border:"none",borderRadius:"5px",color:weightColor}} onClick={()=>{setExercise({...exercise, weight:
							exercise.weight ? null : 1}); console.log(exercise)}}>KG</button>

				{exercise &&
				<div style={{marginTop:"50px",display:"flex"}}>

					<div style={{display:"inline"}} > 
						<h3>reps</h3> 
						<input style={{textAlign:"center"}} onChange={(event)=>{setExercise({...exercise, ["reps"]:event.target.value})}}value = {exercise["reps"]}/>
					</div>
					<div style={{display:"inline"}}> 
						<h3>sets</h3> 
						<input style={{textAlign:"center"}} onChange={(event)=>{setExercise({...exercise, ["sets"]:event.target.value})}}value = {exercise["sets"]}/>
					</div>
					{exercise.weight &&(
						<div > 
							<h3>weight</h3> 
							<input style={{textAlign:"center"}} onChange={(event)=>{setExercise({...exercise, ["weight"]:event.target.value})}}value = {exercise["weight"]}/>
						</div>

					)}
				</div>} 
			</div>
		</div>
	)} 


	
export default ExerciseBox
