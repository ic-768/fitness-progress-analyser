import React from "react" 
import {Switch,Route,useHistory} from "react-router-dom"
import Button  from "react-bootstrap/Button"
import Analysis from "./Analysis"
import History from "./History"
import ExerciseSubmission from "./ExerciseSubmission"
import { BiBoltCircle, BiArchiveOut } from "react-icons/bi"
import { GiBoltEye } from "react-icons/gi"

const HeadQuarters=({currentRegiment,setWorkouts,workouts, daysExercises,setDaysExercises})=>{
	const history = useHistory()
	
	return (
		<div style={{display:"flex",flexDirection:"column",flexGrow:"1", }}className="HomeRoute a-routeFadeIn">
			<Switch>
				<Route path="/dailySubmission">
					<ExerciseSubmission currentRegiment={currentRegiment}setWorkouts={setWorkouts} daysExercises={daysExercises} setDaysExercises={setDaysExercises}/>
				</Route>
				<Route path="/history"> 
					<History workouts={workouts}/> 
				</Route>
				<Route path="/analysis"> 
					<Analysis workouts={workouts}/> 
				</Route>
				<Route path="/">
					<div style={{flexGrow:"1", display:"flex", flexDirection:"column",
						justifyContent:"center",alignItems:"center",
					}}> 
						<h1 style={{padding:"20px",borderRadius:"20px",backgroundColor:"black",color:"white",marginTop:"40px",marginBottom:"40px",}}>Welcome!</h1>
						<div style={{flexGrow:"1", display:"flex", flexDirection:"column",
							justifyContent:"center",alignItems:"center",
						}}> 
							<div style={{display:"flex", justifyContent:"space-between",backgroundColor:"cornflowerblue", borderRadius:"38px"}}>
								<div style={{width:"190px",margin:"40px",alignItems:"center",display:"flex", flexDirection:"column"}}>
									<h3 style={{marginTop:"50px",}}>Performance</h3>
									<Button style={{width:"180px", height:"180px", borderRadius:"50%"}} variant="dark" onClick={()=>{history.push("/analysis")}}>
										<BiBoltCircle size="150px"/>
									</Button>
								</div>
								<div style={{width:"190px",margin:"40px",alignItems:"center",display:"flex", flexDirection:"column"}}>
									<h3 style={{whiteSpace:"nowrap",}}>Submit Workout</h3>
									<Button style={{width:"180px", height:"180px", borderRadius:"50%"}} variant="dark" onClick={()=>{history.push("/dailySubmission")}}>
										<BiArchiveOut size="150px"/>
									</Button>
								</div>
								<div style={{width:"190px",margin:"40px",alignItems:"center",display:"flex", flexDirection:"column"}}>
									<h3 style={{marginTop:"50px",color:"black"}}>History</h3>
									<Button style={{width:"180px", height:"180px", borderRadius:"50%"}} variant="dark" onClick={()=>{history.push("/history")}}>
										<GiBoltEye size="150px"/>
									</Button>
								</div>
							</div>
							<div>
							</div>
						</div>
					</div>
				</Route>
			</Switch>
		</div>
	)
}

export default HeadQuarters
