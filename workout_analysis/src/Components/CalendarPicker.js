import React,{useState} from "react"
import Calendar from "react-calendar"

import "../Calendar.css"
 
const CalendarPicker = ({workouts,callback}) => { 
	const [date,setDate]=useState(new Date())

	const onDateChange=(newDate)=>{
		setDate(newDate)
		console.log(
			callback(workouts,newDate))
	} 
	return (
		<Calendar
			onChange={onDateChange}
			value={date}
			showNeighboringMonth={true}
			locale={"en-US"} />
	)
}
export default CalendarPicker