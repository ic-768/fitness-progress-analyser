import React from "react"
import Calendar from "react-calendar"

import "../Calendar.css"
 
const CalendarPicker = ({dateRange,setDateRange, workouts,callback}) => { 

	const onDateChange=(newDateRange)=>{
		setDateRange(newDateRange) // Update selected range
		callback(workouts,newDateRange)  //Filter stuff with selected range
	} 

	return (
		<Calendar
			onChange={onDateChange}
			value={dateRange}
			showNeighboringMonth={true}
			locale={"en-US"} 
			selectRange={true}
		/>
	)
}
export default CalendarPicker