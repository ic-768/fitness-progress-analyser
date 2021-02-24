import React from "react"
import {useHistory} from "react-router-dom"

const AnalysisSelector=({selection})=>{
	// Buttons to select time-frame of analysis
	const history=useHistory()
	return(
		<>
			{selection == "day" && ( <h2>Daily</h2> )}

			{selection == "month" && ( <h2>Monthly</h2> )}

			{selection == "all" && ( <h2>All-time</h2> )}

			{selection != "day" && (<button onClick={()=>
			{history.push("/analysis/daily")}}>Daily</button>)}

			{selection != "month" && (<button onClick={()=>
			{history.push("/analysis/monthly")}}>Monthly</button>)}

			{selection != "all" && (<button onClick={()=>
			{history.push("/analysis/all")}}>All</button>)}
		</>
	)
}

export default AnalysisSelector