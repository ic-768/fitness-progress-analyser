import React from "react" 
import {Switch,Route,useHistory} from "react-router-dom"
import Analysis from "./Analysis"
import History from "./History"
import ExerciseSubmission from "./ExerciseSubmission"
import { AiOutlinePlus } from "react-icons/ai"

const HeadQuarters=({currentRegiment,setWorkouts,workouts, daysExercises,setDaysExercises})=>{

	const centeredStyle={marginBottom:"40px",marginTop:"4px",display:"flex", alignItems:"center",}
	const linkStyle = {display:"inline", color:"white", cursor:"pointer"}

	const history=useHistory()
	
	return (
		<Switch>
			<Route exact path="/">
				<div style={{height:"100%",display:"flex"}}>
					<div 
						style={{marginLeft:"80px",marginTop:"150px",display:"flex",flexDirection:"column", }}>
						<div onClick={()=>{history.push("/dailySubmission")}}style={centeredStyle}>
							<AiOutlinePlus style={{color:"white"}}/>
							<h2 style={linkStyle}>Submit a Workout</h2> 
						</div>
						<div onClick={()=>{history.push("/history")}}
							style={centeredStyle}> <AiOutlinePlus style={{color:"white"}} /> 
							<h2 style={linkStyle}>My Workout History</h2>
						</div> 
						<div onClick={()=>{history.push("/analysis")}}
							style={centeredStyle}>
							<AiOutlinePlus style={{color:"white"}}/>
							<h2 style={linkStyle}>Performance Analysis</h2> </div>
					</div>
				</div>
				{workouts && workouts.length>0 
					?(<h1 style={{position:"absolute", bottom:"0",marginBottom:"60px",marginLeft:"60px",color:"white"}}> Welcome Back</h1>) 
					: <h1 style={{position:"absolute", bottom:"0",marginBottom:"60px",marginLeft:"60px",color:"white"}}>Welcome!</h1>
				}</Route>
			<Route path="/dailySubmission">
				<ExerciseSubmission currentRegiment={currentRegiment}setWorkouts={setWorkouts} daysExercises={daysExercises} setDaysExercises={setDaysExercises}/>
			</Route>
			<Route path="/history"> 
				<History workouts={workouts}/> 
			</Route>
			<Route path="/analysis" style = {{ height:"100%"}}> 
				<Analysis workouts={workouts}/> 
			</Route>
		</Switch>
	)
}

export default HeadQuarters
