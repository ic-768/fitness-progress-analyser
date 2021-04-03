import React from "react"
import { Bar,BarChart,CartesianGrid,AreaChart, Area, XAxis, YAxis,  Tooltip, } from "recharts"

const AnalysisPlot=({analysis, dataKey})=>{

	const dataChart=(
		analysis.length==1 //if only one data point (e.g. all-time analysis
			?
			<>
				<BarChart
					width={500}
					height={400}
					data={analysis}
					margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
					barSize={20}
				>
					<XAxis dataKey="total" scale="point" padding={{ left: 10, right: 10 }} />
					<YAxis />
					<Tooltip />
					<CartesianGrid />
					<Bar dataKey={dataKey} stroke="ff8933" fill="#8884d8" background={{ fill: "#fff" }} />
				</BarChart>
			</>
			:
			<>
				<AreaChart
					width={600}
					height={400}
					data={analysis}
					margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
				>
					<CartesianGrid />
					<XAxis dataKey="timeProperty" />
					<YAxis />
					<Tooltip />
					<Area
						type="natural"
						dataKey={dataKey}
						stroke='#ff8933'
						fill='#8884d8'
					/>
				</AreaChart> 
			</>
	)


	if(analysis){
		return (
			dataChart
		)

	}
	return(null)
}

export default AnalysisPlot
