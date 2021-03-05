import React from "react"
import { CartesianGrid,AreaChart, Area, XAxis, YAxis,  Tooltip, } from "recharts"

const AnalysisPlot=({analysis, dataKey})=>{

	const areaChart=(
		<AreaChart
			width={600}
			height={400}
			data={analysis}
			margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
		>
			<CartesianGrid strokeDasharray="10 10" />
			<XAxis dataKey="timeProperty" />
			<YAxis />
			<Tooltip />
			<Area
				type='monotone'
				dataKey={dataKey}
				stroke='#8884d8'
				fill='#8884d8'
			/>
		</AreaChart> 
	)


	if(analysis){ 
		return (
			areaChart
		)

	}
	return(null)
}

export default AnalysisPlot
