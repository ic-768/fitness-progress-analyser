import React from "react"
import {useHistory} from "react-router-dom"
const TutorialPage=()=>{

	const history = useHistory() 

	const textStyle={margin:"10px"}
	const imageStyle={marginTop:"50px",marginBottom:"50px",maxHeight:"90%",maxWidth:"90%"}

	return(
		<div className="a-fade"
			style={{overflowY:"scroll",display:"flex", flexDirection:"column", alignItems:"center",
				borderRadius:"5px",marginTop:"20px",marginLeft:"200px", 
				marginRight:"200px",width:"100%", backgroundColor:"white"}}>
			<div>
				<button onClick={()=>{history.push("/")}} className="themed--1">
				Back to login
				</button>
			</div>
			<h1 style={{marginTop:"20px",marginBottom:"20px"}}><strong>Welcome to Fitness Express!</strong></h1> 
			<h5 style={textStyle}>
				Our goal is to assist personal trainers and athletes alike, 
				to <strong>monitor athletic progress</strong>, and keep a record of their fitness journey. 
				This app provides tools for both types of users in order to accomodate that goal, whilst also making fitness organisation easier.
			</h5>
			<h2 style={{margin:"20px", textAlign:"center"}}><strong>For Athletes:</strong></h2> 
			<h5 style={textStyle}> 
			As soon as you register and log in to your fresh account, you will be prompted to fill out a form detailing your weekly workout schedule.
			</h5>
			<img style={imageStyle} src={"../Media/RegimentForm.png"} />

			<h5 style={textStyle}> 
			The one thing to remember is that if you repeat the same exercise on different days, you should write them in the exact same way. 
			E.g. <strong>&apos;Pushups&apos;</strong> and <strong>&apos;Push-ups&apos;</strong> will be treated as different exercises!
			</h5>
			<h5 style={textStyle}>
			After you submit this form, you&apos;ll be set to start submitting your workouts.
				<br/>
				<br/>
			Every day that you log in to your account, if you have a workout scheduled for that day, the &apos;Exercise Submission&apos; 
			page will allow you to submit any of the scheduled exercises. 
			</h5>
			<img style={imageStyle} src={"../Media/ExerciseSubmission.png"} />
			<h5 style={textStyle}>
				After having submitted at least once, you&apos;ll be able to view your workout history, and run analyses on your exercise data.
				As you submit more workouts, the more data we&apos;ll we able to utilise for our analyses, and provide a more detailed picture of your work. 
			</h5>
			<img style={imageStyle} src={"../Media/Analysis.png"} />

			<h2 style={{margin:"20px", textAlign:"center"}}><strong>For Trainers:</strong></h2> 
			<h5 style={textStyle}> 
			After registering and logging in for the first time, you will be prompted to register accounts for any clients that you are working with.
			You need to provide a username and password for each client, as well as a name to help you identify them in the app.
				<br/>
				<br/>
			Keep a track of the credentials of each client account, so that they can freely access their account and enjoy all the benefits outlined 
			in the &apos;For Athletes&apos; section. Don&apos;t worry too much about the strength of their password, as they can change it as soon as they 
			log in.
				<br/>
				<br/>
			As a trainer, you have a page to view all your clients, and edit their weekly regiment. The regiment will comprise the exercises that your client
			may submit on any given day. You may fill out a regiment day one exercise at a time, or assign a routine.
			</h5>
			<img style={imageStyle} src={"../Media/Clients.png"} />
			<h5 style={textStyle}>
			Routines are pre-made lists of exercises that you frequently assign to clients, in order to avoid typing them out each time.
			You can access your routines from the relevant menu option, and create as many as you need. 
			</h5>
			<img style={imageStyle} src={"../Media/Routines.png"} />
			<h5>
				<br/>
				<br/>
				Using routines, the next time you&apos;re setting up a new client,  you can assign a day&apos;s exercises with the click of a button.
				<br/>
				<br/>
				Finally, you can view any client&apos; workout history, and analyse their progress on any exercise.
			</h5>
			<img style={imageStyle} src={"../Media/History.png"} /> 
			<h1 style={{paddingBottom:"50px"}} ><strong>Happy Lifting!</strong></h1>

		</div>


	)
}

export default TutorialPage